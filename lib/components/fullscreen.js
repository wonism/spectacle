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

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var Fullscreen = (function (_Component) {
  _inherits(Fullscreen, _Component);

  function Fullscreen() {
    _classCallCheck(this, _Fullscreen);

    _get(Object.getPrototypeOf(_Fullscreen.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Fullscreen, [{
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var styles = {
        position: "absolute",
        bottom: 20,
        right: 20,
        opacity: 0,
        cursor: "pointer",
        transition: "300ms opacity ease",
        ":hover": {
          opacity: 1
        }
      };
      return _react2["default"].createElement(
        "svg",
        {
          onClick: this.toggleFullScreen.bind(this),
          style: [styles, this.context.styles.fullscreen],
          width: "30px",
          height: "30px",
          viewBox: "0 0 512 512"
        },
        _react2["default"].createElement("path", { d: "M73.143,329.143H0V512h182.857v-73.143H73.143V329.143z M0,182.857h73.143V73.143h109.715V0H0V182.857z M438.857,438.857 H329.143V512H512V329.143h-73.143V438.857z M329.143,0v73.143h109.715v109.715H512V0H329.143z"
        })
      );
    }
  }]);

  var _Fullscreen = Fullscreen;
  Fullscreen = (0, _radium2["default"])(Fullscreen) || Fullscreen;
  return Fullscreen;
})(_react.Component);

exports["default"] = Fullscreen;

Fullscreen.contextTypes = {
  styles: _react.PropTypes.object
};
module.exports = exports["default"];