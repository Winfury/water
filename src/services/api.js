import { stringify }  from 'qs';
import request from '../utils/request';

// 真实数据
export async function queryInfoResources(keyword) {
  return request(`/resource/all/page/1/size/50?${stringify(keyword)}`);
}
export async function removeInfoResources(id) {
  return request(`/resource/${stringify(id)}`, {
    method: 'DELETE',
  });
}
export async function addInfoResources(params) {
  params.creatorId = "admin";
  params.databaseType = "D0001";
  params.datasourceDriver = "oracle.jdbc.driver.OracleDrive";
  params.datasourcePassword = "demopwd";
  params.datasourceUrl = "jdbc:oracle:thin:@localhost:1522:orcl";
  params.datasourceUsername = "demouser";
  params.updateId = "admin";
  
  return request('/resource', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule() {
  return request(`/api/rule`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
