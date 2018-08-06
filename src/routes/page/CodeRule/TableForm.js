import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Select } from 'antd';
import styles from '../style.less';

const { Option } = Select;

export default class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      attrName: "Name",
      orderNum: this.index,
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.attrValue || !target.attrKey ) {
        message.error('请填写完整规则详情。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      target.attrName = target.attrValue;
      const { data } = this.state;
      const { onChange } = this.props;
      delete target.isNew;
      this.toggleEditable(e, key);
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: '类型',
        dataIndex: 'attrKey',
        key: 'attrKey',
        width: '35%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                value={text}
                autoFocus
                onSelect={e => this.handleFieldChange(e, 'attrKey', record.key)}
              >
                <Option value="attribute">属性</Option>
                <Option value="connector">连接符</Option>
                <Option value="random">随机数</Option>
                <Option value="type">类别</Option>
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '值',
        dataIndex: 'attrValue',
        key: 'attrValue',
        width: '35%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                value={text}
                autoFocus
                onSelect={e => this.handleFieldChange(e, 'attrValue', record.key)}
              >
                <Option
                  value="年份"
                  style={{
                    display: record.attrKey === 'attribute' ? 'block' : 'none',
                  }}
                > 年份
                </Option>
                <Option
                  value="区"
                  style={{
                    display: record.attrKey === 'attribute' ? 'block' : 'none',
                  }}
                > 区
                </Option>
                <Option
                  value="街道"
                  style={{
                    display: record.attrKey === 'attribute' ? 'block' : 'none',
                  }}
                > 街道
                </Option>

                <Option
                  value="%"
                  style={{
                    display: record.attrKey === 'connector' ? 'block' : 'none',
                  }}
                > %
                </Option>
                <Option
                  value="*"
                  style={{
                    display: record.attrKey === 'connector' ? 'block' : 'none',
                  }}
                > *
                </Option>
                <Option
                  value="#"
                  style={{
                    display: record.attrKey === 'connector' ? 'block' : 'none',
                  }}
                > #
                </Option>
                <Option
                  value="@"
                  style={{
                    display: record.attrKey === 'connector' ? 'block' : 'none',
                  }}
                > @
                </Option>
                <Option
                  value="——"
                  style={{
                    display: record.attrKey === 'connector' ? 'block' : 'none',
                  }}
                > ——
                </Option>

                
                <Option
                  value="1"
                  style={{
                    display: record.attrKey === 'random' ? 'block' : 'none',
                  }}
                > 1
                </Option>
                <Option
                  value="2"
                  style={{
                    display: record.attrKey === 'random' ? 'block' : 'none',
                  }}
                > 2
                </Option>
                <Option
                  value="3"
                  style={{
                    display: record.attrKey === 'random' ? 'block' : 'none',
                  }}
                > 3
                </Option>
                <Option
                  value="4"
                  style={{
                    display: record.attrKey === 'random' ? 'block' : 'none',
                  }}
                > 4
                </Option>
                <Option
                  value="5"
                  style={{
                    display: record.attrKey === 'random' ? 'block' : 'none',
                  }}
                > 5
                </Option>

                <Option
                  value="P"
                  style={{
                    display: record.attrKey === 'type' ? 'block' : 'none',
                  }}
                > 人事类
                </Option>
                <Option
                  value="W"
                  style={{
                    display: record.attrKey === 'type' ? 'block' : 'none',
                  }}
                > 网点
                </Option>
                <Option
                  value="K"
                  style={{
                    display: record.attrKey === 'type' ? 'block' : 'none',
                  }}
                > 客户
                </Option>
                <Option
                  value="S"
                  style={{
                    display: record.attrKey === 'type' ? 'block' : 'none',
                  }}
                > 水厂
                </Option>
                
                <Option
                  value="M"
                  style={{
                    display: record.attrKey === 'type' ? 'block' : 'none',
                  }}
                > 水表
                </Option>
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增规则详情
        </Button>
      </Fragment>
    );
  }
}
