import React from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { get, has } from 'lodash';
import withHandlers from 'recompose/withHandlers';
import { login } from '@/state/auth/actions';
import { error } from '@/state/auth/selector';
import logo from '@/assets/img/logo-original-small.gif';

const LoginWrapper = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  background: #f3f3f3;
`;

const LoginForm = styled.div`
  width: 320px;
  height: 340px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0,0,0,.08);
  background: #fff;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  fontSize: 14;
`;

const FormItem = Form.Item;

const Login = ({ handleSubmit, form: { getFieldDecorator } }) =>
  <LoginWrapper>
    <LoginForm>
      <Logo src={logo} />
      <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please enter your username or email!' }],
          })(
            <Input prefix={<StyledIcon type="user" />} placeholder="username or email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please enter your Password!' }],
          })(
            <Input prefix={<StyledIcon type="lock" />} type="password" placeholder="password" />
          )}
        </FormItem>
        <FormItem>
          <LoginButton type="primary" htmlType="submit">
            Login
          </LoginButton>
        </FormItem>
      </Form>
    </LoginForm>
  </LoginWrapper>;

const enhancer = compose(
  connect(
    error,
    dispatch => ({
      onLogin: data => dispatch(login(data))
        .then((response) => {
          if (has(response, 'error')) {
            const errorMessage = get(response, 'error.data.error', '') || get(response, 'statusText', '');
            message.error(errorMessage);
          }
        }),
    }),
  ),
  Form.create(),
  withHandlers({
    handleSubmit: props => event => {
      event.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          props.onLogin(values);
        }
      });
    },
  }),
);
export default enhancer(Login);
