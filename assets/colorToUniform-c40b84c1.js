import{l as at,u as le,a as ut,d as L,j as lt,k as ct,n as ce,w as dt,__tla as ft}from"./index-77dcad62.js";let de,_,w,fe,me,H,he,N,pe,M,$,z,ge,K,xe,ve,be,ye,Pe,_e,we,Me,mt=Promise.all([(()=>{try{return ft}catch{}})()]).then(async()=>{const A=Object.create(null),q=Object.create(null);M=function(t,e){let r=q[t];return r===void 0&&(A[e]===void 0&&(A[e]=1),q[t]=r=A[e]++),r};let T;function Se(){if(!T){T="mediump";const t=at();t&&t.getShaderPrecisionFormat&&(T=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision?"highp":"mediump")}return T}function Ce(t,e,r){return e?t:r?(t=t.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${t}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${t}
        `}function ze(t,e,r){const n=r?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(t.substring(0,9)!=="precision"){let i=r?e.requestedFragmentPrecision:e.requestedVertexPrecision;return i==="highp"&&n!=="highp"&&(i="mediump"),`precision ${i} float;
${t}`}else if(n!=="highp"&&t.substring(0,15)==="precision highp")return t.replace("precision highp","precision mediump");return t}function Ae(t,e){return e?`#version 300 es
${t}`:t}const Ue={},Ge={};function Ee(t,{name:e="pixi-program"},r=!0){e=e.replace(/\s+/g,"-"),e+=r?"-fragment":"-vertex";const n=r?Ue:Ge;return n[e]?(n[e]++,e+=`-${n[e]}`):n[e]=1,t.indexOf("#define SHADER_NAME")!==-1?t:`${`#define SHADER_NAME ${e}`}
${t}`}function Oe(t,e){return e?t.replace("#version 300 es",""):t}const U={stripVersion:Oe,ensurePrecision:ze,addProgramDefines:Ce,setProgramName:Ee,insertVersion:Ae},G=Object.create(null),Y=class X{constructor(e){e={...X.defaultOptions,...e};const r=e.fragment.indexOf("#version 300 es")!==-1,n={stripVersion:r,ensurePrecision:{requestedFragmentPrecision:e.preferredFragmentPrecision,requestedVertexPrecision:e.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:Se()},setProgramName:{name:e.name},addProgramDefines:r,insertVersion:r};let i=e.fragment,s=e.vertex;Object.keys(U).forEach(o=>{const u=n[o];i=U[o](i,u,!0),s=U[o](s,u,!1)}),this.fragment=i,this.vertex=s,this._key=M(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(e){const r=`${e.vertex}:${e.fragment}`;return G[r]||(G[r]=new X(e)),G[r]}};Y.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"},z=Y;const Z={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};K=function(t){return Z[t]??Z.float32};const Re={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function Fe({source:t,entryPoint:e}){const r={},n=t.indexOf(`fn ${e}`);if(n!==-1){const i=t.indexOf("->",n);if(i!==-1){const s=t.substring(n,i),o=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let u;for(;(u=o.exec(s))!==null;){const a=Re[u[3]]??"float32";r[u[2]]={location:parseInt(u[1],10),format:a,stride:K(a).stride,offset:0,instance:!1,start:0}}}}return r}function E(t){var f,d;const e=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,r=/@group\((\d+)\)/,n=/@binding\((\d+)\)/,i=/var(<[^>]+>)? (\w+)/,s=/:\s*(\w+)/,o=/struct\s+(\w+)\s*{([^}]+)}/g,u=/(\w+)\s*:\s*([\w\<\>]+)/g,a=/struct\s+(\w+)/,l=(f=t.match(e))==null?void 0:f.map(c=>({group:parseInt(c.match(r)[1],10),binding:parseInt(c.match(n)[1],10),name:c.match(i)[2],isUniform:c.match(i)[1]==="<uniform>",type:c.match(s)[1]}));if(!l)return{groups:[],structs:[]};const m=((d=t.match(o))==null?void 0:d.map(c=>{const p=c.match(a)[1],x=c.match(u).reduce((v,b)=>{const[h,y]=b.split(":");return v[h.trim()]=y.trim(),v},{});return x?{name:p,members:x}:null}).filter(({name:c})=>l.some(p=>p.type===c)))??[];return{groups:l,structs:m}}var P=(t=>(t[t.VERTEX=1]="VERTEX",t[t.FRAGMENT=2]="FRAGMENT",t[t.COMPUTE=4]="COMPUTE",t))(P||{});function Ve({groups:t}){const e=[];for(let r=0;r<t.length;r++){const n=t[r];e[n.group]||(e[n.group]=[]),n.isUniform?e[n.group].push({binding:n.binding,visibility:P.VERTEX|P.FRAGMENT,buffer:{type:"uniform"}}):n.type==="sampler"?e[n.group].push({binding:n.binding,visibility:P.FRAGMENT,sampler:{type:"filtering"}}):n.type==="texture_2d"&&e[n.group].push({binding:n.binding,visibility:P.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function je({groups:t}){const e=[];for(let r=0;r<t.length;r++){const n=t[r];e[n.group]||(e[n.group]={}),e[n.group][n.name]=n.binding}return e}function Ie(t,e){const r=new Set,n=new Set,i=[...t.structs,...e.structs].filter(o=>r.has(o.name)?!1:(r.add(o.name),!0)),s=[...t.groups,...e.groups].filter(o=>{const u=`${o.name}-${o.binding}`;return n.has(u)?!1:(n.add(u),!0)});return{structs:i,groups:s}}const O=Object.create(null);_=class{constructor(t){var o,u;this._layoutKey=0;const{fragment:e,vertex:r,layout:n,gpuLayout:i,name:s}=t;if(this.name=s,this.fragment=e,this.vertex=r,e.source===r.source){const a=E(e.source);this.structsAndGroups=a}else{const a=E(r.source),l=E(e.source);this.structsAndGroups=Ie(a,l)}this.layout=n??je(this.structsAndGroups),this.gpuLayout=i??Ve(this.structsAndGroups),this.autoAssignGlobalUniforms=((o=this.layout[0])==null?void 0:o.globalUniforms)!==void 0,this.autoAssignLocalUniforms=((u=this.layout[1])==null?void 0:u.localUniforms)!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:t,fragment:e}=this,r=t.source+e.source+t.entryPoint+e.entryPoint;this._layoutKey=M(r,"program")}get attributeData(){return this._attributeData??(this._attributeData=Fe(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(t){const e=`${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;return O[e]||(O[e]=new _(t)),O[e]}};const J=["f32","i32","vec2<f32>","vec3<f32>","vec4<f32>","mat2x2<f32>","mat3x3<f32>","mat4x4<f32>","mat3x2<f32>","mat4x2<f32>","mat2x3<f32>","mat4x3<f32>","mat2x4<f32>","mat3x4<f32>"],ke=J.reduce((t,e)=>(t[e]=!0,t),{});function Be(t,e){switch(t){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const Q=class $e{constructor(e,r){this._touched=0,this.uid=le("uniform"),this._resourceType="uniformGroup",this._resourceId=le("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,r={...$e.defaultOptions,...r},this.uniformStructures=e;const n={};for(const i in e){const s=e[i];if(s.name=i,s.size=s.size??1,!ke[s.type])throw new Error(`Uniform type ${s.type} is not supported. Supported uniform types are: ${J.join(", ")}`);s.value??(s.value=Be(s.type,s.size)),n[i]=s.value}this.uniforms=n,this._dirtyId=1,this.ubo=r.ubo,this.isStatic=r.isStatic,this._signature=M(Object.keys(n).map(i=>`${i}-${e[i].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};Q.defaultOptions={ubo:!1,isStatic:!1},H=Q,w=(t=>(t[t.WEBGL=1]="WEBGL",t[t.WEBGPU=2]="WEBGPU",t[t.BOTH=3]="BOTH",t))(w||{}),N=class extends ut{constructor(t){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:e,glProgram:r,groups:n,resources:i,compatibleRenderers:s,groupMap:o}=t;this.gpuProgram=e,this.glProgram=r,s===void 0&&(s=0,e&&(s|=w.WEBGPU),r&&(s|=w.WEBGL)),this.compatibleRenderers=s;const u={};if(!i&&!n&&(i={}),i&&n)throw new Error("[Shader] Cannot have both resources and groups");if(!e&&n&&!o)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&n&&o)for(const a in o)for(const l in o[a]){const m=o[a][l];u[m]={group:a,binding:l,name:m}}else if(e&&n&&!o){const a=e.structsAndGroups.groups;o={},a.forEach(l=>{o[l.group]=o[l.group]||{},o[l.group][l.binding]=l.name,u[l.name]=l})}else if(i){n={},o={},e&&e.structsAndGroups.groups.forEach(l=>{o[l.group]=o[l.group]||{},o[l.group][l.binding]=l.name,u[l.name]=l});let a=0;for(const l in i)u[l]||(n[99]||(n[99]=new L,this._ownedBindGroups.push(n[99])),u[l]={group:99,binding:a,name:l},o[99]=o[99]||{},o[99][a]=l,a++);for(const l in i){const m=l;let f=i[l];!f.source&&!f._resourceType&&(f=new H(f));const d=u[m];d&&(n[d.group]||(n[d.group]=new L,this._ownedBindGroups.push(n[d.group])),n[d.group].setResource(f,d.binding))}}this.groups=n,this._uniformBindMap=o,this.resources=this._buildResourceAccessor(n,u)}addResource(t,e,r){var n,i;(n=this._uniformBindMap)[e]||(n[e]={}),(i=this._uniformBindMap[e])[r]||(i[r]=t),this.groups[e]||(this.groups[e]=new L,this._ownedBindGroups.push(this.groups[e]))}_buildResourceAccessor(t,e){const r={};for(const n in e){const i=e[n];Object.defineProperty(r,i.name,{get(){return t[i.group].getResource(i.binding)},set(s){t[i.group].setResource(s,i.binding)}})}return r}destroy(t=!1){var e,r;this.emit("destroy",this),t&&((e=this.gpuProgram)==null||e.destroy(),(r=this.glProgram)==null||r.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(n=>{n.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(t){const{gpu:e,gl:r,...n}=t;let i,s;return e&&(i=_.from(e)),r&&(s=z.from(r)),new N({gpuProgram:i,glProgram:s,...n})}};const De={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8},R=0,F=1,V=2,j=3,I=4,k=5,B=class Te{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<R)}set blend(e){!!(this.data&1<<R)!==e&&(this.data^=1<<R)}get offsets(){return!!(this.data&1<<F)}set offsets(e){!!(this.data&1<<F)!==e&&(this.data^=1<<F)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<V)}set culling(e){!!(this.data&1<<V)!==e&&(this.data^=1<<V)}get depthTest(){return!!(this.data&1<<j)}set depthTest(e){!!(this.data&1<<j)!==e&&(this.data^=1<<j)}get depthMask(){return!!(this.data&1<<k)}set depthMask(e){!!(this.data&1<<k)!==e&&(this.data^=1<<k)}get clockwiseFrontFace(){return!!(this.data&1<<I)}set clockwiseFrontFace(e){!!(this.data&1<<I)!==e&&(this.data^=1<<I)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=De[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const e=new Te;return e.depthTest=!1,e.blend=!0,e}};B.default2d=B.for2d();let ee;fe=B,ee=0;class We{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,r,n){const i=new lt({...this.textureOptions,width:e,height:r,resolution:1,antialias:n,autoGarbageCollect:!0});return new ct({source:i,label:`texturePool_${ee++}`})}getOptimalTexture(e,r,n=1,i){let s=Math.ceil(e*n-1e-6),o=Math.ceil(r*n-1e-6);s=ce(s),o=ce(o);const u=(s<<17)+(o<<1)+(i?1:0);this._texturePool[u]||(this._texturePool[u]=[]);let a=this._texturePool[u].pop();return a||(a=this.createTexture(s,o,i)),a.source._resolution=n,a.source.width=s/n,a.source.height=o/n,a.source.pixelWidth=s,a.source.pixelHeight=o,a.frame.x=0,a.frame.y=0,a.frame.width=e,a.frame.height=r,a.updateUvs(),this._poolKeyHash[a.uid]=u,a}getSameSizeTexture(e,r=!1){const n=e.source;return this.getOptimalTexture(e.width,e.height,n._resolution,r)}returnTexture(e){const r=this._poolKeyHash[e.uid];this._texturePool[r].push(e)}clear(e){if(e=e!==!1,e)for(const r in this._texturePool){const n=this._texturePool[r];if(n)for(let i=0;i<n.length;i++)n[i].destroy(!0)}this._texturePool={}}}me=new We;function te(t,e,r){if(t)for(const n in t){const i=n.toLocaleLowerCase(),s=e[i];if(s){let o=t[n];n==="header"&&(o=o.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),r&&s.push(`//----${r}----//`),s.push(o)}else dt(`${n} placement hook does not exist in shader`)}}const Le=/\{\{(.*?)\}\}/g;function re(t){var r;const e={};return(((r=t.match(Le))==null?void 0:r.map(n=>n.replace(/[{()}]/g,"")))??[]).forEach(n=>{e[n]=[]}),e}function ne(t,e){let r;const n=/@in\s+([^;]+);/g;for(;(r=n.exec(t))!==null;)e.push(r[1])}function ie(t,e,r=!1){const n=[];ne(e,n),t.forEach(u=>{u.header&&ne(u.header,n)});const i=n;r&&i.sort();const s=i.map((u,a)=>`       @location(${a}) ${u},`).join(`
`);let o=e.replace(/@in\s+[^;]+;\s*/g,"");return o=o.replace("{{in}}",`
${s}
`),o}function oe(t,e){let r;const n=/@out\s+([^;]+);/g;for(;(r=n.exec(t))!==null;)e.push(r[1])}function He(t){const e=/\b(\w+)\s*:/g.exec(t);return e?e[1]:""}function Ne(t){const e=/@.*?\s+/g;return t.replace(e,"")}function Ke(t,e){const r=[];oe(e,r),t.forEach(a=>{a.header&&oe(a.header,r)});let n=0;const i=r.sort().map(a=>a.indexOf("builtin")>-1?a:`@location(${n++}) ${a}`).join(`,
`),s=r.sort().map(a=>`       var ${Ne(a)};`).join(`
`),o=`return VSOutput(
                ${r.sort().map(a=>` ${He(a)}`).join(`,
`)});`;let u=e.replace(/@out\s+[^;]+;\s*/g,"");return u=u.replace("{{struct}}",`
${i}
`),u=u.replace("{{start}}",`
${s}
`),u=u.replace("{{return}}",`
${o}
`),u}function se(t,e){let r=t;for(const n in e){const i=e[n];i.join(`
`).length?r=r.replace(`{{${n}}}`,`//-----${n} START-----//
${i.join(`
`)}
//----${n} FINISH----//`):r=r.replace(`{{${n}}}`,"")}return r}const g=Object.create(null),D=new Map;let Xe=0;function qe({template:t,bits:e}){const r=ae(t,e);if(g[r])return g[r];const{vertex:n,fragment:i}=Ze(t,e);return g[r]=ue(n,i,e),g[r]}function Ye({template:t,bits:e}){const r=ae(t,e);return g[r]||(g[r]=ue(t.vertex,t.fragment,e)),g[r]}function Ze(t,e){const r=e.map(o=>o.vertex).filter(o=>!!o),n=e.map(o=>o.fragment).filter(o=>!!o);let i=ie(r,t.vertex,!0);i=Ke(r,i);const s=ie(n,t.fragment,!0);return{vertex:i,fragment:s}}function ae(t,e){return e.map(r=>(D.has(r)||D.set(r,Xe++),D.get(r))).sort((r,n)=>r-n).join("-")+t.vertex+t.fragment}function ue(t,e,r){const n=re(t),i=re(e);return r.forEach(s=>{te(s.vertex,n,s.name),te(s.fragment,i,s.name)}),{vertex:se(t,n),fragment:se(e,i)}}const Je=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,Qe=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,et=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,tt=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`,rt={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},nt={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};pe=function({bits:t,name:e}){const r=qe({template:{fragment:Qe,vertex:Je},bits:[rt,...t]});return _.from({name:e,vertex:{source:r.vertex,entryPoint:"main"},fragment:{source:r.fragment,entryPoint:"main"}})},ve=function({bits:t,name:e}){return new z({name:e,...Ye({template:{vertex:et,fragment:tt},bits:[nt,...t]})})};let S;he={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},be={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},S={};function it(t){const e=[];if(t===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let r=0;for(let n=0;n<t;n++)e.push(`@group(1) @binding(${r++}) var textureSource${n+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${r++}) var textureSampler${n+1}: sampler;`)}return e.join(`
`)}function ot(t){const e=[];if(t===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let r=0;r<t;r++)r===t-1?e.push("  default:{"):e.push(`  case ${r}:{`),e.push(`      outColor = textureSampleGrad(textureSource${r+1}, textureSampler${r+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}ge=function(t){return S[t]||(S[t]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${it(t)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${ot(t)}
            `}}),S[t]};const W={};function st(t){const e=[];for(let r=0;r<t;r++)r>0&&e.push("else"),r<t-1&&e.push(`if(vTextureId < ${r}.5)`),e.push("{"),e.push(`	outColor = texture(uTextures[${r}], vUV);`),e.push("}");return e.join(`
`)}Pe=function(t){return W[t]||(W[t]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${t}];

            `,main:`

                ${st(t)}
            `}}),W[t]},Me={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},_e={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},$={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},ye={...$,vertex:{...$.vertex,header:$.vertex.header.replace("group(1)","group(2)")}},we={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}},de=class{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(t,e,r,n){const i=this.renderable,s=this.texture,o=i.groupTransform,u=o.a,a=o.b,l=o.c,m=o.d,f=o.tx,d=o.ty,c=this.bounds,p=c.maxX,x=c.minX,v=c.maxY,b=c.minY,h=s.uvs,y=i.groupColorAlpha,C=n<<16|this.roundPixels&65535;t[r+0]=u*x+l*b+f,t[r+1]=m*b+a*x+d,t[r+2]=h.x0,t[r+3]=h.y0,e[r+4]=y,e[r+5]=C,t[r+6]=u*p+l*b+f,t[r+7]=m*b+a*p+d,t[r+8]=h.x1,t[r+9]=h.y1,e[r+10]=y,e[r+11]=C,t[r+12]=u*p+l*v+f,t[r+13]=m*v+a*p+d,t[r+14]=h.x2,t[r+15]=h.y2,e[r+16]=y,e[r+17]=C,t[r+18]=u*x+l*v+f,t[r+19]=m*v+a*x+d,t[r+20]=h.x3,t[r+21]=h.y3,e[r+22]=y,e[r+23]=C}packIndex(t,e,r){t[e]=r+0,t[e+1]=r+1,t[e+2]=r+2,t[e+3]=r+0,t[e+4]=r+2,t[e+5]=r+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}},xe=function(t,e,r){const n=(t>>24&255)/255;e[r++]=(t&255)/255*n,e[r++]=(t>>8&255)/255*n,e[r++]=(t>>16&255)/255*n,e[r++]=n}});export{de as B,_ as G,w as R,fe as S,me as T,H as U,mt as __tla,he as a,N as b,pe as c,M as d,$ as e,z as f,ge as g,K as h,xe as i,ve as j,be as k,ye as l,Pe as m,_e as n,we as o,Me as r};
