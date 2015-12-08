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

var Overview = (function (_Component) {
  _inherits(Overview, _Component);

  function Overview() {
    _classCallCheck(this, _Overview);

    _get(Object.getPrototypeOf(_Overview.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Overview, [{
    key: "_slideClicked",
    value: function _slideClicked(index) {
      this.context.history.replaceState(null, "/" + this._getHash(index));
    }
  }, {
    key: "_getHash",
    value: function _getHash(slide) {
      var hash = slide;
      if ("id" in this.props.slides[slide].props) {
        hash = this.props.slides[slide].props.id;
      }
      return hash;
    }
  }, {
    key: "_renderSlides",
    value: function _renderSlides() {
      var _this = this;

      var slide = this.props.slide;
      return this.props.slides.map(function (child, index) {
        var style = {
          position: "relative",
          width: window.innerWidth / 3,
          height: window.innerHeight / 3,
          float: "left",
          transform: "scale(0.8)",
          border: "2px solid white",
          opacity: index === slide ? 1 : 0.5,
          cursor: "pointer",
          ":hover": {
            opacity: 1
          }
        };
        var el = (0, _react.cloneElement)(child, {
          key: index,
          slideIndex: index,
          route: _this.props.route,
          transition: [],
          transitionDuration: 0,
          appearOff: true
        });
        return _react2["default"].createElement(
          "div",
          { key: index, style: [style], onClick: _this._slideClicked.bind(_this, index) },
          el
        );
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.onresize = function () {
        _this2.forceUpdate();
      };
    }
  }, {
    key: "render",
    value: function render() {
      var styles = {
        overview: {
          height: "100%",
          width: "100%",
          overflow: "scroll"
        }
      };
      return _react2["default"].createElement(
        "div",
        { className: "spectacle-overview", style: [styles.overview] },
        this._renderSlides()
      );
    }
  }]);

  var _Overview = Overview;
  Overview = (0, _radium2["default"])(Overview) || Overview;
  return Overview;
})(_react.Component);

exports["default"] = Overview;

Overview.propTypes = {
  route: _react.PropTypes.object,
  slides: _react.PropTypes.array,
  slide: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};

Overview.contextTypes = {
  styles: _react.PropTypes.object,
  history: _react.PropTypes.object
};
module.exports = exports["default"];