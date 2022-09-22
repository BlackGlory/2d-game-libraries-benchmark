import { GameLoop, Mode } from 'extra-game-loop'
import { StructureOfArrays, double, uint8 } from 'structure-of-arrays'
import { World, Query, allOf } from 'extra-ecs'
import { random, randomInt } from 'extra-rand'
import { truncateArrayRight } from '@blackglory/structures'
import { SyncDestructor } from 'extra-defer'
import { go, pass } from '@blackglory/prelude'
import * as PIXI from 'pixi.js'
import { COLORS } from './colors'
import Box2DFactory from 'box2d-wasm'
import { UnitConverter } from '@utils/unit-converter'
import { lerp } from '@utils/lerp'

const Box2D = await Box2DFactory()

const PHYSICS_FPS = 50
const unitConverter = new UnitConverter(20)
const SCREEN_WIDTH_PIXELS = 1920
const SCREEN_HEIGHT_PIXELS = 1080
const SCREEN_WIDTH_METERS = unitConverter.pixelToMeter(SCREEN_WIDTH_PIXELS)
const SCREEN_HEIGHT_METERS= unitConverter.pixelToMeter(SCREEN_HEIGHT_PIXELS)

export function createGame(canvas: HTMLCanvasElement): GameLoop<number> {
  const fpsRecords: number[] = []
  const entityIdToSprite = new Map<number, PIXI.Sprite>()
  const entityIdToBody = new Map<number, Box2D.b2Body>()

  PIXI.settings.RESOLUTION = window.devicePixelRatio
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

  const renderer = new PIXI.Renderer({
    view: canvas
  , width: SCREEN_WIDTH_PIXELS
  , height: SCREEN_HEIGHT_PIXELS
  , antialias: true
  })
  const stage = new PIXI.Container()
  const particleStage = new PIXI.ParticleContainer(100000)
  stage.addChild(particleStage)

  const physicsWorld = go(() => {
    const gravity = new Box2D.b2Vec2(0, 9.81)
    const world = new Box2D.b2World(gravity)
    return world
  })

  {
    // create bottom edge
    createNonRotatableCuboid(
      physicsWorld
    , Box2D.b2_staticBody
    , 0, SCREEN_HEIGHT_METERS
    , SCREEN_WIDTH_METERS, 1
    )
  }

  {
    // create left edge
    createNonRotatableCuboid(
      physicsWorld
    , Box2D.b2_staticBody
    , -1, 0
    , 1, SCREEN_HEIGHT_METERS
    )
  }

  {
    // create right edge
    createNonRotatableCuboid(
      physicsWorld
    , Box2D.b2_staticBody
    , SCREEN_WIDTH_METERS, 0
    , 1, SCREEN_HEIGHT_METERS
    )
  }

  const world = new World()

  const PreviousPosition = new StructureOfArrays({
    x: double
  , y: double
  })
  const Position = new StructureOfArrays({
    x: double
  , y: double
  })
  const Size = new StructureOfArrays({
    width: uint8
  , height: uint8
  })

  const queryBox = new Query(world, allOf(Position, Size))

  let boxes: number = 0
  const boxWidth = 1
  const boxHeight = 1
  const gap = 0.5
  for (let x = boxWidth; x + boxWidth < SCREEN_WIDTH_METERS - boxWidth; x += boxWidth + gap) {
    for (let y = -SCREEN_HEIGHT_METERS * 2; y + boxHeight < 0; y += boxHeight + gap) {
      addBox(x, y, boxWidth, boxHeight)
    }
  }
  
  const loop = new GameLoop({
    mode: Mode.UpdateFirst
  , fixedDeltaTime: 1000 / PHYSICS_FPS
  , maximumDeltaTime: 1000 / (PHYSICS_FPS / 2)
  , fixedUpdate(deltaTime: number): void {
      physicsSystem(deltaTime)
    }
  , update(deltaTime: number): void {
      pass()
    }
  , render(alpha: number) {
      stageUpdatingSystem(alpha)
      renderingSystem()
    }
  })

  return loop

  function physicsSystem(deltaTime: number): void {
    // 官方的推荐迭代次数
    const velocityIterations = 8
    const positionIterations = 3
    physicsWorld.Step(deltaTime / 1000, velocityIterations, positionIterations)

    for (const entityId of queryBox.findAllEntityIds()) {
      updatePreviousPosition(entityId)
      const width = Size.arrays.width[entityId]
      const height = Size.arrays.height[entityId]
      const rigidBody = entityIdToBody.get(entityId)!
      const { x, y } = rigidBody.GetPosition()
      Position.arrays.x[entityId] = normalizeCuboidPoint(x, width)
      Position.arrays.y[entityId] = normalizeCuboidPoint(y, height)
    }
  }

  function updatePreviousPosition(entityId: number): void {
    const previousX = Position.arrays.x[entityId]
    const previousY = Position.arrays.y[entityId]
    PreviousPosition.upsert(entityId, {
      x: previousX
    , y: previousY
    })
  }

  function stageUpdatingSystem(alpha: number): void {
    for (const entityId of queryBox.findAllEntityIds()) {
      const previousX = unitConverter.meterToPixel(PreviousPosition.arrays.x[entityId])
      const previousY = unitConverter.meterToPixel(PreviousPosition.arrays.y[entityId])
      const currentX = unitConverter.meterToPixel(Position.arrays.x[entityId])
      const currentY = unitConverter.meterToPixel(Position.arrays.y[entityId])

      const rect = entityIdToSprite.get(entityId)!
      rect.position.set(
        lerp(alpha, previousX, currentX)
      , lerp(alpha, previousY, currentY)
      )
    }
  }

  function renderingSystem(): void {
    const destructor = new SyncDestructor()
    {
      fpsRecords.push(loop.getFramesOfSecond())
      truncateArrayRight(fpsRecords, PHYSICS_FPS)
      const fps =
        fpsRecords.length > 1
        ? Math.floor(fpsRecords.reduce((acc, cur) => acc + cur) / fpsRecords.length)
        : fpsRecords[0]

      const text = new PIXI.Text(`FPS: ${fps}`, {
        fontFamily: 'sans'
      , fontSize: 48
      , fill: 0xFFFFFF
      })
      destructor.defer(() => text.destroy())
      text.position.x = 0
      text.position.y = 0

      const rect = new PIXI.Graphics()
      destructor.defer(() => rect.destroy())
      rect.beginFill(0x000000)
      rect.drawRect(0, 0, text.width, text.height)
      rect.position.x = text.position.x
      rect.position.y = text.position.y

      stage.addChild(rect, text)
      destructor.defer(() => stage.removeChild(rect, text))
    }

    {
      const text = new PIXI.Text(`Boxes: ${boxes}`, {
        fontFamily: 'sans'
      , fontSize: 48
      , fill: 0xFFFFFF
      })
      destructor.defer(() => text.destroy())
      text.position.x = SCREEN_WIDTH_PIXELS - text.width
      text.position.y = 0

      const rect = new PIXI.Graphics()
      destructor.defer(() => rect.destroy())
      rect.beginFill(0x000000)
      rect.drawRect(0, 0, text.width, text.height)
      rect.position.x = text.position.x
      rect.position.y = text.position.y

      stage.addChild(rect, text)
      destructor.defer(() => stage.removeChild(rect, text))
    }

    renderer.render(stage)

    destructor.execute()
  }

  function addBox(x: number, y: number, width: number, height: number): void {
    const colorIndex = randomInt(0, COLORS.length)

    const entityId = world.createEntityId()
    world.addComponents(
      entityId
    , [Position, { x, y }]
    , [Size, { width, height }]
    )

    const rect = new PIXI.Sprite(PIXI.Texture.WHITE)
    rect.x = 0
    rect.y = 0
    rect.width = unitConverter.meterToPixel(width)
    rect.height = unitConverter.meterToPixel(height)
    rect.tint = COLORS[colorIndex]

    PreviousPosition.upsert(entityId, { x, y })

    const { body } = createNonRotatableCuboid(
      physicsWorld
    , Box2D.b2_dynamicBody
    , x, y
    , width, height
    )
    body.SetLinearVelocity(new Box2D.b2Vec2(random(-1, 1), random(0, 2)))

    particleStage.addChild(rect)
    entityIdToSprite.set(entityId, rect)
    entityIdToBody.set(entityId, body)

    boxes++
  }
}

function createNonRotatableCuboid(
  world: Box2D.b2World
, type: number
, x: number
, y: number
, width: number
, height: number
): {
  body: Box2D.b2Body
  bodyDefinition: Box2D.b2BodyDef
} {
  const bodyDefinition = new Box2D.b2BodyDef()
  bodyDefinition.set_type(type)
  bodyDefinition.set_position(new Box2D.b2Vec2(x + width / 2, y + height / 2))

  const shape = new Box2D.b2PolygonShape()
  shape.SetAsBox(width / 2, height / 2)

  const fixtureDefinition = new Box2D.b2FixtureDef()
  fixtureDefinition.set_shape(shape)
  fixtureDefinition.set_restitution(0)
  fixtureDefinition.set_density(1)

  const body = world.CreateBody(bodyDefinition)
  body.CreateFixture(fixtureDefinition)
  body.SetAwake(true)
  body.SetEnabled(true)
  body.SetFixedRotation(true)

  return { body, bodyDefinition }
}

function normalizeCuboidPoint(x: number, width: number): number
function normalizeCuboidPoint(y: number, height: number): number
function normalizeCuboidPoint(sideValue: number, sideLength: number): number {
  return sideValue - sideLength / 2
}
