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

import{a as f}from"./chunk-EIWLUTKC.js";import"./chunk-MAOOIJFB.js";import"./chunk-OBKERRFX.js";import{a as u}from"./chunk-NIII5EFF.js";import"./chunk-QEHDFCIC.js";import"./chunk-XLRPLD2K.js";import"./chunk-FKSSFSOY.js";import"./chunk-LON2ZWED.js";import"./chunk-KGMYW3M3.js";import"./chunk-4H24WXIW.js";import"./chunk-KL3HPWEC.js";import"./chunk-RKX5YL4I.js";import"./chunk-BAQXDPDM.js";import"./chunk-4MLDGMEV.js";import"./chunk-BZDQ5KVN.js";import"./chunk-FZHW35IM.js";import"./chunk-RVZ4PQIT.js";import"./chunk-Z5W764BC.js";import"./chunk-FA6YXDGA.js";import"./chunk-RS2C3NYW.js";import"./chunk-IDLI2KSY.js";import"./chunk-LR6YGRET.js";import"./chunk-CCGTX3CU.js";import"./chunk-L2XSJNGP.js";function h(c,d){let e=f.upsampleMesh(c),t=e.vertices.buffer,i=e.indices.buffer,s=e.westIndicesSouthToNorth.buffer,o=e.southIndicesEastToWest.buffer,r=e.eastIndicesNorthToSouth.buffer,n=e.northIndicesWestToEast.buffer;return d.push(t,i,s,o,r,n),{verticesBuffer:t,indicesBuffer:i,vertexCountWithoutSkirts:e.vertexCountWithoutSkirts,indexCountWithoutSkirts:e.indexCountWithoutSkirts,encoding:e.encoding,westIndicesBuffer:s,southIndicesBuffer:o,eastIndicesBuffer:r,northIndicesBuffer:n,minimumHeight:e.minimumHeight,maximumHeight:e.maximumHeight,boundingSphere:e.boundingSphere3D,orientedBoundingBox:e.orientedBoundingBox,horizonOcclusionPoint:e.horizonOcclusionPoint}}var I=u(h);export{I as default};
