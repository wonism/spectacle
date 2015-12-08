"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxActions = require("redux-actions");

var addFragment = (0, _reduxActions.createAction)("ADD_FRAGMENT");
exports.addFragment = addFragment;
var updateFragment = (0, _reduxActions.createAction)("UPDATE_FRAGMENT");

exports.updateFragment = updateFragment;
var updateRoute = (0, _reduxActions.createAction)("UPDATE_ROUTE");
exports.updateRoute = updateRoute;