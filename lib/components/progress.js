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

var animations = {
  pacmanTopFrames: _radium2["default"].keyframes({
    "0%": { transform: "rotateZ(0deg)" },
    "100%": { transform: "rotateZ(-30deg)" }
  }),
  pacmanBottomFrames: _radium2["default"].keyframes({
    "0%": { transform: "rotateZ(0deg)" },
    "100%": { transform: "rotateZ(30deg)" }
  }),
  pacmanTopFramesBis: _radium2["default"].keyframes({
    "0%": { transform: "rotateZ(0deg)" },
    "100%": { transform: "rotateZ(-30deg)" }
  }),
  pacmanBottomFramesBis: _radium2["default"].keyframes({
    "0%": { transform: "rotateZ(0deg)" },
    "100%": { transform: "rotateZ(30deg)" }
  })
};

var Progress = (function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    _classCallCheck(this, _Progress);

    _get(Object.getPrototypeOf(_Progress.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Progress, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _props = this.props;
      var type = _props.type;
      var currentSlide = _props.currentSlide;
      var items = _props.items;

      var style = this.context.styles.progress;
      var markup = undefined;
      switch (type) {
        case "none":
          return false;
        case "pacman":
          style = style.pacman;
          markup = _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement(
              "div",
              { style: [style.pacman, this.getPointPosition(currentSlide)] },
              _react2["default"].createElement("div", { style: [style.pacmanTop, this.getPacmanStyle("Top")] }),
              _react2["default"].createElement("div", { style: [style.pacmanBottom, this.getPacmanStyle("Bottom")] })
            ),
            items.map(function (item, i) {
              return _react2["default"].createElement("div", {
                style: [style.point, _this.getPointStyle(i)],
                key: "presentation-progress-" + i
              });
            })
          );
          break;
        case "number":
          style = style.number;
          markup = _react2["default"].createElement(
            "div",
            null,
            currentSlide + 1,
            " / ",
            items.length
          );
          break;
        case "bar":
          style = style.bar;
          markup = _react2["default"].createElement("div", { style: [style.bar, this.getWidth()] });
          break;
        default:
          return false;
      }
      return _react2["default"].createElement(
        "div",
        { style: [style.container] },
        markup
      );
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return {
        width: 100 * this.props.currentSlide / (this.props.items.length - 1) + "%"
      };
    }
  }, {
    key: "getPacmanStyle",
    value: function getPacmanStyle(side) {
      var animationName = "pacman" + side + "Frames" + (this.props.currentSlide % 2 ? "" : "Bis");
      return {
        animation: animations[animationName] + " 0.12s linear 10 alternate both"
      };
    }
  }, {
    key: "getPointPosition",
    value: function getPointPosition(i) {
      return {
        top: "-20px",
        left: 5 + 20 * (i - this.props.items.length / 2) + "px"
      };
    }
  }, {
    key: "getPointStyle",
    value: function getPointStyle(i) {
      var style = this.getPointPosition(i);
      if (this.props.currentSlide >= i) {
        style.opacity = 0;
      }

      return style;
    }
  }]);

  var _Progress = Progress;
  Progress = (0, _radium2["default"])(Progress) || Progress;
  return Progress;
})(_react.Component);

exports["default"] = Progress;

Progress.propTypes = {
  items: _react.PropTypes.array,
  currentSlide: _react.PropTypes.number,
  type: _react.PropTypes.oneOf(["pacman", "bar", "number", "none"])
};

Progress.contextTypes = {
  styles: _react.PropTypes.object
};
module.exports = exports["default"];