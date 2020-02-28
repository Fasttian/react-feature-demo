import { EXAMPLES_COUNTER_RESET } from './constants';

export function counterReset() {
  return {
    type: EXAMPLES_COUNTER_RESET,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EXAMPLES_COUNTER_RESET:
      return {
        ...state,
        count: 0,
      };

    default:
      return state;
  }
}
