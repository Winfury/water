import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '信息资源目录',
    icon: 'database',
    path: 'infoResources',
    children: [
      {
        name: '信息资源列表',
        path: 'infoResources-list',
      },
      {
        name: '新建信息资源',
        path: 'infoResources-form',
      },
    ],
  },
  {
    name: '数据编码',
    icon: 'code',
    path: 'codeRule',
    children: [
      {
        name: '编码规则列表',
        path: 'codeRule-list',
      },
      {
        name: '新建编码规则',
        path: 'codeRule-form',
      },
      {
        name: '编码列表',
        path: 'code-list',
      },
      {
        name: '校验列表',
        path: 'validation-list',
      },
      {
        name: '新建校验',
        path: 'validation-form',
      },
    ],
  },
  {
    name: '元数据管理',
    icon: 'appstore',
    path: 'metadata',
    children: [
      {
        name: '元数据列表',
        path: 'metadata-list',
      },
      {
        name: '新建元数据',
        path: 'metadata-form',
      },
    ],
  },
  {
    name: '代码申请和校验管理',
    icon: 'code-o',
    path: 'codeApplicationVerification',
    children: [
      {
        name: '代码申请列表',
        path: 'codeApplication-list',
      },
      {
        name: '新建代码申请',
        path: 'codeApplication-form',
      },
      {
        name: '代码校验',
        path: 'verification-form',
      },
    ],
  },
  {
    name: '代码审批管理',
    icon: 'check-circle-o',
    path: 'codeApprove',
    children: [
      {
        name: '代码审批列表',
        path: 'codeApprove-list',
      },
    ],
  },
  {
    name: '代码变更管理',
    icon: 'retweet',
    path: '',
    children: [
      {
        name: '代码变更管理列表',
        path: '',
      },
    ],
  },
  {
    name: '代码接收与分发管理',
    icon: 'table',
    path: '',
    children: [
      {
        name: '接收规则',
        path: '',
      },
      {
        name: '代码接收',
        path: '',
      },
      {
        name: '分发规则',
        path: '',
      },
      {
        name: '代码分发',
        path: '',
      },
    ],
  },
  {
    name: '代码查询和统计分析',
    icon: 'area-chart',
    path: '',
    children: [
      {
        name: '代码查询',
        path: '',
      },
      {
        name: '统计分析',
        path: '',
      },
    ],
  },
  {
    name: '系统维护',
    icon: 'setting',
    path: '',
    children: [
      {
        name: '日志管理',
        path: '',
      },
      {
        name: '授权管理',
        path: '',
      },
      {
        name: '参数配置',
        path: '',
      },
      {
        name: '数据备份',
        path: '',
      },
    ],
  },

  // 组建案例
  {
    name: 'dashboard',
    
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  // {
  //   name: '表单页',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: '基础表单',
  //       path: 'basic-form',
  //     },
  //     {
  //       name: '分步表单',
  //       path: 'step-form',
  //     },
  //     {
  //       name: '高级表单',
  //       authority: 'admin',
  //       path: 'advanced-form',
  //     },
  //   ],
  // },
  // {
  //   name: '列表页',
  //   icon: 'table',
  //   path: 'list',
  //   children: [
  //     {
  //       name: '查询表格',
  //       path: 'table-list',
  //     },
  //     {
  //       name: '标准列表',
  //       path: 'basic-list',
  //     },
  //     {
  //       name: '卡片列表',
  //       path: 'card-list',
  //     },
  //     {
  //       name: '搜索列表',
  //       path: 'search',
  //       children: [
  //         {
  //           name: '搜索列表（文章）',
  //           path: 'articles',
  //         },
  //         {
  //           name: '搜索列表（项目）',
  //           path: 'projects',
  //         },
  //         {
  //           name: '搜索列表（应用）',
  //           path: 'applications',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: '详情页',
  //   icon: 'profile',
  //   path: 'profile',
  //   children: [
  //     {
  //       name: '基础详情页',
  //       path: 'basic',
  //     },
  //     {
  //       name: '高级详情页',
  //       path: 'advanced',
  //       authority: 'admin',
  //     },
  //   ],
  // },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //     {
  //       name: '触发异常',
  //       path: 'trigger',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   name: '账户',
  //   icon: 'user',
  //   path: 'user',
  //   authority: 'guest',
  //   children: [
  //     {
  //       name: '登录',
  //       path: 'login',
  //     },
  //     {
  //       name: '注册',
  //       path: 'register',
  //     },
  //     {
  //       name: '注册结果',
  //       path: 'register-result',
  //     },
  //   ],
  // },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
