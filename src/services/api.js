import { stringify }  from 'qs';
import request from '../utils/request';

// 资源信息
export async function queryInfoResources(keyword) {
  return request(`/resource/all/page/1/size/50?${stringify(keyword)}`);
}
export async function removeInfoResources(id) {
  return request(`/resource/${id}`, {
    method: 'DELETE',
  });
}
export async function addInfoResources(params) {
  params.creatorId = "admin";
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

// 编码规则
export async function queryCodeRule(keyword) {
  return request(`/rules/page/1/size/50?${stringify(keyword)}`,{
    method: 'POST',
  });
}
export async function queryCode(keyword) {
  return request(`/codes/page/1/size/50?${stringify(keyword)}`,{
    method: 'POST',
  });
}
export async function queryValidation(keyword) {
  return request(`/validations/page/1/size/50?${stringify(keyword)}`,{
    method: 'POST',
  });
}
export async function removeCodeRule(id) {
  return request(`/authsec/alter/rule/${id}`, {
    method: 'DELETE',
  });
}
export async function validation(id) {
  return request(`/rule/validation/${id}`);
}
export async function getValidationInfo(id) {
  return request(`/rule/validation/results/${id}`);
}
export async function addCodeRule(params) {
  params.creatorId = "admin";
  params.updateId = "admin";
  
  return request('/authsec/alter/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function addValidation(params) {
  return request('/authsec/alter/validation', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 元数据
export async function queryMetadata(keyword) {
  return request(`/metadata/all/page/1/size/50?${stringify(keyword)}`);
}
export async function removeMetadata(id) {
  return request(`/metadata/${id}`, {
    method: 'DELETE',
  });
}
export async function addMetadata(params) {
  params.creatorId = "admin";
  params.updateId = "admin";
  
  return request('/metadata', {
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
