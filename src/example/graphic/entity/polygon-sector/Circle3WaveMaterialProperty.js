// import * as Cesium from "mars3d-cesium"
// import { PolyWood } from "../../const/MaterialType"

// 自定义材质的命名
const Circle3WaveType = "Circle3Wave"

// 注册至材质，用于Primitive
mars3d.MaterialUtil.register(Circle3WaveType, {
  fabric: {
    uniforms: {
      color1: Cesium.Color.RED,
      color2: Cesium.Color.YELLOW,
      color3: Cesium.Color.BLUE,
      alpha: 1.0,
      speed: 10.0,
      globalAlpha: 1.0
    },
    source: `czm_material czm_getMaterial(czm_materialInput materialInput)
      {
          czm_material material = czm_getDefaultMaterial(materialInput);
          vec2 st = materialInput.st;
          float dis = distance(st, vec2(0.5, 0.5));
          float per = fract(speed*czm_frameNumber/1000.0);
          float scale = per * 0.5;
          if(dis > scale){
            discard;
          }else {
            material.alpha = alpha * globalAlpha;
          }

          if(dis < scale/3.0)
            material.diffuse = color1.rgb;
          else  if(dis>scale/3.0 && dis<scale*2.0/3.0)
            material.diffuse =  color2.rgb;
          else
            material.diffuse = color3.rgb;

          return material;
      }`
  },
  translucent: true
})

/**
 * 自定义属性材质，用于Entity对象
 */
class Circle3WaveMaterialProperty extends mars3d.material.BaseMaterialProperty {
  // 材质名称
  getType(time) {
    return Circle3WaveType
  }

  // 更新属性
  getValue(time, result) {
    if (!Cesium.defined(result)) {
      result = {}
    }

    result.color1 = this.options.color1 ?? Cesium.Color.RED
    result.color2 = this.options.color2 ?? Cesium.Color.YELLOW
    result.color3 = this.options.color3 ?? Cesium.Color.BLUE
    result.alpha = this.options.alpha ?? 1.0
    result.speed = this.options.speed ?? 10.0
    result.globalAlpha = this.options.globalAlpha ?? 1

    return result
  }
}
mars3d.MaterialUtil.registerPropertyClass(Circle3WaveType, Circle3WaveMaterialProperty)
