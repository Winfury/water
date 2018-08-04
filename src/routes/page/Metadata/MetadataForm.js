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

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
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
        title="创建元数据"
        content="请完善信息表单内容，完成后请点击提交"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="元数据名称">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入元数据名称',
                  },
                ],
              })(<Input placeholder="请输入元数据名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="元数据代码">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入元数据代码',
                  },
                ],
              })(<Input placeholder="请输入元数据代码" />)}
            </FormItem>

            <Form.Item {...formItemLayout} label="属性">
              {getFieldDecorator('owner', {
                rules: [{ required: true, message: '类别' }],
              })(
                <Select placeholder="请选择类别">
                  <Option value="1">区</Option>
                  <Option value="2">街道</Option>
                  <Option value="3">年份</Option>
                  <Option value="4">供应商</Option>
                </Select>
              )}
            </Form.Item>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('goal', {
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
              <Button style={{ marginLeft: 8 }}>退出</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
