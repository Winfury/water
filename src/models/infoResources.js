
import { routerRedux } from 'dva/router';
import { queryInfoResources, removeInfoResources, addInfoResources } from '../services/api';

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
    *add({ payload }, { call, put }) {
      yield call(addInfoResources, payload);
      yield put({
        type: 'save',
        payload,
      });
      yield put(routerRedux.push('/infoResources/infoResources-list'));
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removeInfoResources, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put(routerRedux.push('/infoResources/infoResources-list'));
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
