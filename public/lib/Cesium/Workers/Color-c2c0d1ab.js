define(["exports","./defaultValue-f6d5e6da","./Transforms-aa2fd6b7","./Math-2ce22ee9"],(function(e,r,t,o){"use strict";function s(e,r,t){return t<0&&(t+=1),t>1&&(t-=1),6*t<1?e+6*(r-e)*t:2*t<1?r:3*t<2?e+(r-e)*(2/3-t)*6:e}function f(e,t,o,s){this.red=r.defaultValue(e,1),this.green=r.defaultValue(t,1),this.blue=r.defaultValue(o,1),this.alpha=r.defaultValue(s,1)}let n,l,C;f.fromCartesian4=function(e,t){return r.defined(t)?(t.red=e.x,t.green=e.y,t.blue=e.z,t.alpha=e.w,t):new f(e.x,e.y,e.z,e.w)},f.fromBytes=function(e,t,o,s,n){return e=f.byteToFloat(r.defaultValue(e,255)),t=f.byteToFloat(r.defaultValue(t,255)),o=f.byteToFloat(r.defaultValue(o,255)),s=f.byteToFloat(r.defaultValue(s,255)),r.defined(n)?(n.red=e,n.green=t,n.blue=o,n.alpha=s,n):new f(e,t,o,s)},f.fromAlpha=function(e,t,o){return r.defined(o)?(o.red=e.red,o.green=e.green,o.blue=e.blue,o.alpha=t,o):new f(e.red,e.green,e.blue,t)},t.FeatureDetection.supportsTypedArrays()&&(n=new ArrayBuffer(4),l=new Uint32Array(n),C=new Uint8Array(n)),f.fromRgba=function(e,r){return l[0]=e,f.fromBytes(C[0],C[1],C[2],C[3],r)},f.fromHsl=function(e,t,o,n,l){e=r.defaultValue(e,0)%1,t=r.defaultValue(t,0),o=r.defaultValue(o,0),n=r.defaultValue(n,1);let C=o,i=o,a=o;if(0!==t){let r;r=o<.5?o*(1+t):o+t-o*t;const f=2*o-r;C=s(f,r,e+1/3),i=s(f,r,e),a=s(f,r,e-1/3)}return r.defined(l)?(l.red=C,l.green=i,l.blue=a,l.alpha=n,l):new f(C,i,a,n)},f.fromRandom=function(e,t){let s=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).red;if(!r.defined(s)){const t=r.defaultValue(e.minimumRed,0),f=r.defaultValue(e.maximumRed,1);s=t+o.CesiumMath.nextRandomNumber()*(f-t)}let n=e.green;if(!r.defined(n)){const t=r.defaultValue(e.minimumGreen,0),s=r.defaultValue(e.maximumGreen,1);n=t+o.CesiumMath.nextRandomNumber()*(s-t)}let l=e.blue;if(!r.defined(l)){const t=r.defaultValue(e.minimumBlue,0),s=r.defaultValue(e.maximumBlue,1);l=t+o.CesiumMath.nextRandomNumber()*(s-t)}let C=e.alpha;if(!r.defined(C)){const t=r.defaultValue(e.minimumAlpha,0),s=r.defaultValue(e.maximumAlpha,1);C=t+o.CesiumMath.nextRandomNumber()*(s-t)}return r.defined(t)?(t.red=s,t.green=n,t.blue=l,t.alpha=C,t):new f(s,n,l,C)};const i=/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,a=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,E=/^rgba?\s*\(\s*([0-9.]+%?)\s*[,\s]+\s*([0-9.]+%?)\s*[,\s]+\s*([0-9.]+%?)(?:\s*[,\s/]+\s*([0-9.]+))?\s*\)$/i,u=/^hsla?\s*\(\s*([0-9.]+)\s*[,\s]+\s*([0-9.]+%)\s*[,\s]+\s*([0-9.]+%)(?:\s*[,\s/]+\s*([0-9.]+))?\s*\)$/i;f.fromCssColorString=function(e,t){r.defined(t)||(t=new f);const o=f[(e=e.trim()).toUpperCase()];if(r.defined(o))return f.clone(o,t),t;let s=i.exec(e);return null!==s?(t.red=parseInt(s[1],16)/15,t.green=parseInt(s[2],16)/15,t.blue=parseInt(s[3],16)/15,t.alpha=parseInt(r.defaultValue(s[4],"f"),16)/15,t):(s=a.exec(e),null!==s?(t.red=parseInt(s[1],16)/255,t.green=parseInt(s[2],16)/255,t.blue=parseInt(s[3],16)/255,t.alpha=parseInt(r.defaultValue(s[4],"ff"),16)/255,t):(s=E.exec(e),null!==s?(t.red=parseFloat(s[1])/("%"===s[1].substr(-1)?100:255),t.green=parseFloat(s[2])/("%"===s[2].substr(-1)?100:255),t.blue=parseFloat(s[3])/("%"===s[3].substr(-1)?100:255),t.alpha=parseFloat(r.defaultValue(s[4],"1.0")),t):(s=u.exec(e),null!==s?f.fromHsl(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,parseFloat(r.defaultValue(s[4],"1.0")),t):t=void 0)))},f.packedLength=4,f.pack=function(e,t,o){return o=r.defaultValue(o,0),t[o++]=e.red,t[o++]=e.green,t[o++]=e.blue,t[o]=e.alpha,t},f.unpack=function(e,t,o){return t=r.defaultValue(t,0),r.defined(o)||(o=new f),o.red=e[t++],o.green=e[t++],o.blue=e[t++],o.alpha=e[t],o},f.byteToFloat=function(e){return e/255},f.floatToByte=function(e){return 1===e?255:256*e|0},f.clone=function(e,t){if(r.defined(e))return r.defined(t)?(t.red=e.red,t.green=e.green,t.blue=e.blue,t.alpha=e.alpha,t):new f(e.red,e.green,e.blue,e.alpha)},f.equals=function(e,t){return e===t||r.defined(e)&&r.defined(t)&&e.red===t.red&&e.green===t.green&&e.blue===t.blue&&e.alpha===t.alpha},f.equalsArray=function(e,r,t){return e.red===r[t]&&e.green===r[t+1]&&e.blue===r[t+2]&&e.alpha===r[t+3]},f.prototype.clone=function(e){return f.clone(this,e)},f.prototype.equals=function(e){return f.equals(this,e)},f.prototype.equalsEpsilon=function(e,t){return this===e||r.defined(e)&&Math.abs(this.red-e.red)<=t&&Math.abs(this.green-e.green)<=t&&Math.abs(this.blue-e.blue)<=t&&Math.abs(this.alpha-e.alpha)<=t},f.prototype.toString=function(){return`(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`},f.prototype.toCssColorString=function(){const e=f.floatToByte(this.red),r=f.floatToByte(this.green),t=f.floatToByte(this.blue);return 1===this.alpha?`rgb(${e},${r},${t})`:`rgba(${e},${r},${t},${this.alpha})`},f.prototype.toCssHexString=function(){let e=f.floatToByte(this.red).toString(16);e.length<2&&(e=`0${e}`);let r=f.floatToByte(this.green).toString(16);r.length<2&&(r=`0${r}`);let t=f.floatToByte(this.blue).toString(16);if(t.length<2&&(t=`0${t}`),this.alpha<1){let o=f.floatToByte(this.alpha).toString(16);return o.length<2&&(o=`0${o}`),`#${e}${r}${t}${o}`}return`#${e}${r}${t}`},f.prototype.toBytes=function(e){const t=f.floatToByte(this.red),o=f.floatToByte(this.green),s=f.floatToByte(this.blue),n=f.floatToByte(this.alpha);return r.defined(e)?(e[0]=t,e[1]=o,e[2]=s,e[3]=n,e):[t,o,s,n]},f.prototype.toRgba=function(){return C[0]=f.floatToByte(this.red),C[1]=f.floatToByte(this.green),C[2]=f.floatToByte(this.blue),C[3]=f.floatToByte(this.alpha),l[0]},f.prototype.brighten=function(e,r){return e=1-e,r.red=1-(1-this.red)*e,r.green=1-(1-this.green)*e,r.blue=1-(1-this.blue)*e,r.alpha=this.alpha,r},f.prototype.darken=function(e,r){return e=1-e,r.red=this.red*e,r.green=this.green*e,r.blue=this.blue*e,r.alpha=this.alpha,r},f.prototype.withAlpha=function(e,r){return f.fromAlpha(this,e,r)},f.add=function(e,r,t){return t.red=e.red+r.red,t.green=e.green+r.green,t.blue=e.blue+r.blue,t.alpha=e.alpha+r.alpha,t},f.subtract=function(e,r,t){return t.red=e.red-r.red,t.green=e.green-r.green,t.blue=e.blue-r.blue,t.alpha=e.alpha-r.alpha,t},f.multiply=function(e,r,t){return t.red=e.red*r.red,t.green=e.green*r.green,t.blue=e.blue*r.blue,t.alpha=e.alpha*r.alpha,t},f.divide=function(e,r,t){return t.red=e.red/r.red,t.green=e.green/r.green,t.blue=e.blue/r.blue,t.alpha=e.alpha/r.alpha,t},f.mod=function(e,r,t){return t.red=e.red%r.red,t.green=e.green%r.green,t.blue=e.blue%r.blue,t.alpha=e.alpha%r.alpha,t},f.lerp=function(e,r,t,s){return s.red=o.CesiumMath.lerp(e.red,r.red,t),s.green=o.CesiumMath.lerp(e.green,r.green,t),s.blue=o.CesiumMath.lerp(e.blue,r.blue,t),s.alpha=o.CesiumMath.lerp(e.alpha,r.alpha,t),s},f.multiplyByScalar=function(e,r,t){return t.red=e.red*r,t.green=e.green*r,t.blue=e.blue*r,t.alpha=e.alpha*r,t},f.divideByScalar=function(e,r,t){return t.red=e.red/r,t.green=e.green/r,t.blue=e.blue/r,t.alpha=e.alpha/r,t},f.ALICEBLUE=Object.freeze(f.fromCssColorString("#F0F8FF")),f.ANTIQUEWHITE=Object.freeze(f.fromCssColorString("#FAEBD7")),f.AQUA=Object.freeze(f.fromCssColorString("#00FFFF")),f.AQUAMARINE=Object.freeze(f.fromCssColorString("#7FFFD4")),f.AZURE=Object.freeze(f.fromCssColorString("#F0FFFF")),f.BEIGE=Object.freeze(f.fromCssColorString("#F5F5DC")),f.BISQUE=Object.freeze(f.fromCssColorString("#FFE4C4")),f.BLACK=Object.freeze(f.fromCssColorString("#000000")),f.BLANCHEDALMOND=Object.freeze(f.fromCssColorString("#FFEBCD")),f.BLUE=Object.freeze(f.fromCssColorString("#0000FF")),f.BLUEVIOLET=Object.freeze(f.fromCssColorString("#8A2BE2")),f.BROWN=Object.freeze(f.fromCssColorString("#A52A2A")),f.BURLYWOOD=Object.freeze(f.fromCssColorString("#DEB887")),f.CADETBLUE=Object.freeze(f.fromCssColorString("#5F9EA0")),f.CHARTREUSE=Object.freeze(f.fromCssColorString("#7FFF00")),f.CHOCOLATE=Object.freeze(f.fromCssColorString("#D2691E")),f.CORAL=Object.freeze(f.fromCssColorString("#FF7F50")),f.CORNFLOWERBLUE=Object.freeze(f.fromCssColorString("#6495ED")),f.CORNSILK=Object.freeze(f.fromCssColorString("#FFF8DC")),f.CRIMSON=Object.freeze(f.fromCssColorString("#DC143C")),f.CYAN=Object.freeze(f.fromCssColorString("#00FFFF")),f.DARKBLUE=Object.freeze(f.fromCssColorString("#00008B")),f.DARKCYAN=Object.freeze(f.fromCssColorString("#008B8B")),f.DARKGOLDENROD=Object.freeze(f.fromCssColorString("#B8860B")),f.DARKGRAY=Object.freeze(f.fromCssColorString("#A9A9A9")),f.DARKGREEN=Object.freeze(f.fromCssColorString("#006400")),f.DARKGREY=f.DARKGRAY,f.DARKKHAKI=Object.freeze(f.fromCssColorString("#BDB76B")),f.DARKMAGENTA=Object.freeze(f.fromCssColorString("#8B008B")),f.DARKOLIVEGREEN=Object.freeze(f.fromCssColorString("#556B2F")),f.DARKORANGE=Object.freeze(f.fromCssColorString("#FF8C00")),f.DARKORCHID=Object.freeze(f.fromCssColorString("#9932CC")),f.DARKRED=Object.freeze(f.fromCssColorString("#8B0000")),f.DARKSALMON=Object.freeze(f.fromCssColorString("#E9967A")),f.DARKSEAGREEN=Object.freeze(f.fromCssColorString("#8FBC8F")),f.DARKSLATEBLUE=Object.freeze(f.fromCssColorString("#483D8B")),f.DARKSLATEGRAY=Object.freeze(f.fromCssColorString("#2F4F4F")),f.DARKSLATEGREY=f.DARKSLATEGRAY,f.DARKTURQUOISE=Object.freeze(f.fromCssColorString("#00CED1")),f.DARKVIOLET=Object.freeze(f.fromCssColorString("#9400D3")),f.DEEPPINK=Object.freeze(f.fromCssColorString("#FF1493")),f.DEEPSKYBLUE=Object.freeze(f.fromCssColorString("#00BFFF")),f.DIMGRAY=Object.freeze(f.fromCssColorString("#696969")),f.DIMGREY=f.DIMGRAY,f.DODGERBLUE=Object.freeze(f.fromCssColorString("#1E90FF")),f.FIREBRICK=Object.freeze(f.fromCssColorString("#B22222")),f.FLORALWHITE=Object.freeze(f.fromCssColorString("#FFFAF0")),f.FORESTGREEN=Object.freeze(f.fromCssColorString("#228B22")),f.FUCHSIA=Object.freeze(f.fromCssColorString("#FF00FF")),f.GAINSBORO=Object.freeze(f.fromCssColorString("#DCDCDC")),f.GHOSTWHITE=Object.freeze(f.fromCssColorString("#F8F8FF")),f.GOLD=Object.freeze(f.fromCssColorString("#FFD700")),f.GOLDENROD=Object.freeze(f.fromCssColorString("#DAA520")),f.GRAY=Object.freeze(f.fromCssColorString("#808080")),f.GREEN=Object.freeze(f.fromCssColorString("#008000")),f.GREENYELLOW=Object.freeze(f.fromCssColorString("#ADFF2F")),f.GREY=f.GRAY,f.HONEYDEW=Object.freeze(f.fromCssColorString("#F0FFF0")),f.HOTPINK=Object.freeze(f.fromCssColorString("#FF69B4")),f.INDIANRED=Object.freeze(f.fromCssColorString("#CD5C5C")),f.INDIGO=Object.freeze(f.fromCssColorString("#4B0082")),f.IVORY=Object.freeze(f.fromCssColorString("#FFFFF0")),f.KHAKI=Object.freeze(f.fromCssColorString("#F0E68C")),f.LAVENDER=Object.freeze(f.fromCssColorString("#E6E6FA")),f.LAVENDAR_BLUSH=Object.freeze(f.fromCssColorString("#FFF0F5")),f.LAWNGREEN=Object.freeze(f.fromCssColorString("#7CFC00")),f.LEMONCHIFFON=Object.freeze(f.fromCssColorString("#FFFACD")),f.LIGHTBLUE=Object.freeze(f.fromCssColorString("#ADD8E6")),f.LIGHTCORAL=Object.freeze(f.fromCssColorString("#F08080")),f.LIGHTCYAN=Object.freeze(f.fromCssColorString("#E0FFFF")),f.LIGHTGOLDENRODYELLOW=Object.freeze(f.fromCssColorString("#FAFAD2")),f.LIGHTGRAY=Object.freeze(f.fromCssColorString("#D3D3D3")),f.LIGHTGREEN=Object.freeze(f.fromCssColorString("#90EE90")),f.LIGHTGREY=f.LIGHTGRAY,f.LIGHTPINK=Object.freeze(f.fromCssColorString("#FFB6C1")),f.LIGHTSEAGREEN=Object.freeze(f.fromCssColorString("#20B2AA")),f.LIGHTSKYBLUE=Object.freeze(f.fromCssColorString("#87CEFA")),f.LIGHTSLATEGRAY=Object.freeze(f.fromCssColorString("#778899")),f.LIGHTSLATEGREY=f.LIGHTSLATEGRAY,f.LIGHTSTEELBLUE=Object.freeze(f.fromCssColorString("#B0C4DE")),f.LIGHTYELLOW=Object.freeze(f.fromCssColorString("#FFFFE0")),f.LIME=Object.freeze(f.fromCssColorString("#00FF00")),f.LIMEGREEN=Object.freeze(f.fromCssColorString("#32CD32")),f.LINEN=Object.freeze(f.fromCssColorString("#FAF0E6")),f.MAGENTA=Object.freeze(f.fromCssColorString("#FF00FF")),f.MAROON=Object.freeze(f.fromCssColorString("#800000")),f.MEDIUMAQUAMARINE=Object.freeze(f.fromCssColorString("#66CDAA")),f.MEDIUMBLUE=Object.freeze(f.fromCssColorString("#0000CD")),f.MEDIUMORCHID=Object.freeze(f.fromCssColorString("#BA55D3")),f.MEDIUMPURPLE=Object.freeze(f.fromCssColorString("#9370DB")),f.MEDIUMSEAGREEN=Object.freeze(f.fromCssColorString("#3CB371")),f.MEDIUMSLATEBLUE=Object.freeze(f.fromCssColorString("#7B68EE")),f.MEDIUMSPRINGGREEN=Object.freeze(f.fromCssColorString("#00FA9A")),f.MEDIUMTURQUOISE=Object.freeze(f.fromCssColorString("#48D1CC")),f.MEDIUMVIOLETRED=Object.freeze(f.fromCssColorString("#C71585")),f.MIDNIGHTBLUE=Object.freeze(f.fromCssColorString("#191970")),f.MINTCREAM=Object.freeze(f.fromCssColorString("#F5FFFA")),f.MISTYROSE=Object.freeze(f.fromCssColorString("#FFE4E1")),f.MOCCASIN=Object.freeze(f.fromCssColorString("#FFE4B5")),f.NAVAJOWHITE=Object.freeze(f.fromCssColorString("#FFDEAD")),f.NAVY=Object.freeze(f.fromCssColorString("#000080")),f.OLDLACE=Object.freeze(f.fromCssColorString("#FDF5E6")),f.OLIVE=Object.freeze(f.fromCssColorString("#808000")),f.OLIVEDRAB=Object.freeze(f.fromCssColorString("#6B8E23")),f.ORANGE=Object.freeze(f.fromCssColorString("#FFA500")),f.ORANGERED=Object.freeze(f.fromCssColorString("#FF4500")),f.ORCHID=Object.freeze(f.fromCssColorString("#DA70D6")),f.PALEGOLDENROD=Object.freeze(f.fromCssColorString("#EEE8AA")),f.PALEGREEN=Object.freeze(f.fromCssColorString("#98FB98")),f.PALETURQUOISE=Object.freeze(f.fromCssColorString("#AFEEEE")),f.PALEVIOLETRED=Object.freeze(f.fromCssColorString("#DB7093")),f.PAPAYAWHIP=Object.freeze(f.fromCssColorString("#FFEFD5")),f.PEACHPUFF=Object.freeze(f.fromCssColorString("#FFDAB9")),f.PERU=Object.freeze(f.fromCssColorString("#CD853F")),f.PINK=Object.freeze(f.fromCssColorString("#FFC0CB")),f.PLUM=Object.freeze(f.fromCssColorString("#DDA0DD")),f.POWDERBLUE=Object.freeze(f.fromCssColorString("#B0E0E6")),f.PURPLE=Object.freeze(f.fromCssColorString("#800080")),f.RED=Object.freeze(f.fromCssColorString("#FF0000")),f.ROSYBROWN=Object.freeze(f.fromCssColorString("#BC8F8F")),f.ROYALBLUE=Object.freeze(f.fromCssColorString("#4169E1")),f.SADDLEBROWN=Object.freeze(f.fromCssColorString("#8B4513")),f.SALMON=Object.freeze(f.fromCssColorString("#FA8072")),f.SANDYBROWN=Object.freeze(f.fromCssColorString("#F4A460")),f.SEAGREEN=Object.freeze(f.fromCssColorString("#2E8B57")),f.SEASHELL=Object.freeze(f.fromCssColorString("#FFF5EE")),f.SIENNA=Object.freeze(f.fromCssColorString("#A0522D")),f.SILVER=Object.freeze(f.fromCssColorString("#C0C0C0")),f.SKYBLUE=Object.freeze(f.fromCssColorString("#87CEEB")),f.SLATEBLUE=Object.freeze(f.fromCssColorString("#6A5ACD")),f.SLATEGRAY=Object.freeze(f.fromCssColorString("#708090")),f.SLATEGREY=f.SLATEGRAY,f.SNOW=Object.freeze(f.fromCssColorString("#FFFAFA")),f.SPRINGGREEN=Object.freeze(f.fromCssColorString("#00FF7F")),f.STEELBLUE=Object.freeze(f.fromCssColorString("#4682B4")),f.TAN=Object.freeze(f.fromCssColorString("#D2B48C")),f.TEAL=Object.freeze(f.fromCssColorString("#008080")),f.THISTLE=Object.freeze(f.fromCssColorString("#D8BFD8")),f.TOMATO=Object.freeze(f.fromCssColorString("#FF6347")),f.TURQUOISE=Object.freeze(f.fromCssColorString("#40E0D0")),f.VIOLET=Object.freeze(f.fromCssColorString("#EE82EE")),f.WHEAT=Object.freeze(f.fromCssColorString("#F5DEB3")),f.WHITE=Object.freeze(f.fromCssColorString("#FFFFFF")),f.WHITESMOKE=Object.freeze(f.fromCssColorString("#F5F5F5")),f.YELLOW=Object.freeze(f.fromCssColorString("#FFFF00")),f.YELLOWGREEN=Object.freeze(f.fromCssColorString("#9ACD32")),f.TRANSPARENT=Object.freeze(new f(0,0,0,0)),e.Color=f}));