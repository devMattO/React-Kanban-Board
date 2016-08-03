'use strict';

import Immutable from 'immutable';
// const initialState = Immutable.List();
const initialState = Immutable.Map({
  todo: Immutable.List(),
  doing: Immutable.List(),
  done: Immutable.List()
});

const kanbanReducer = (state = initialState, action) => {
  let newState = state;
  switch(action.type){
    case 'SET_ITEMS':
    console.log(action, '<=====ACTION');
      return Immutable.fromJS(action.data);
    case 'DELETE_ITEMS':
      return newState.delete(action.index);
    default:
      return newState;
  }
};

export default kanbanReducer;