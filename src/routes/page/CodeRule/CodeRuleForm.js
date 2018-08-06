import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
} from 'antd';
import { Link } from 'dva/router';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import TableForm from './TableForm';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const tableData = [

];

@connect(({ loading }) => ({
  submitting: loading.effects['codeRule/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'codeRule/add',
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
        title="创建编码规则"
        content="请完善表单内容，完成后请点击提交"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="规则名称">
              {getFieldDecorator('ruleName', {
                rules: [
                  {
                    required: true,
                    message: '请输入规则名称',
                  },
                ],
              })(<Input placeholder="请输入规则名称" />)}
            </FormItem>
            <Form.Item {...formItemLayout} label="类别">
              {getFieldDecorator('kind', {
                rules: [{ required: true, message: '类别' }],
              })(
                <Select placeholder="请选择类别">
                  <Option value="1">用户</Option>
                  <Option value="2">网点</Option>
                  <Option value="3">水表</Option>
                  <Option value="4">水厂</Option>
                </Select>
              )}
            </Form.Item>


            <Form.Item {...formItemLayout} label="规则详情">

              {getFieldDecorator('ruleCreationItemDetails', {
                initialValue: tableData,
              })(<TableForm />)}
            </Form.Item>

            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Link to="codeRule-list">
                <Button style={{ marginLeft: 8 }}>退出</Button>
              </Link>
            </FormItem>
          </Form>
        </Card>

      </PageHeaderLayout>
    );
  }
}
