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
        title="创建编码规则"
        content="请完善表单内容，完成后请点击提交"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="规则名称">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入规则名称',
                  },
                ],
              })(<Input placeholder="请输入规则名称" />)}
            </FormItem>
            <Form.Item {...formItemLayout} label="类别">
              {getFieldDecorator('owner', {
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
            <FormItem {...formItemLayout} label="连接符" style={{ borderTop:"1px solid #eee", paddingTop:"20px" }}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入连接符',
                  },
                ],
              })(<Input placeholder="请输入连接符" />)}
            </FormItem>
            <Form.Item {...formItemLayout} label="属性">
              <Input.Group compact>
                <Select placeholder="年份" style={{ width: '20%' }}>
                  <Option value="MySQL">2018</Option>
                  <Option value="Oracle">2017</Option>
                  <Option value="SQL Server">2015</Option>
                </Select>
                <Select placeholder="区" style={{ width: '30%' }}>
                  <Option value="MySQL">A</Option>
                  <Option value="Oracle">BasicForms</Option>
                  <Option value="SQL Server">C</Option>
                </Select>
                <Select placeholder="街道" style={{ width: '50%' }}>
                  <Option value="MySQL">XCV</Option>
                  <Option value="Oracle">DXC</Option>
                  <Option value="SQL Server">HP</Option>
                </Select>
              </Input.Group>
            </Form.Item>
            
            <FormItem {...formItemLayout} label="随机位数">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入随机位数',
                  },
                ],
              })(<Input placeholder="请输入随机位数" />)}
            </FormItem>
            <FormItem {...submitFormLayout}>
              <Button type="dashed" style={{ width: '100%', marginBottom: 20 }} icon="plus">
                添加属性/随机位数/连接符
              </Button>
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
