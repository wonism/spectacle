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

var _utilsBase = require("../utils/base");

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var Text = (function (_Component) {
  _inherits(Text, _Component);

  function Text() {
    _classCallCheck(this, _Text);

    _get(Object.getPrototypeOf(_Text.prototype), "constructor", this).call(this);
    this.resize = this.resize.bind(this);
    this.state = {
      scale: 1,
      height: 16
    };
  }

  _createClass(Text, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resize();
      window.addEventListener("load", this.resize);
      window.addEventListener("resize", this.resize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("load", this.resize);
      window.removeEventListener("resize", this.resize);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize() {
      if (this.props.fit) {
        var text = this.refs.text;
        var container = this.refs.container;
        text.style.display = "inline-block";
        var scale = container.offsetWidth / text.offsetWidth;
        var height = text.offsetHeight * scale;
        text.style.display = "block";
        this.setState({
          scale: scale,
          height: height
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props;
      var lineHeight = _props.lineHeight;
      var fit = _props.fit;
      var style = _props.style;
      var children = _props.children;

      var styles = {
        container: {
          display: "block",
          width: "100%",
          height: this.state.height
        },
        text: {
          fontSize: 16,
          display: "block",
          margin: "0",
          padding: "0",
          lineHeight: lineHeight,
          transform: "scale(" + this.state.scale + ")",
          transformOrigin: "center top"
        },
        nonFit: {
          lineHeight: lineHeight
        }
      };
      return fit ? _react2["default"].createElement(
        "div",
        {
          className: this.props.className,
          ref: "container",
          style: [this.context.styles.components.text, _utilsBase.getStyles.call(this), styles.container]
        },
        _react2["default"].createElement(
          "span",
          {
            ref: "text",
            style: [styles.text, style]
          },
          children
        )
      ) : _react2["default"].createElement(
        "p",
        { className: this.props.className, style: [this.context.styles.components.text, _utilsBase.getStyles.call(this), styles.nonFit, style] },
        this.props.children
      );
    }
  }]);

  var _Text = Text;
  Text = (0, _radium2["default"])(Text) || Text;
  return Text;
})(_react.Component);

exports["default"] = Text;

Text.defaultProps = {
  lineHeight: 1
};

Text.propTypes = {
  className: _react.PropTypes.string,
  fit: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  lineHeight: _react.PropTypes.number,
  style: _react.PropTypes.object
};

Text.contextTypes = {
  styles: _react.PropTypes.object
};
module.exports = exports["default"];