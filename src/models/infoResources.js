import { queryInfoResources, removeRule, addInfoResources } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'infoResources',

  state: {
    data: {
      resultContent: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryInfoResources, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addInfoResources, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) {
        yield put(
          routerRedux.push({
            pathname: '/infoResources/infoResources-list',
          })
        );
      };
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
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
