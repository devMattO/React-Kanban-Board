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
      const deleted = newState.updateIn([action.data.status], (column) => {
        return column.deleteIn([action.data.index]);
      });
      return deleted;

    case 'MOVE_LEFT':
      let leftCard;
      const leftUpdate = newState.updateIn([action.data.status], (oldCol) => {
        oldCol.update(action.data.index, (oldCard) => {
          leftCard = oldCard.updateIn(['status'], () => {
            return action.newStatus;
          });
        });
        return oldCol.deleteIn([action.data.index]);
      }).updateIn([action.newStatus], (newCol) => {
        leftCard = leftCard.updateIn(['index'], () => {
          return newCol.toJS().length;
        });
        console.log('leftCard ' , leftCard.toJS());
        return newCol.push(leftCard);
      });

      return leftUpdate;

    case 'MOVE_RIGHT':
      // updateIn(keyPath: Array<any>, updater: (value: any) => any): Map<K, V>
      let rightCard;
      const rightUpdate = newState.updateIn([action.data.status], (oldCol) => {
        oldCol.update(action.data.index, (oldCard) => {
          rightCard = oldCard.updateIn(['status'], () => {
            return action.newStatus;
          });
        });
        return oldCol.deleteIn([action.data.index]);
      }).updateIn([action.newStatus], (newCol) => {
        rightCard = rightCard.updateIn(['index'], () => {
          return newCol.toJS().length;
        });
        console.log('rightCard ' , rightCard.toJS());
        return newCol.push(rightCard);
      });

      return rightUpdate;


    default:
      return newState;
  }
};

export default kanbanReducer;