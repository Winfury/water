import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Badge,
  Divider,
  Table,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../TableList.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['processing', 'success', 'error'];
const status = ['MySQL', 'Oracle', 'SQL Server'];

@connect(({ codeRule, loading }) => ({
  codeRule,
  loading: loading.models.codeRule,
}))
@Form.create()
export default class RuleCodeList extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'codeRule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'codeRule/fetch',
      payload: params,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'codeRule/fetch',
        payload: values,
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'codeRule/remove',
      payload: id,
      callback: () => {
        dispatch({
          type: 'codeRule/fetch',
          payload: {},
        });
      },
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键字">
              {getFieldDecorator('keyword')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Link to="codeRule-form">
                <Button style={{ marginLeft: 8 }} icon="plus">
                  新建
                </Button>
              </Link>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      codeRule: { data },
      loading,
    } = this.props;

    const columns = [
      {
        title: '规则名称',
        dataIndex: 'ruleName',
      },
      {
        title: '规则详情',
        dataIndex: 'ruleDetail',
      },
      {
        title: '操作',
        render: (record) => (
          <Fragment>
            {/* <a href="">编辑</a>
            <Divider type="vertical" /> */}
            <a onClick={() => this.deleteItem(record.id)}>删除</a>
            <Divider type="vertical" />
            <Link to="code-list">
              <a style={{ marginLeft: 8 }}>自动生成</a>
            </Link>
          </Fragment>
        ),
      },
    ];


    return (
      <PageHeaderLayout
        title="编码规则"
      >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table columns={columns} loading={loading} dataSource={data.resultContent} />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
