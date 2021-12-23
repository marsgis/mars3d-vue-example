#Cesium 功能扩展插件

说明： 对Threejs 和  于ammo.js物理引擎相关整合


github地址：https://github.com/MikesWei/CesiumMeshVisualizer

 
主要功能：
1、不直接支持threejs的mesh，但是支持Threejs的Geometry和BufferGeometry来构建几何体。内置了Threejs Geometry、BufferGeometry到Cesium.Geometry的转换接口，同时提供Cesium.Geometry到Threejs BufferGeometry的转换接口。这些接口由GeometryUtils类提供。
2、定义Mesh，支持Cesium.Geometry、THREE.Geometry、THREE.BufferGeometry以及CSG运算结果模型。
3、更方便的动态渲染和管理。同一个mesh，可以单独修改mesh的位置(position)、缩放(scale)、旋转角度(rotation/Quaternion)等属性；也可以单独修改 geometry和material；同一个geometry可以单独修改各个属性和索引。方便管理，且减少对象的局部变化带来的整个drawCommand重新构建次数，以期在更多动态渲染 对象同时改变的情况下（比如结合物理引擎做模拟），仍然保持较高的帧率，当然也牺牲了一定的内存。
4、定义MeshMaterial，目的是更方便的引用Threejs圈的那些炫酷特效Shader，减少整合所需的代码量。尤其是Cesium的Appearance从fragmentShader中分离出Material部分的Shader，并且作用域不一样之后，带来好多不便，引入网上那些炫酷特效Shader的时候真是头疼死了，谁做过谁才解其中味~ MeshMaterial区别于Cesium的Material，更像Threejs的Material,但不完全是。。。好像有点四不像~
5、定义FramebufferTexture，启发于Threejs的RenderTarget，暂且叫帧缓存纹理类吧，反正名字不重要~ MeshVisualizer和MeshMaterial一起支持此类纹 理，就当是普通的一张图片纹理就好了。它的用处就是，把Mesh渲染到帧缓存中，作为纹理参与其他Mesh的渲染。可以参考VolumeRendering示例。另外RendererUtils 提供了一个单次执行渲染到纹理的接口RendererUtils.renderToTexture。在不使用MeshVisualizer的时候，也就是自己基于drawCommand自定义一个Primitive的时 候也可以用得上。
6、整合CSG.js，支持使用Cesium.Geometry、THREE.Geometry、THREE.BufferGeometry做交、并、补等运算，并提供将运算结果CSG对象转成Cesium.Geometry、THREE.Geometry的接口。参考CSG示例。
7、提供基于ammo.js物理引擎的示例，示例源码源于Threejs，使用MeshVisualizer，可以在更少的代码修改情况下完成迁移整合，甚合我意。