"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDataList = updateDataList;
exports.deselectAll = deselectAll;
exports.selectAll = selectAll;

var _actionTypes = require("./actionTypes");

function updateDataList(dataList) {
  return {
    type: _actionTypes.UPDATE_DATA_LIST,
    payload: {
      dataList: dataList
    }
  };
}

function deselectAll() {
  return {
    type: _actionTypes.DESELECT_ALL
  };
}

function selectAll() {
  return {
    type: _actionTypes.SELECT_ALL
  };
}