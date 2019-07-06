import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

const { Sider } = Layout;
const { SubMenu } = Menu;

const StyledSider = styled(Sider)`
  .ant-menu-inline .ant-menu-item {
    font-size: 14px;
  }
`;

const Logo = styled.h1`
  height: 32px;
  border-radius: 6px;
  margin: 16px auto;
  color: white;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
`;

const Sidebar = ({ collapsed, toggleCollapsed }) =>
  <StyledSider
    trigger={null}
    collapsible
    collapsed={collapsed}
    width="240"
  >
    <Logo>{collapsed ? 'Ink' : 'InkSkill Admin'}</Logo>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="specification">
        <Icon type="exception" />
        <span><StyledLink to="/">Specifications</StyledLink></span>
      </Menu.Item>
      <SubMenu
        key="users"
        title={<span><Icon type="team" /><span>Users & Roles</span></span>}
      >
        <Menu.Item key="all_users"><StyledLink to="/users">All Users</StyledLink></Menu.Item>
        <Menu.Item key="admin_roles"><StyledLink to="/roles">Admin Roles</StyledLink></Menu.Item>
      </SubMenu>
      <SubMenu
        key="assets"
        title={<span><Icon type="picture" /><span>Assets</span></span>}
      >
        <Menu.Item key="manage_assets">Assets</Menu.Item>
        <Menu.Item key="inappropriate">Inappropriate</Menu.Item>
      </SubMenu>
      <Menu.Item key="newsletter">
        <Icon type="mail" />
        <span><StyledLink to="/users">Newsletter</StyledLink></span>
      </Menu.Item>
      <Menu.Item key="tags">
        <Icon type="tags-o" />
        <span><StyledLink to="/users">Review Tags</StyledLink></span>
      </Menu.Item>
      <Menu.Item key="styles">
        <Icon type="appstore-o" />
        <span><StyledLink to="/tags">Tattoo Styles</StyledLink></span>
      </Menu.Item>
      <SubMenu
        key="badges"
        title={<span><Icon type="star" /><span>Tattoo Badges</span></span>}
      >
        <Menu.Item key="badges">Tattoo Badges</Menu.Item>
        <Menu.Item key="points">Badge Points</Menu.Item>
      </SubMenu>
      <Menu.Item key="feedback">
        <Icon type="inbox" />
        <span><StyledLink to="/tags">Feedback</StyledLink></span>
      </Menu.Item>
      <Menu.Item key="help">
        <Icon type="exclamation-circle-o" />
        <span><StyledLink to="/tags">Help Center</StyledLink></span>
      </Menu.Item>
      <Menu.Item key="press">
        <Icon type="file-ppt" />
        <span><StyledLink to="/tags">Press</StyledLink></span>
      </Menu.Item>
      <Menu.Item key="templates">
        <Icon type="layout" />
        <span><StyledLink to="/tags">Email Templates</StyledLink></span>
      </Menu.Item>
      <Menu.Item key="about">
        <Icon type="check-circle-o" />
        <span><StyledLink to="/tags">About Page</StyledLink></span>
      </Menu.Item>
      <Menu.Item key="conventions">
        <Icon type="area-chart" />
        <span><StyledLink to="/tags">Conventions</StyledLink></span>
      </Menu.Item>
    </Menu>
  </StyledSider>;

const enhancer = connect(state => ({ collapsed: state.sidebar }));

export default enhancer(Sidebar);
