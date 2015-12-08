"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _historyLibCreateBrowserHistory = require("history/lib/createBrowserHistory");

var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

var _historyLibCreateHashHistory = require("history/lib/createHashHistory");

var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);

var _utilsContext = require("../utils/context");

var _utilsContext2 = _interopRequireDefault(_utilsContext);

var _themesDefault = require("../themes/default");

var _themesDefault2 = _interopRequireDefault(_themesDefault);

var _actions = require("../actions");

var history = process.env.NODE_ENV === "production" ? (0, _historyLibCreateHashHistory2["default"])() : (0, _historyLibCreateBrowserHistory2["default"])();

var Controller = (function (_Component) {
  _inherits(Controller, _Component);

  _createClass(Controller, null, [{
    key: "propTypes",
    value: {
      theme: _react.PropTypes.object,
      children: _react.PropTypes.node,
      store: _react.PropTypes.object
    },
    enumerable: true
  }]);

  function Controller(props) {
    _classCallCheck(this, Controller);

    _get(Object.getPrototypeOf(Controller.prototype), "constructor", this).call(this, props);
    this.state = {
      print: false
    };
  }

  _createClass(Controller, [{
    key: "_updateRoute",
    value: function _updateRoute(location) {
      var _this = this;

      this.setState({
        print: location.search.indexOf("print") !== -1
      }, function () {
        _this.props.store.dispatch((0, _actions.updateRoute)(location));
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.unlisten = history.listen(this._updateRoute.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unlisten();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props !== nextProps || this.state !== nextState;
    }
  }, {
    key: "render",
    value: function render() {
      var styles = this.props.theme ? this.props.theme : (0, _themesDefault2["default"])();
      var Context = (0, _utilsContext2["default"])(_react2["default"].Children.only(this.props.children), {
        history: history,
        styles: this.state.print ? styles.print : styles.screen,
        print: styles.print,
        store: this.props.store
      });
      return _react2["default"].createElement(Context, null);
    }
  }]);

  return Controller;
})(_react.Component);

exports["default"] = Controller;
module.exports = exports["default"];