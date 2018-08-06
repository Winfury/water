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
  Modal,
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
export default class CodeList extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'codeRule/fetchCode',
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
      type: 'codeRule/fetchCode',
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
        type: 'codeRule/fetchCode',
        payload: values,
      });
    });
  };

  detail = detail => {
    Modal.info({
      title: `编码详情 ${detail.code}`,
      content: (
        <div>
          <p style={{ marginTop: 32 }}>编码规则：{detail.ruleName}</p>
          <p>随机位数：{detail.random}</p>
          <p>总数：{detail.total}</p>
          <p>可用数量：{detail.available}</p>
        </div>
      ),
      onOk() { },
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
        title: '编码',
        dataIndex: 'code',
      },
      {
        title: '编码规则',
        dataIndex: 'ruleName',
      },
      {
        title: '随机位数',
        dataIndex: 'random',
      },
      {
        title: '总数',
        dataIndex: 'total',
      },
      {
        title: '可用数量',
        dataIndex: 'available',
      },
      {
        title: '操作',
        render: (record) => (
          <Fragment>
            {/* <a href="">编辑</a>
            <Divider type="vertical" /> */}
            <a onClick={() => this.detail(record)}>详情</a>
          </Fragment>
        ),
      },
    ];


    return (
      <PageHeaderLayout
        title="编码"
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
