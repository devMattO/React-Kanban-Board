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
      return Immutable.fromJS(action.data);

    case 'DELETE_ITEMS':
      const newRow = newState.find((value, key) => {
        return key == action.data.status;
      }).delete(action.data.index);
      console.log(newState.set(`${action.data.status}`, newRow).toJS());
      console.log(action.data.status, 'STATUS');
      return newState.set(`${action.data.status}`, newRow);

    case 'MOVE_RIGHT':
      const moveRight = newState.find((value, key) => {
        return key == action.oldStatus;
      }).update((item) => {
        console.log('item',item);
      });


        // moveRight.findIndex(function(item) {
        //   return item.get(action.oldStatus) === "third";
        // }), function(item) {
        //   return item.set("count", 4);
        // }
      // return newState.set(`${action.data.status}`, moveRight);
      break;
    default:
      return newState;
  }
};

export default kanbanReducer;