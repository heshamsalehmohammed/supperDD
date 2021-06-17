"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagsContainer = exports.SuperDD = void 0;

var _react = _interopRequireDefault(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _SuperDD = _interopRequireDefault(require("./SuperDD/SuperDD"));

var _TagsContainer = _interopRequireDefault(require("./TagsContainer/TagsContainer"));

var _reducer = _interopRequireDefault(require("./Redux/reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = (0, _redux.createStore)(_reducer.default);

const SuperDD = props => {
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_SuperDD.default, props));
};

exports.SuperDD = SuperDD;

const TagsContainer = props => {
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_TagsContainer.default, props));
};

exports.TagsContainer = TagsContainer;