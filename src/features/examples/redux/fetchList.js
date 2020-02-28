import axios from 'axios';
import {
  EXAMPLES_FETCH_LIST_BEGIN,
  EXAMPLES_FETCH_LIST_SUCCESS,
  EXAMPLES_FETCH_LIST_FAILURE,
  EXAMPLES_FETCH_LIST_DISMISS_ERROR,
} from './constants';

export function fetchList(args = {}) {
  return (dispatch) => { //分发消息告诉redux请求状态
    dispatch({
      type: EXAMPLES_FETCH_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('http://ncact.jinghangapps.com/mediaService/interview/frontend')
      doRequest.then(
        (res) => {
          dispatch({
            type: EXAMPLES_FETCH_LIST_SUCCESS,
            data: res,
          });
          resolve(res);
        },

        (err) => {
          dispatch({
            type: EXAMPLES_FETCH_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}


export function dismissFetchListError() {
  return {
    type: EXAMPLES_FETCH_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EXAMPLES_FETCH_LIST_BEGIN:
      // 开始发送请求
      return {
        ...state,
        fetchListPending: true,
        fetchListError: null,
      };

    case EXAMPLES_FETCH_LIST_SUCCESS:
      // 请求成功后返回数据
      // jingHangList: action.data.data,
    
      return {
        ...state,
        jingHangList: action.data.data,
        fetchListPending: false,
        fetchListError: null,
      };

    case EXAMPLES_FETCH_LIST_FAILURE:
      // 请求失败
      return {
        ...state,
        fetchListPending: false,
        fetchListError: action.data.error,
      };

    case EXAMPLES_FETCH_LIST_DISMISS_ERROR:
      // 请求错误
      return {
        ...state,
        fetchListError: null,
      };

    default:
      return state;
  }
}
