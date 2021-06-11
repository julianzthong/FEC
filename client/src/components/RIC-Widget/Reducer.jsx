import React from 'react';

export const initialState = {count: 0};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'next':
      return {count: state.count + 1};
    case 'previous':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
};
