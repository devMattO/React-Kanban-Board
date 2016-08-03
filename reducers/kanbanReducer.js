'use strict';

import Immutable from 'immutable';

const initalState = Immutable.List();

const kanbanReducer = (state = initalState, action) => {
  let newState = state;
  switch(action.type){
    case 'SET_ITEMS':
      return Immutable.fromJS(action.data);
    case 'DELETE_ITEMS':
      return newState.delete(action.index);
    default:
      return newState;
  }
};

export default kanbanReducer;