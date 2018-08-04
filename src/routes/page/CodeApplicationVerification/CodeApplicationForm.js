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
        title="创建代码申请"
        content="请完善信息表单内容，完成后请点击提交"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="编码规则">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入编码规则',
                  },
                ],
              })(<Input placeholder="请输入编码规则" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="可用数量">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入元数据代码',
                  },
                ],
              })(<Input placeholder="200" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="申请数量">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入元数据代码',
                  },
                ],
              })(<Input placeholder="100" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="申请理由">
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: '申请理由',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="申请理由"
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
