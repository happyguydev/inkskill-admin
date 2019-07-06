import React from 'react';
import { Button, Table, Switch, Row, Col, Input, Tooltip } from 'antd';
import { get } from 'lodash';
import styled from 'styled-components';
import moment from 'moment';

const Column = Table.Column;
const ButtonGroup = Button.Group;
const Search = Input.Search;

const TableControl = styled(Row)`
  margin-bottom: 16px;
  button {
    margin-left: 8px;
  }
`;

const RightCol = styled(Col)`text-align: right;`;

const UserList = ({ data: { users }, sortedInfo, filteredInfo, clearAll, clearFilters, handleRemove, handleChange,
                      handleActivated, handlePopular, handleVerified, handleAdmin, openUserInTab, setGlobalFilter,
                      handleEdit}) =>
    <div>
    <TableControl type="flex" justify="space-between">
      <Col span={12} order={1}>
        <Search
          placeholder="Name / Email / Username"
          onSearch={(value) => {setGlobalFilter(value)}}
        />
      </Col>
      <RightCol span={12} order={2}>
        <Button onClick={() => handleEdit(null)}>Add</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </RightCol>
    </TableControl>

    <Table dataSource={users} onChange={handleChange} rowKey="_id" size="middle">
      <Column
        title="Username"
        dataIndex="username"
        key="username"
        sorter={(a, b) => a.username ? a.username.localeCompare(b.username ? b.username : "") : -1}
        sortOrder={sortedInfo.columnKey === 'username' && sortedInfo.order}
        filteredValue={filteredInfo.username || null}
        onFilter={(value, record) => {
            var username = record.username || "";
            var name = record.name || "";
            var email = record.email || "";
            return (username.indexOf(value) === 0 || name.indexOf(value) === 0 || email.indexOf(value) === 0);
          }
        }
      />
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        sorter={(a, b) => a.name ? a.name.localeCompare(b.name ? b.name : "") : -1}
        sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order}
        filteredValue={filteredInfo.name || null}
        onFilter={(value, record) => {
            var username = record.username || "";
            var name = record.name || "";
            var email = record.email || "";
            return (username.indexOf(value) === 0 || name.indexOf(value) === 0 || email.indexOf(value) === 0);
          }
        }
      />
      <Column
        title="Email"
        dataIndex="email"
        key="email"
        sorter={(a, b) => a.email ? a.email.localeCompare(b.email ? b.email : "") : -1}
        sortOrder={sortedInfo.columnKey === 'email' && sortedInfo.order}
        filteredValue={filteredInfo.email || null}
        onFilter={(value, record) => {
            var username = record.username || "";
            var name = record.name || "";
            var email = record.email || "";
            return (username.indexOf(value) === 0 || name.indexOf(value) === 0 || email.indexOf(value) === 0);
          }
        }
      />
      <Column
        title="Join Date"
        dataIndex="createdAt"
        key="createdAt"
        sorter={(a, b) => a.createdAt - b.createdAt}
        sortOrder={sortedInfo.columnKey === 'createdAt' && sortedInfo.order}
        render={(text) => (
            <span>{moment(text).format("MM/DD/YYYY h:mm:ss A")}</span>
        )}
      />
      <Column
        title="Role"
        dataIndex="role"
        key="role"
        filters={[
          { text: 'Admin', value: 'admin' },
          { text: 'Artist', value: 'artist' },
          { text: 'Enthusiast', value: 'enthusiast' },
        ]}
        filteredValue={filteredInfo.role || null}
        onFilter={(value, record) => { return record.role.indexOf(value) === 0 }}
      />
      <Column
        title="Activated?"
        key="activated"
        filters={[
          { text: 'Activated', value: true },
          { text: 'Deactivated', value: false },
        ]}
        render={(text, record) => (
          <Switch defaultChecked={get(record, 'isActivated', false)} onChange={ (checked, sortedInfo) => {handleActivated(record, checked);console.log(sortedInfo)} } />
        )}
        onFilter={(value, record) => { return value === "true" ? record.isActivated : !record.isActivated }}
        filteredValue={filteredInfo.activated || null}
      />
      <Column
        title="Verified?"
        key="verified"
        filters={[
          { text: 'Verified', value: true },
          { text: 'Unverified', value: false },
        ]}
        render={(text, record) => (
          <Switch defaultChecked={get(record, 'isVerified', false)} onChange={ (checked) => handleVerified(record, checked) } />
        )}
        onFilter={(value, record) => { return value === "true" ? record.isVerified : !record.isVerified }}
        filteredValue={filteredInfo.verified || null}
      />
      <Column
        title="Popular?"
        key="popular"
        filters={[
          { text: 'Popular', value: true },
          { text: 'Unpopular', value: false },
        ]}
        render={(text, record) => (
          <Switch defaultChecked={get(record, 'isPopular', false)} onChange={(checked) => handlePopular(record, checked) } />
        )}
        onFilter={(value, record) => { return value === "true" ? record.isPopular : !record.isPopular }}
        filteredValue={filteredInfo.popular || null}
      />
      <Column
        title="Admin?"
        key="isAdmin"
        filters={[
            { text: 'Admin', value: true },
            { text: 'Not Admin', value: false },
        ]}
        render={(text, record) => (
          <Switch defaultChecked={get(record, 'isAdmin', false)} onChange={(checked) => handleAdmin(record, checked) } />
        )}
        onFilter={(value, record) => { return value === "true" ? record.isAdmin : !record.isAdmin }}
        filteredValue={filteredInfo.isAdmin || null}
      />
      <Column
        title="Actions"
        key="action"
        render={ (text, record) => (
          <ButtonGroup>
            <Tooltip title="Edit User"><Button type="default" icon="edit" onClick={() => handleEdit(get(record, 'username'))} /></Tooltip>
            <Tooltip title="Preview"><Button type="default" icon="eye" onClick={ () => openUserInTab(record) } /></Tooltip>
            <Tooltip title="Do Proxy Login"><Button type="default" icon="login" /></Tooltip>
            <Tooltip title="Delete User"><Button type="default" icon="delete" disabled={get(record, 'isAdmin', false)} onClick={ () => handleRemove(record) } /></Tooltip>
          </ButtonGroup>
        )}
      />
    </Table>
  </div>;

export default UserList;
