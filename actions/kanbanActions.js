'use strict';

export const setItems = (data) => {
  dispatch({
    type: 'SET_ITEMS',
    data
  })
}

export const deleteItem = (index) => {
  dispatch({
    type: 'REMOVE_ITEMS',
    index
  })
}