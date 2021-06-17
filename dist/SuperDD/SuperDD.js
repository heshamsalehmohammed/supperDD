"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("./SuperDD.css");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../Redux/actions");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SuperDD = /*#__PURE__*/_react.default.memo(props => {
  const {
    DataList,
    DisplayBy,
    PlaceHolder = 'Select Items ...',
    ShowUpdateButton = true,
    ShowCancelButton = true,
    UpdateAction = () => {},
    CancelAction = () => {},
    Filterable = true
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const [search, setSearch] = (0, _react.useState)('');
  const reduxDataList = (0, _reactRedux.useSelector)(state => state.dataList);

  const getInitLocalDataList = () => {
    if (reduxDataList && reduxDataList.length > 0) {
      return reduxDataList;
    } else {
      var _DataList$map;

      return (_DataList$map = DataList === null || DataList === void 0 ? void 0 : DataList.map(dl => _objectSpread(_objectSpread({}, dl), {}, {
        isSelected: false
      }))) !== null && _DataList$map !== void 0 ? _DataList$map : [];
    }
  };

  const [localDataList, setLocalDataList] = (0, _react.useState)(getInitLocalDataList());
  (0, _react.useEffect)(() => {
    setLocalDataList(getInitLocalDataList());
  }, [reduxDataList]);
  const supperDDSelectBoxRef = (0, _react.useRef)(null);
  const supperDDSelectOutputRef = (0, _react.useRef)(null);

  const handleCheckboxClicked = (event, objectOfList) => {
    setLocalDataList(localDataList.map(ldl => _objectSpread(_objectSpread({}, ldl), {}, {
      isSelected: ldl.Id == objectOfList.Id ? event.target.checked : ldl.isSelected
    })));
  };

  const getLiListItems = () => {
    return localDataList.filter(ldl => {
      return ldl[DisplayBy].toLowerCase().indexOf(search === null || search === void 0 ? void 0 : search.toLowerCase()) !== -1;
    }).map((value, index) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: index,
        className: 'supperDDcheckbox-container' + (value.isSelected ? ' supperDDcheckbox-active' : '')
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "checkbox",
        className: "supperDDcheckbox",
        onChange: e => handleCheckboxClicked(e, value),
        checked: value.isSelected
      }), /*#__PURE__*/_react.default.createElement("label", {
        className: "supperDDcheckbox-label"
      }, value[DisplayBy]));
    });
  };

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const handleSelectAll = e => {
    if (localDataList.every(ldl => ldl.isSelected)) {
      //deselect all
      deselectAll();
    } else {
      //select all
      selectedAll();
    }
  };

  const deselectAll = () => {
    setLocalDataList(localDataList.map(ldl => _objectSpread(_objectSpread({}, ldl), {}, {
      isSelected: false
    })));
  };

  const selectedAll = () => {
    setLocalDataList(localDataList.map(ldl => _objectSpread(_objectSpread({}, ldl), {}, {
      isSelected: true
    })));
  };

  const updateButtonClickHandler = e => {
    dispatch((0, _actions.updateDataList)(localDataList));
    UpdateAction();
  };

  const cancelButtonClickHandler = e => {
    CancelAction();
    toggleShow();
  };

  const toggleShow = e => {
    supperDDSelectBoxRef.current.classList.toggle('show');
  };

  const isAllSelected = () => {
    return localDataList.every(dl => dl.isSelected);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "supperDD"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "superdd-select-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "superdd-select"
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: e => toggleShow(e),
    ref: supperDDSelectOutputRef,
    className: "superdd-select-output"
  }, /*#__PURE__*/_react.default.createElement("p", null, PlaceHolder)), /*#__PURE__*/_react.default.createElement("div", {
    ref: supperDDSelectBoxRef,
    className: "superdd-select-box"
  }, Filterable && /*#__PURE__*/_react.default.createElement("div", {
    className: "superdd-search-input-container"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "superdd-search-input",
    onChange: onSearchChange,
    type: 'text'
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    onChange: e => handleSelectAll(e),
    className: 'superdd-selectall-input supperDDcheckbox',
    style: {
      marginTop: '0.75em'
    },
    title: 'Select All',
    checked: isAllSelected()
  }), /*#__PURE__*/_react.default.createElement("label", null, "Select All"))), getLiListItems(), /*#__PURE__*/_react.default.createElement("div", {
    className: "superdd-select-buttons"
  }, ShowUpdateButton && /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => updateButtonClickHandler(e),
    type: "button"
  }, "Update"), ShowCancelButton && /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => cancelButtonClickHandler(e),
    type: "button"
  }, "Cancel"))))));
});

var _default = (0, _reactRedux.connect)(state => ({
  score: state.dataList
}))(SuperDD);

exports.default = _default;