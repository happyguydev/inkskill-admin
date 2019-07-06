import React from 'react';
import { Form, Select, Card, DatePicker, Checkbox, Button, Row, Col, Input} from 'antd';
import LocationField, { getLocationString} from '../../components/fields/LocationField';

import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const CreateForm = Form.create()(
  class extends React.Component {
    state = {
      confirmDirty: false,
    };

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('The two passwords don\'t match!');
      } else {
        callback();
      }
    };

    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    handleCreate = () => {
      const form = this.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        if(typeof this.props.onCreate === 'function') {
          values.createdAt = values.createdAt.toISOString();
          this.props.onCreate(values);
        }
      });
    };

    render() {
      const { onCancel, form, record } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      };

      return (
        <Row gutter={ 16 } type="flex" justify="center">
          <Col span={16}>
            <Card title={record.username ? "Edit User" : "Create User"}>
              <Form layout="horizontal">
                <div style={{'display': 'none'}}>
                  <FormItem label="_id">
                    {getFieldDecorator('_id', {
                      initialValue: record._id || '',
                    })(<Input disabled={true} />)}
                  </FormItem>
                </div>
                <FormItem label="Username" {...formItemLayout}>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input the username!' }],
                    initialValue: record.username || '',
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem label="Name" {...formItemLayout}>
                  {getFieldDecorator('name', {initialValue: record.name || '',})(<Input />)}
                </FormItem>
                <FormItem label="Email" {...formItemLayout}>
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                    },{
                      required: true, message: 'Please input the email!' }
                    ],
                    initialValue: record.email || '',
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem label="Password" {...formItemLayout} extra={record._id ? "Leave blank for same" : null}>
                  {getFieldDecorator('password', {
                    rules: [{
                      validator: this.validateToNextPassword,
                    },{
                      required: (record._id ? false : true), message: 'Please input the password!' }],
                  })(
                    <Input type="password" />
                  )}
                </FormItem>
                <FormItem label="Confirm Password" {...formItemLayout}>
                  {getFieldDecorator('confirm', {
                    rules: [{
                      validator: this.compareToFirstPassword,
                    },{
                      required: (record._id ? false : true), message: 'Please input the password!' }],
                  })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                  )}
                </FormItem>
                <FormItem label="Location" {...formItemLayout}>
                  {getFieldDecorator('location', {
                    rules: [{ required: true, message: 'Please input the Location!' }],
                    initialValue: getLocationString(record.location) || "",
                  })(
                    <LocationField />
                  )}
                </FormItem>
                <FormItem label="Website URL" {...formItemLayout}>
                  {getFieldDecorator('web', {initialValue: record.urls ? record.urls.web  : '' || '',})(<Input />)}
                </FormItem>
                <FormItem label="Role" {...formItemLayout}>
                  {getFieldDecorator('role', {
                    initialValue: record.role || 'enthusiast',
                  })(
                    <Select>
                      <Option value="enthusiast">Enthusiast</Option>
                      <Option value="artist">Artist</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="Gender" {...formItemLayout}>
                  {getFieldDecorator('gender', {
                    initialValue: record.gender || 'male',
                  })(
                    <Select>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="Joining Date" {...formItemLayout}>
                  {getFieldDecorator('createdAt', {
                    initialValue: record.createdAt ? moment(record.createdAt) : moment(),
                    rules: [
                      {
                        type: 'object',
                        required: true,
                      },
                    ],
                  })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
                <FormItem label="Is Admin" {...formItemLayout}>
                  {getFieldDecorator('isAdmin', {
                    initialValue: record.isAdmin || false,
                    valuePropName: 'checked',
                  })(
                    <Checkbox />
                  )}
                </FormItem>
                <FormItem {...formItemLayout}>
                  <Button type="primary" onClick={() => this.handleCreate()}>Create</Button>
                  <Button style={{ marginLeft: 8 }} onClick={onCancel}>Cancel</Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      );
    }
  }
);

const EditUser = ({ data: { profile }, handleEdit, handleCancel}) =>
  <div>
    <CreateForm
      onCreate={handleEdit}
      onCancel={handleCancel}
      record={profile || {}}
    />
  </div>;

export default EditUser;
