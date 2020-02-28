import { EXAMPLES_COUNTER_PLUS_ONE } from './constants';

export function counterPlusOne() {
  return {
    type: EXAMPLES_COUNTER_PLUS_ONE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EXAMPLES_COUNTER_PLUS_ONE:
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      return state;
  }
}
