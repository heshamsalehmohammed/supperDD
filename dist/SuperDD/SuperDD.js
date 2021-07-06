"use strict";const _excluded=["isSelected"];Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("core-js/modules/web.dom-collections.iterator.js"),require("core-js/modules/es.regexp.to-string.js"),require("core-js/modules/es.array.sort.js"),require("./SuperDD.css");var _react=_interopRequireWildcard(require("react")),_reactRedux=require("react-redux"),_actions=require("../Redux/actions"),_enums=require("../Common/enums");function _getRequireWildcardCache(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(_getRequireWildcardCache=function _getRequireWildcardCache(a){return a?c:b})(a)}function _interopRequireWildcard(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=_getRequireWildcardCache(b);if(c&&c.has(a))return c.get(a);var d={},e=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in a)if("default"!=f&&Object.prototype.hasOwnProperty.call(a,f)){var g=e?Object.getOwnPropertyDescriptor(a,f):null;g&&(g.get||g.set)?Object.defineProperty(d,f,g):d[f]=a[f]}return d.default=a,c&&c.set(a,d),d}function _objectWithoutProperties(a,b){if(null==a)return{};var c,d,e=_objectWithoutPropertiesLoose(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}function _objectWithoutPropertiesLoose(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}const SuperDD=/*#__PURE__*/_react.default.memo(a=>{const{DataList:b,UniqueKey:c,DisplayBy:d,PlaceHolder:f="Select Items ...",ShowUpdateButton:g=!0,ShowCancelButton:h=!0,UpdateAction:i=()=>{},CancelAction:j=()=>{},Filterable:k=!0,Sortable:l=!0,SetSelectedItems:e,CloseAfterEachUpdate:m=!1,SelectFiltered:n=!1}=a;if(!c)throw new Error("the name of the UniqueKey of your data must be provided");const o=(0,_reactRedux.useDispatch)(),[p,q]=(0,_react.useState)(""),[r,s]=(0,_react.useState)(!1),[t,u]=(0,_react.useState)(_enums.SortState.None),v=(0,_reactRedux.useSelector)(a=>a.dataList),w=function getInitLocalDataList(){let a=!(0<arguments.length&&arguments[0]!==void 0)||arguments[0];if(a&&0<v.length)return v;var c;return null!==(c=null===b||void 0===b?void 0:b.map(a=>_objectSpread(_objectSpread({},a),{},{isSelected:!1})))&&void 0!==c?c:[]},[x,y]=(0,_react.useState)(w());(0,_react.useEffect)(()=>{o((0,_actions.setUniqueKey)(c))},[c]),(0,_react.useEffect)(()=>{""!=v.map(a=>a.isSelected).toString()&&(y(w()),F())},[v.map(a=>a.isSelected).toString()]),(0,_react.useEffect)(()=>{o((0,_actions.updateDataList)([])),y(w(!1))},[b.map(a=>a[c]).toString()]);const z=(a,b)=>{y(x.map(d=>_objectSpread(_objectSpread({},d),{},{isSelected:d[c]==b[c]?a.target.checked:d.isSelected})))},A=()=>x.filter(a=>-1!==a[d].toLowerCase().indexOf(null===p||void 0===p?void 0:p.toLowerCase())),B=()=>{y(x.map(a=>_objectSpread(_objectSpread({},a),{},{isSelected:!1})))},C=()=>{y(x.map(a=>_objectSpread(_objectSpread({},a),{},{isSelected:!0})))},D=()=>{let a=A();y(x.map(b=>_objectSpread(_objectSpread({},b),{},{isSelected:!(-1!=a.findIndex(a=>a[c]===b[c]))&&b.isSelected})))},E=()=>{let a=A();y(x.map(b=>_objectSpread(_objectSpread({},b),{},{isSelected:-1!=a.findIndex(a=>a[c]===b[c])||b.isSelected})))},F=()=>{const a=[...v.filter(a=>a.isSelected).map(a=>{const{isSelected:b}=a,c=_objectWithoutProperties(a,_excluded);return c})];e&&e(a),i(a)},G=()=>{r?s(!1):s(!0)},H=()=>x.every(a=>a.isSelected),I=()=>A().every(a=>a.isSelected);return/*#__PURE__*/_react.default.createElement("div",{className:"supperDD"},/*#__PURE__*/_react.default.createElement("div",{className:"superdd-select-wrapper"},/*#__PURE__*/_react.default.createElement("div",{className:"superdd-select"},/*#__PURE__*/_react.default.createElement("div",{onClick:G,className:r?"superdd-select-output active":"superdd-select-output"},/*#__PURE__*/_react.default.createElement("p",null,f),/*#__PURE__*/_react.default.createElement("div",{className:"icon"},/*#__PURE__*/_react.default.createElement("div",{className:"dropdown"}))),/*#__PURE__*/_react.default.createElement("div",{className:r?"superdd-select-box show":"superdd-select-box"},k&&/*#__PURE__*/_react.default.createElement("div",{className:"superdd-search-input-container"},/*#__PURE__*/_react.default.createElement("input",{className:"superdd-search-input",onChange:a=>{q(a.target.value)},type:"text"}),/*#__PURE__*/_react.default.createElement("div",{className:"superdd-selectall-container"},/*#__PURE__*/_react.default.createElement("div",{className:"selectall-checkbox"},/*#__PURE__*/_react.default.createElement("input",{type:"checkbox",onChange:n?()=>{I()?D():E()}:()=>{H()?B():C()},className:"superdd-selectall-input supperDDcheckbox",title:"Select All",checked:n?I():H()}),/*#__PURE__*/_react.default.createElement("label",null,"Select All")),/*#__PURE__*/_react.default.createElement("div",{onClick:()=>{switch(t){case _enums.SortState.None:u(_enums.SortState.Asc);break;case _enums.SortState.Asc:u(_enums.SortState.Des);break;case _enums.SortState.Des:u(_enums.SortState.None);break;default:}},className:"sort-button"},(()=>{if(!l)return"";return t===_enums.SortState.None?/*#__PURE__*/_react.default.createElement("span",null,"\u296F"):t===_enums.SortState.Asc?/*#__PURE__*/_react.default.createElement("span",null,"\u2963"):t===_enums.SortState.Des?/*#__PURE__*/_react.default.createElement("span",null,"\u2965"):""})()))),/*#__PURE__*/_react.default.createElement("div",{className:"supperDDcheckbox-list-container"},(()=>{let a=A(),b=a;return(t==_enums.SortState.Asc||t==_enums.SortState.Des)&&l&&(b=a.sort(function(c,a){var b=c[d].toUpperCase(),e=a[d].toUpperCase();return b<e?t==_enums.SortState.Asc?-1:1:b>e?t==_enums.SortState.Asc?1:-1:0})),b.map((a,b)=>/*#__PURE__*/_react.default.createElement("div",{key:b,className:"supperDDcheckbox-container"+(a.isSelected?" supperDDcheckbox-active":"")},/*#__PURE__*/_react.default.createElement("input",{type:"checkbox",className:"supperDDcheckbox",onChange:b=>z(b,a),checked:a.isSelected}),/*#__PURE__*/_react.default.createElement("label",{className:"supperDDcheckbox-label"},a[d])))})()),/*#__PURE__*/_react.default.createElement("div",{className:"superdd-select-buttons"},g&&/*#__PURE__*/_react.default.createElement("button",{onClick:()=>{o((0,_actions.updateDataList)(x)),m&&G()},type:"button"},"Update"),h&&/*#__PURE__*/_react.default.createElement("button",{onClick:()=>{j(),G()},type:"button"},"Cancel"))))))});var _default=SuperDD;exports.default=_default;