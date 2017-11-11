import { cloneElement, Children } from 'react';
import isUndefined from 'lodash/isUndefined';
import findIndex from 'lodash/findIndex';
import reduce from 'lodash/reduce';

export const getSlideByIndex = (children, slideReference, index) => {
  children = Children.toArray(children);
  let slide;
  const reference = slideReference[index];
  if (reference) {
    if (!isUndefined(reference.magicIndex)) {
      slide = cloneElement(children[reference.rootIndex], {
        magicIndex: reference.magicIndex,
      });
    } else if (isUndefined(reference.setIndex)) {
      slide = children[reference.rootIndex];
    } else {
      const setChildren = Children.toArray(
        children[reference.rootIndex].props.children
      );
      slide = setChildren[reference.setIndex];
    }
  }
  return slide;
};

export const getRootIndex = (slideReference, index) => {
  const reference = slideReference[index];
  return reference.rootIndex;
};

export const isMagicSlide = (slideReference, index) => {
  const reference = slideReference[index];
  return !isUndefined(reference.magicIndex);
};

export const countSlides = children => {
  return reduce(
    Children.toArray(children),
    (count, child) => {
      count += child.props.hasSlideChildren
        ? Children.toArray(child.props.children).length
        : 1;
      return count;
    },
    0
  );
};

export const getSlideIndex = (state, slide) => {
  if (slide === null) {
    return null;
  }

  let index = parseInt(slide, 10);
  if (!Number.isFinite(index)) {
    const foundIndex = findIndex(state.slideReference, reference => {
      return slide === reference.id;
    });
    index = foundIndex >= 0 ? foundIndex : 0;
  }
  return index;
};
