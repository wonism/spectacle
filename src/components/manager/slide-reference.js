import { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateSlideReference } from '../../actions';
import Magic from '../magic';

const build = childrenArr => {
  const slideReference = [];
  childrenArr.forEach((child, rootIndex) => {
    if (child.type === Magic) {
      Children.toArray(
        child.props.children
      ).forEach((setSlide, magicIndex) => {
        const reference = {
          id: setSlide.props.id || slideReference.length,
          magicIndex,
          rootIndex,
        };
        slideReference.push(reference);
      });
    } else if (!child.props.hasSlideChildren) {
      const reference = {
        id: child.props.id || slideReference.length,
        rootIndex,
      };
      if (child.props.goTo) {
        reference.goTo = child.props.goTo;
      }
      slideReference.push(reference);
    } else {
      child.props.children.forEach((setSlide, setIndex) => {
        const reference = {
          id: setSlide.props.id || slideReference.length,
          setIndex,
          rootIndex,
        };
        if (child.props.goTo) {
          reference.goTo = child.props.goTo;
        }
        slideReference.push(reference);
      });
    }
  });

  return slideReference;
};

class SlideReference extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func,
    slides: PropTypes.node
  };

  componentWillMount() {
    const { slides, dispatch } = this.props;
    const childrenArr = Children.toArray(slides);
    dispatch(updateSlideReference(build(childrenArr)));
  }

  componentWillReceiveProps({ slides, dispatch }) {
    const childrenArr = Children.toArray(slides);
    dispatch(updateSlideReference(build(childrenArr)));
  }

  render() {
    return this.props.children;
  }
}

export default connect()(SlideReference);
