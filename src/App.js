import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import Dashboard from '@/pages/dashboard';
import UserList from '@/pages/users/IndexContainer';
import EditUser from '@/pages/users/editUserContainer';
import TagList from '@/pages/tags';
import './App.css';

const { Content } = Layout;

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 300px;
`;

class App extends Component {
  render() {
    return (
      <Layout className="ant-layout-has-sider App">
        <Sidebar />
        <Layout>
          <Header />
          <StyledContent>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/users" component={UserList} />
              <Route path="/users/edit/:username" component={EditUser} />
              <Route exactpath="/users/edit" component={EditUser} />
              <Route path="/tags" component={TagList} />
            </Switch>
          </StyledContent>
        </Layout>
      </Layout>
    );
  }
}

export default App;
