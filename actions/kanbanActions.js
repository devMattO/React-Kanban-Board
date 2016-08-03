'use strict';

export const showItem = (index) => {
  dispatch({
    type: 'SHOW_ITEM',
    index
  })
}

export const hideItem = (index) => {
  dispatch({
    type: 'HIDE_ITEM',
    index
  })
}