/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.133
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

import{a as t}from"./chunk-VOEJSROL.js";import"./chunk-4SJGFIS6.js";import"./chunk-WE5RXDQO.js";import"./chunk-U7KNMP7R.js";import"./chunk-O6SEZKWO.js";import"./chunk-HU3PBDYN.js";import"./chunk-TMSCFWI2.js";import"./chunk-H4674FDM.js";import{a as c}from"./chunk-4ULLEHXL.js";import"./chunk-IZV5NST2.js";import"./chunk-FBZUI3UF.js";import"./chunk-XE3LXHBN.js";import{b as u}from"./chunk-NDZV4ITQ.js";import{e as a}from"./chunk-E6KVT7IM.js";function s(i){let e=i.radius??1,r={radii:new c(e,e,e),stackPartitions:i.stackPartitions,slicePartitions:i.slicePartitions,subdivisions:i.subdivisions};this._ellipsoidGeometry=new t(r),this._workerName="createSphereOutlineGeometry"}s.packedLength=t.packedLength;s.pack=function(i,e,o){return u.typeOf.object("value",i),t.pack(i._ellipsoidGeometry,e,o)};var l=new t,n={radius:void 0,radii:new c,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};s.unpack=function(i,e,o){let r=t.unpack(i,e,l);return n.stackPartitions=r._stackPartitions,n.slicePartitions=r._slicePartitions,n.subdivisions=r._subdivisions,a(o)?(c.clone(r._radii,n.radii),o._ellipsoidGeometry=new t(n),o):(n.radius=r._radii.x,new s(n))};s.createGeometry=function(i){return t.createGeometry(i._ellipsoidGeometry)};var d=s;function m(i,e){return a(e)&&(i=d.unpack(i,e)),d.createGeometry(i)}var h=m;export{h as default};
