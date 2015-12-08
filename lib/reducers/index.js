"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _redux = require("redux");

var _fragment = require("./fragment");

var _fragment2 = _interopRequireDefault(_fragment);

var _route = require("./route");

var _route2 = _interopRequireDefault(_route);

var rootReducer = (0, _redux.combineReducers)({
  fragment: _fragment2["default"],
  route: _route2["default"]
});

exports["default"] = rootReducer;
module.exports = exports["default"];