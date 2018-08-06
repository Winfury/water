
import { routerRedux } from 'dva/router';
import { queryMetadata, removeMetadata, addMetadata } from '../services/api';

export default {
  namespace: 'metadata',

  state: {
    data: {
      resultContent: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMetadata, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      yield call(addMetadata, payload);
      yield put({
        type: 'save',
        payload,
      });
      yield put(routerRedux.push('/metadata/metadata-list'));
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeMetadata, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
