import { handleActions } from 'redux-actions';

const reducer = handleActions({
  UPDATE_SLIDE_REFERENCE: (_, action) => action.payload
}, []);

export default reducer;
