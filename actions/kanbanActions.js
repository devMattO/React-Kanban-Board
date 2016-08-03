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