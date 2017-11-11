import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import configureStore from '../store';

import Controller from '../utils/controller';
import Manager from './manager';
import SlideReference from './manager/slide-reference';

const store = configureStore();

export default class Deck extends Component {
  static displayName = 'Deck';

  static propTypes = {
    autoplay: PropTypes.bool,
    autoplayDuration: PropTypes.number,
    children: PropTypes.node,
    controls: PropTypes.bool,
    globalStyles: PropTypes.bool,
    history: PropTypes.object,
    progress: PropTypes.oneOf(['pacman', 'bar', 'number', 'none']),
    theme: PropTypes.object,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number,
  };

  render() {
    return (
      <Provider store={store}>
        <Controller
          theme={this.props.theme}
          store={store}
          history={this.props.history}
          slides={this.props.children}
        >
          <SlideReference slides={this.props.children}>
            <Manager {...this.props} slides={this.props.children} />
          </SlideReference>
        </Controller>
      </Provider>
    );
  }
}
