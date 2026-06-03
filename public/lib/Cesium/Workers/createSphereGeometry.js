/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.142.0
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as r}from"./chunk-4S36DQCV.js";import"./chunk-7ZAL4IN4.js";import{a as m}from"./chunk-3YGDD6EJ.js";import"./chunk-RKX5YL4I.js";import"./chunk-BBX7BBHZ.js";import"./chunk-2UKBY5SP.js";import"./chunk-BAQXDPDM.js";import"./chunk-4MLDGMEV.js";import"./chunk-BZDQ5KVN.js";import"./chunk-FZHW35IM.js";import"./chunk-RVZ4PQIT.js";import"./chunk-Z5W764BC.js";import"./chunk-FA6YXDGA.js";import"./chunk-RS2C3NYW.js";import{a as s}from"./chunk-IDLI2KSY.js";import"./chunk-LR6YGRET.js";import{b as p}from"./chunk-CCGTX3CU.js";import{f as c}from"./chunk-L2XSJNGP.js";function a(e){let t=e.radius??1,o={radii:new s(t,t,t),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,vertexFormat:e.vertexFormat};this._ellipsoidGeometry=new r(o),this._workerName="createSphereGeometry"}a.packedLength=r.packedLength;a.pack=function(e,t,n){return p.typeOf.object("value",e),r.pack(e._ellipsoidGeometry,t,n)};var l=new r,i={radius:void 0,radii:new s,vertexFormat:new m,stackPartitions:void 0,slicePartitions:void 0};a.unpack=function(e,t,n){let o=r.unpack(e,t,l);return i.vertexFormat=m.clone(o._vertexFormat,i.vertexFormat),i.stackPartitions=o._stackPartitions,i.slicePartitions=o._slicePartitions,c(n)?(s.clone(o._radii,i.radii),n._ellipsoidGeometry=new r(i),n):(i.radius=o._radii.x,new a(i))};a.createGeometry=function(e){return r.createGeometry(e._ellipsoidGeometry)};var d=a;function f(e,t){return c(t)&&(e=d.unpack(e,t)),d.createGeometry(e)}var w=f;export{w as default};
