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
  message,
  Table,
  List,
  Modal,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../TableList.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


const columnsInfo = [
  {
    title: '信息资源名称',
    dataIndex: 'resName',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
  },
];

@connect(({ codeRule, loading }) => ({
  codeRule,
  loading: loading.models.codeRule,
}))
@Form.create()
export default class ValidationList extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'codeRule/fetchValidation',
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
      type: 'codeRule/fetchValidation',
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
        type: 'codeRule/fetchValidation',
        payload: values,
      });
    });
  };

  valdation = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'codeRule/validation',
      payload: id,
      callback: () => {
        dispatch({
          type: 'codeRule/getValidationInfo',
          payload: id,
          callback: (response) => {
            Modal.success({
              title: '不符合的信息资源',
              content: (
                <List
                  dataSource={response.resultContent}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={`系统名称：${item.resName}`}
                        description={`记录：${item.record}`}
                      />
                    </List.Item>
                  )}
                />
              ),
              onOk() { },
            });
          },
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
              <Link to="validation-form">
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
        title: '信息资源名称',
        dataIndex: 'resName',
      },
      {
        title: '编码规则',
        dataIndex: 'ruleName',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
      },
      {
        title: '操作',
        render: (record) => (
          <Fragment>
            {/* <a href="">编辑</a>
            <Divider type="vertical" /> */}
            <a onClick={() => this.valdation(record.id)}>校验</a>
          </Fragment>
        ),
      },
    ];


    return (
      <PageHeaderLayout
        title="校验"
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
