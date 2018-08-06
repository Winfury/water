import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Button,
  Card,
  Radio,
} from 'antd';
import { Link } from 'dva/router';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

@connect(({ infoResources, codeRule, loading }) => ({
  infoResources,
  codeRule,
  loading: loading.models.codeRule,
  submitting: loading.effects['codeRule/addValidation'],
}))
@Form.create()
export default class ValidationForm extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'codeRule/fetch',
    });
    dispatch({
      type: 'infoResources/fetch',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'codeRule/addValidation',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, form, infoResources: infoResourcesData, codeRule: codeData, loading } = this.props;
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
        title="创建校验"
        content="请完善信息表单内容，完成后请点击提交"
      >

        <Card
          bordered={false}
          loading={loading}
        >
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            <Form.Item {...formItemLayout} label="资源名称">
              {getFieldDecorator('resName', {
                rules: [
                  {
                    required: true,
                    message: '请选择资源名称',
                  },
                ],
              })(
                <Radio.Group>
                  {infoResourcesData.data.resultContent.map((item) => (
                    <Radio.Button key={item.name} value={item.name}>{item.name}</Radio.Button>
                  ))}
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="编码规则">
              {getFieldDecorator('ruleName', {
                rules: [
                  {
                    required: true,
                    message: '请选择编码规则',
                  },
                ],
              })(
                <Radio.Group>
                  {codeData.data.resultContent.map((item) => (
                    <Radio.Button key={item.ruleName} value={item.ruleName}>{item.ruleName}</Radio.Button>
                  ))}
                </Radio.Group>
              )}
            </Form.Item>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Link to="validation-list">
                <Button style={{ marginLeft: 8 }}>退出</Button>
              </Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
