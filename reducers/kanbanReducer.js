'use strict';

import Immutable from 'immutable';

const initialState = Immutable.List();

const kanbanReducer = (state = initialState, action) => {

  let newState = state;

  switch(action.type) {

    case 'SET_ITEMS':
      return Immutable.fromJS(action.data)

    case 'REMOVE_ITEMS':
      return newState.delete(action.index);

    default:
      return newState;
  }
}

export default kanbanReducer;