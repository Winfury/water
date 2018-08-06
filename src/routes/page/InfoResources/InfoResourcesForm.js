import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { Link } from 'dva/router';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['infoResources/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'infoResources/add',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout
        title="创建信息资源"
        content="请完善信息资源表单内容，完成后请点击提交"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="资源名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入资源名称',
                  },
                ],
              })(<Input placeholder="请输入资源名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="系统名称">
              {getFieldDecorator('system', {
                rules: [
                  {
                    required: true,
                    message: '请输入系统名称',
                  },
                ],
              })(<Input placeholder="请输入系统名称" />)}
            </FormItem>
            <Form.Item {...formItemLayout} label="数据库">
              <Input.Group compact>
                {getFieldDecorator('databaseType', {
                  initialValue: 'D0001',
                  rules: [{ required: true }],
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="D0001">oracle</Option>
                    <Option value="D0002">mysql</Option>
                    <Option value="D0003">postgresql</Option>
                  </Select>
                )}
                {getFieldDecorator('databaseName', {
                  rules: [
                    { required: true, message: '请输入数据库名称' },
                  ],
                })(<Input style={{ width: 'calc(100% - 120px)' }} placeholder="请输入数据库名称" />)}
              </Input.Group>
            </Form.Item>

            <FormItem {...formItemLayout} label="表名">
              {getFieldDecorator('tableName', {
                rules: [
                  {
                    required: true,
                    message: '请输入表名',
                  },
                ],
              })(<Input placeholder="请输入表名" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="字段">
              {getFieldDecorator('tableField', {
                rules: [
                  {
                    required: true,
                    message: '请输入字段',
                  },
                ],
              })(<Input placeholder="请输入字段" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入描述',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入描述"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Link to="infoResources-list">
                <Button style={{ marginLeft: 8 }}>退出</Button>
              </Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
