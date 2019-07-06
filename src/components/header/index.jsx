import React from 'react';
import styled from 'styled-components';
import { Icon, Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { toggleSidebar } from '@/state/sidebar/actions';
import { logout } from '@/state/auth/actions';
const { Header } = Layout;

const SubMenu = Menu.SubMenu;  // 为了使用方便
const MenuItem = Menu.Item;

const StyledHeader = styled(Header)`
  height: 64px;
  line-height: 64px;
  background: #fff;
  padding: 0;
`;

const StyledIcon = styled(Icon)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 16px;
  cursor: pointer;
  transition: color .3s;
  &:hover {
    color: #108ee9;
  }
`;

const StyledMenu = styled(Menu)`
  line-height: 61px;
  float: right;
  border-bottom: none;
  .ant-menu-submenu-horizontal {
    .ant-menu {
      width: 120px;
    }
  }
`;

const AppHeader = ({ collapsed, toggle, user, onLogout }) =>
  <StyledHeader>
    <StyledIcon
      className="trigger"
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={toggle}
    />
    <StyledMenu mode="horizontal">
      <SubMenu title={<div><Icon type="user" /><span>{get(user, 'name')}</span></div>}>
        <MenuItem key="logout">
          <a onClick={onLogout}><Icon type="logout"/> Logout</a>
        </MenuItem>
      </SubMenu>
    </StyledMenu>
  </StyledHeader>;

const enhancer = connect(
  state => ({
    collapsed: state.sidebar,
    user: state.auth.user,
  }),
  { toggle: toggleSidebar, onLogout: logout },
);

export default enhancer(AppHeader);
