'use strict';

export const setItems = (data) => {
  dispatch({
    type: 'SET_ITEMS',
    data
  });
};

export const deleteItems = (index) => {
  dispatch({
    type: 'DELETE_ITEMS',
    index
  });
};

export const moveLeft = (newStatus, data) => {
  dispatch({
    type: 'MOVE_LEFT',
    newStatus,
    data
  });
};

export const moveRight = (newStatus, data) => {
  dispatch({
    type: 'MOVE_RIGHT',
    newStatus,
    data
  });
};
