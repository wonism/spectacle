/*eslint new-cap:0, max-statements:0*/
/* eslint react/no-did-mount-set-state: 0 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require("react-addons-transition-group");

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRedux = require("react-redux");

var _actions = require("../actions");

var _presenter = require("./presenter");

var _presenter2 = _interopRequireDefault(_presenter);

var _export = require("./export");

var _export2 = _interopRequireDefault(_export);

var _overview = require("./overview");

var _overview2 = _interopRequireDefault(_overview);

var _fullscreen = require("./fullscreen");

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _progress = require("./progress");

var _progress2 = _interopRequireDefault(_progress);

var TransitionGroup = (0, _radium2["default"])(_reactAddonsTransitionGroup2["default"]);

var Deck = (function (_Component) {
  _inherits(Deck, _Component);

  _createClass(Deck, null, [{
    key: "displayName",
    value: "Deck",
    enumerable: true
  }, {
    key: "defaultProps",
    value: {
      transitionDuration: 500,
      progress: "pacman"
    },
    enumerable: true
  }, {
    key: "propTypes",
    value: {
      fragment: _react.PropTypes.object,
      dispatch: _react.PropTypes.func,
      children: _react.PropTypes.node,
      route: _react.PropTypes.object,
      transition: _react.PropTypes.array,
      transitionDuration: _react.PropTypes.number,
      progress: _react.PropTypes.oneOf(["pacman", "bar", "number", "none"])
    },
    enumerable: true
  }, {
    key: "contextTypes",
    value: {
      styles: _react.PropTypes.object,
      print: _react.PropTypes.object,
      history: _react.PropTypes.object,
      presenter: _react.PropTypes.bool,
      "export": _react.PropTypes.bool,
      overview: _react.PropTypes.bool,
      store: _react.PropTypes.object,
      slide: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
    },
    enumerable: true
  }]);

  function Deck() {
    _classCallCheck(this, _Deck);

    _get(Object.getPrototypeOf(_Deck.prototype), "constructor", this).call(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this.state = {
      lastSlide: null
    };
  }

  _createClass(Deck, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var slide = this._getSlideIndex();
      this.setState({
        lastSlide: slide
      });
      this._attachEvents();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._detachEvents();
    }
  }, {
    key: "_attachEvents",
    value: function _attachEvents() {
      window.addEventListener("storage", this._goToSlide);
      window.addEventListener("keydown", this._handleKeyPress);
    }
  }, {
    key: "_detachEvents",
    value: function _detachEvents() {
      window.removeEventListener("storage", this._goToSlide);
      window.removeEventListener("keydown", this._handleKeyPress);
    }
  }, {
    key: "_handleEvent",
    value: function _handleEvent(e) {
      var event = window.event ? window.event : e;

      if (event.keyCode === 37 || event.keyCode === 33 || event.keyCode === 32 && event.shiftKey) {
        this._prevSlide();
      } else if (event.keyCode === 39 || event.keyCode === 34 || event.keyCode === 32 && !event.shiftKey) {
        this._nextSlide();
      } else if (event.altKey && event.keyCode === 79 && !event.ctrlKey && !event.metaKey) {
        // o
        this._toggleOverviewMode();
      } else if (event.altKey && event.keyCode === 80 && !event.ctrlKey && !event.metaKey) {
        // p
        this._togglePresenterMode();
      }
    }
  }, {
    key: "_handleKeyPress",
    value: function _handleKeyPress(e) {
      var event = window.event ? window.event : e;

      if (event.target instanceof HTMLInputElement || event.target.type === "textarea") {
        return;
      }

      this._handleEvent(e);
    }
  }, {
    key: "_toggleOverviewMode",
    value: function _toggleOverviewMode() {
      var suffix = this.props.route.params.indexOf("overview") !== -1 ? "" : "?overview";
      this.context.history.replaceState(null, "/" + this.props.route.slide + suffix);
    }
  }, {
    key: "_togglePresenterMode",
    value: function _togglePresenterMode() {
      var suffix = this.props.route.params.indexOf("presenter") !== -1 ? "" : "?presenter";
      this.context.history.replaceState(null, "/" + this.props.route.slide + suffix);
    }
  }, {
    key: "_getSuffix",
    value: function _getSuffix() {
      if (this.props.route.params.indexOf("presenter") !== -1) {
        return "?presenter";
      } else if (this.props.route.params.indexOf("overview") !== -1) {
        return "?overview";
      } else {
        return "";
      }
    }
  }, {
    key: "_goToSlide",
    value: function _goToSlide(e) {
      if (e.key === "spectacle-slide") {
        var data = JSON.parse(e.newValue);
        var slide = this._getSlideIndex();
        this.setState({
          lastSlide: slide || 0
        });
        if (this._checkFragments(this.props.route.slide, data.forward)) {
          this.context.history.replaceState(null, "/" + data.slide + this._getSuffix());
        }
      }
    }
  }, {
    key: "_prevSlide",
    value: function _prevSlide() {
      var slide = this._getSlideIndex();
      this.setState({
        lastSlide: slide
      });
      if (this._checkFragments(this.props.route.slide, false) || this.props.route.params.indexOf("overview") !== -1) {
        if (slide > 0) {
          this.context.history.replaceState(null, "/" + this._getHash(slide - 1) + this._getSuffix());
          localStorage.setItem("spectacle-slide", JSON.stringify({ slide: this._getHash(slide - 1), forward: false, time: Date.now() }));
        }
      } else if (slide > 0) {
        localStorage.setItem("spectacle-slide", JSON.stringify({ slide: this._getHash(slide), forward: false, time: Date.now() }));
      }
    }
  }, {
    key: "_nextSlide",
    value: function _nextSlide() {
      var slide = this._getSlideIndex();
      this.setState({
        lastSlide: slide
      });
      if (this._checkFragments(this.props.route.slide, true) || this.props.route.params.indexOf("overview") !== -1) {
        if (slide < this.props.children.length - 1) {
          this.context.history.replaceState(null, "/" + (this._getHash(slide + 1) + this._getSuffix()));
          localStorage.setItem("spectacle-slide", JSON.stringify({ slide: this._getHash(slide + 1), forward: true, time: Date.now() }));
        }
      } else if (slide < this.props.children.length - 1) {
        localStorage.setItem("spectacle-slide", JSON.stringify({ slide: this._getHash(slide), forward: true, time: Date.now() }));
      }
    }
  }, {
    key: "_getHash",
    value: function _getHash(slide) {
      var hash = slide;
      if ("id" in this.props.children[slide].props) {
        hash = this.props.children[slide].props.id;
      }
      return hash;
    }
  }, {
    key: "_checkFragments",
    value: function _checkFragments(slide, forward) {
      var state = this.context.store.getState();
      var fragments = state.fragment.fragments;
      // Not proud of this at all. 0.14 Parent based contexts will fix this.
      if (this.props.route.params.indexOf("presenter") !== -1) {
        var main = document.querySelector(".spectacle-presenter-main");
        if (main) {
          var frags = main.querySelectorAll(".fragment");
          if (!frags.length) {
            return true;
          }
        } else {
          return true;
        }
      }
      if (slide in fragments) {
        var count = _lodash2["default"].size(fragments[slide]);
        var visible = _lodash2["default"].filter(fragments[slide], function (s) {
          return s.visible === true;
        });
        var hidden = _lodash2["default"].filter(fragments[slide], function (s) {
          return s.visible !== true;
        });
        if (forward === true && visible.length !== count) {
          this.props.dispatch((0, _actions.updateFragment)({
            fragment: hidden[0],
            visible: true
          }));
          return false;
        }
        if (forward === false && hidden.length !== count) {
          this.props.dispatch((0, _actions.updateFragment)({
            fragment: visible[_lodash2["default"].size(visible) - 1],
            visible: false
          }));
          return false;
        }
        return true;
      } else {
        return true;
      }
    }
  }, {
    key: "_getTouchEvents",
    value: function _getTouchEvents() {
      var self = this;

      return {
        onTouchStart: function onTouchStart(e) {
          self.touchObject = {
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
          };
        },
        onTouchMove: function onTouchMove(e) {
          var direction = self._swipeDirection({
            x1: self.touchObject.startX,
            x2: e.touches[0].pageX,
            y1: self.touchObject.startY,
            y2: e.touches[0].pageY
          });

          self.touchObject = {
            startX: self.touchObject.startX,
            startY: self.touchObject.startY,
            endX: e.clientX,
            endY: e.clientY,
            length: Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2))),
            direction: direction
          };

          if (direction !== 0) {
            e.preventDefault();
          }
        },
        onTouchEnd: function onTouchEnd(e) {
          self._handleSwipe(e);
        },
        onTouchCancel: function onTouchCancel(e) {
          self._handleSwipe(e);
        }
      };
    }
  }, {
    key: "_handleClick",
    value: function _handleClick(e) {
      if (this.clickSafe === true) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
      }
    }
  }, {
    key: "_handleSwipe",
    value: function _handleSwipe() {
      if (typeof this.touchObject.length !== "undefined" && this.touchObject.length > 44) {
        this.clickSafe = true;
      } else {
        this.clickSafe = false;
      }

      if (Math.abs(this.touchObject.length) > 20) {
        if (this.touchObject.direction === 1) {
          this._nextSlide();
        } else if (this.touchObject.direction === -1) {
          this._prevSlide();
        }
      }

      this.touchObject = {};
    }
  }, {
    key: "_swipeDirection",
    value: function _swipeDirection(touch) {
      var xDist = touch.x1 - touch.x2;
      var yDist = touch.y1 - touch.y2;
      var r = Math.atan2(yDist, xDist);
      var swipeAngle = Math.round(r * 180 / Math.PI);

      if (swipeAngle < 0) {
        swipeAngle = 360 - Math.abs(swipeAngle);
      }
      if (swipeAngle <= 45 && swipeAngle >= 0) {
        return 1;
      }
      if (swipeAngle <= 360 && swipeAngle >= 315) {
        return 1;
      }
      if (swipeAngle >= 135 && swipeAngle <= 225) {
        return -1;
      }

      return 0;
    }
  }, {
    key: "_getSlideIndex",
    value: function _getSlideIndex() {
      var _this = this;

      var index = 0;
      if (!parseInt(this.props.route.slide)) {
        _react.Children.toArray(this.props.children).forEach(function (slide, i) {
          if (slide.props.id === _this.props.route.slide) {
            index = i;
          }
        });
      } else {
        index = parseInt(this.props.route.slide);
      }
      return index;
    }
  }, {
    key: "_renderSlide",
    value: function _renderSlide() {
      var slide = this._getSlideIndex();
      var child = _react.Children.toArray(this.props.children)[slide];
      return (0, _react.cloneElement)(child, {
        dispatch: this.props.dispatch,
        fragments: this.props.fragment,
        key: slide,
        route: this.props.route,
        children: _react.Children.toArray(child.props.children),
        hash: this.props.route.slide,
        slideIndex: slide,
        lastSlide: this.state.lastSlide,
        transition: child.props.transition.length ? child.props.transition : this.props.transition,
        transitionDuration: child.props.transition.transitionDuration ? child.props.transitionDuration : this.props.transitionDuration
      });
    }
  }, {
    key: "render",
    value: function render() {
      var globals = this.props.route.params.indexOf("export") !== -1 ? {
        body: Object.assign(this.context.styles.global.body, {
          minWidth: 1100,
          minHeight: 850,
          overflow: "auto"
        }),
        ".spectacle-presenter-next .fragment": {
          display: "none !important"
        }
      } : {
        ".spectacle-presenter-next .fragment": {
          display: "none !important"
        }
      };

      var styles = {
        deck: {
          backgroundColor: this.props.route.params.indexOf("presenter") !== -1 || this.props.route.params.indexOf("overview") !== -1 ? "black" : "",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        },
        transition: {
          height: "100%",
          width: "100%",
          perspective: 1000,
          transformStyle: "flat"
        }
      };

      var componentToRender = undefined;
      var children = _react.Children.toArray(this.props.children);
      if (this.props.route.params.indexOf("presenter") !== -1) {
        componentToRender = _react2["default"].createElement(_presenter2["default"], {
          dispatch: this.props.dispatch,
          slides: children,
          slide: this._getSlideIndex(),
          hash: this.props.route.slide,
          route: this.props.route,
          lastSlide: this.state.lastSlide
        });
      } else if (this.props.route.params.indexOf("export") !== -1) {
        componentToRender = _react2["default"].createElement(_export2["default"], { slides: children, route: this.props.route });
      } else if (this.props.route.params.indexOf("overview") !== -1) {
        componentToRender = _react2["default"].createElement(_overview2["default"], { slides: children, slide: this._getSlideIndex(), route: this.props.route });
      } else {
        componentToRender = _react2["default"].createElement(
          TransitionGroup,
          { component: "div", style: [styles.transition] },
          this._renderSlide()
        );
      }
      return _react2["default"].createElement(
        "div",
        _extends({
          className: "spectacle-deck",
          style: [styles.deck],
          onClick: this._handleClick
        }, this._getTouchEvents()),
        componentToRender,
        this.props.route.params.indexOf("export") === -1 && this.props.route.params.indexOf("overview") === -1 ? _react2["default"].createElement(_progress2["default"], {
          items: children,
          currentSlide: this._getSlideIndex(),
          type: this.props.progress
        }) : "",
        this.props.route.params.indexOf("export") === -1 ? _react2["default"].createElement(_fullscreen2["default"], null) : "",
        _react2["default"].createElement(_radium.Style, { rules: Object.assign(this.context.styles.global, globals) })
      );
    }
  }]);

  var _Deck = Deck;
  Deck = (0, _radium2["default"])(Deck) || Deck;
  Deck = (0, _reactRedux.connect)(function (state) {
    return state;
  })(Deck) || Deck;
  return Deck;
})(_react.Component);

exports["default"] = Deck;
module.exports = exports["default"];