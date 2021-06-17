"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("./TagsContainer.css");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../Redux/actions");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TagsContainer = /*#__PURE__*/_react.default.memo(props => {
  var _reduxDataList$filter2;

  const {
    DisplayBy
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const reduxDataList = (0, _reactRedux.useSelector)(state => state.dataList);
  (0, _react.useEffect)(() => {
    var _reduxDataList$filter;

    setTags((_reduxDataList$filter = reduxDataList === null || reduxDataList === void 0 ? void 0 : reduxDataList.filter(dl => dl.isSelected)) !== null && _reduxDataList$filter !== void 0 ? _reduxDataList$filter : []);
  }, [reduxDataList]);
  const [tags, setTags] = (0, _react.useState)((_reduxDataList$filter2 = reduxDataList === null || reduxDataList === void 0 ? void 0 : reduxDataList.filter(dl => dl.isSelected)) !== null && _reduxDataList$filter2 !== void 0 ? _reduxDataList$filter2 : []);

  const removeTags = (e, tag) => {
    dispatch((0, _actions.updateDataList)([...reduxDataList.map(dl => _objectSpread(_objectSpread({}, dl), {}, {
      isSelected: dl.Id == tag.Id ? false : dl.isSelected
    }))]));
  };

  const closeButtonHandler = e => {
    dispatch((0, _actions.deselectAll)());
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "tags-container"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    id: "tags"
  }, tags.map((tag, index) => /*#__PURE__*/_react.default.createElement("li", {
    key: index,
    className: "tag"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "tag-title"
  }, tag[DisplayBy]), /*#__PURE__*/_react.default.createElement("span", {
    className: "tag-close-icon",
    onClick: e => removeTags(e, tag)
  }, "\u2716")))), tags.length > 0 && /*#__PURE__*/_react.default.createElement("button", {
    onClick: closeButtonHandler,
    className: "close-button"
  }, "\u2716"));
});

var _default = TagsContainer;
exports.default = _default;