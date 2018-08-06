
import { routerRedux } from 'dva/router';
import { queryCodeRule, queryCode, queryValidation, removeCodeRule, addCodeRule, addValidation, validation, getValidationInfo, } from '../services/api';

export default {
  namespace: 'codeRule',

  state: {
    data: {
      resultContent: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCodeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCode({ payload }, { call, put }) {
      const response = yield call(queryCode, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getValidationInfo({ payload, callback }, { call, put }) {
      const response = yield call(getValidationInfo, payload);
      if (callback) callback(response);
    },
    *fetchValidation({ payload }, { call, put }) {
      const response = yield call(queryValidation, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      yield call(addCodeRule, payload);
      yield put({
        type: 'save',
        payload,
      });
      yield put(routerRedux.push('/codeRule/codeRule-list'));
    },
    *addValidation({ payload }, { call, put }) {
      yield call(addValidation, payload);
      // yield put({
      //   type: 'save',
      //   payload,
      // });
      yield put(routerRedux.push('/codeRule/validation-list'));
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeCodeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *validation({ payload, callback }, { call, put }) {
      const response = yield call(validation, payload);
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
