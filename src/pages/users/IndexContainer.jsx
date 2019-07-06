import { graphql } from 'react-apollo';
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose';
import { Modal } from 'antd';
import { filter, get } from 'lodash';
import UsersQuery from '@/graphql/users.graphql';
import RemoveUserMutation from '@/graphql/removeUser.graphql';
import UpdateUserStatusMutation from '@/graphql/updateUserStatus.graphql';
import AddUpdateUserMutation from '@/graphql/addUpdateUser.graphql';
import UserList from './index';
import Loading from '@/components/loading';

const confirm = Modal.confirm;
const userBaseUrl = process.env.REACT_APP_USER_BASE_URL || "http://www-temp.inkskill.com/ink/";

export default compose(
  graphql(UsersQuery),
  graphql(
    RemoveUserMutation,
    {
      name: 'removeUser',
      options: {
        update: (proxy, { data: { removeUser } }) => { // update apollo store
          const data = proxy.readQuery({ query: UsersQuery });
          proxy.writeQuery({
            query: UsersQuery,
            data: {
              users: filter(data.users, user => user._id !== removeUser._id)
            }
          });
        }
      }
    },
  ),
  graphql(
    UpdateUserStatusMutation,
    {
      name: 'updateUserStatus',
    },
  ),
  graphql(
    AddUpdateUserMutation,
    {
      name: 'addUpdateUser',
      options: {
          refetchQueries: [{
              query: UsersQuery,
          }],
      }
    },
  ),
  branch(
    ({ data }) => data && data.loading,
    renderComponent(Loading)
  ),
  withState('sortedInfo', 'setSortedInfo', {columnKey: '', order: ''}),
  withState('filteredInfo', 'setFilteredInfo', {}),
  withHandlers({
    // handle filter, sort, pagination
    handleChange: ({ setSortedInfo, setFilteredInfo }) => (pagination, filters, sorter) => {
      setFilteredInfo(filters);
      setSortedInfo(sorter);
      console.log(pagination, filters, sorter);
    },
    clearAll: ({ setSortedInfo, setFilteredInfo }) => () => {
      setSortedInfo({columnKey: '', order: ''});
      setFilteredInfo({});
    },
    clearFilters: ({ setFilteredInfo }) => () => {
      setFilteredInfo({});
    },
    // handler user remove
    handleRemove: ({ removeUser }) => (record) => {
      confirm({
        title: 'Remove User',
        content: 'Are you sure to delete this user?',
        onOk() {
          removeUser({ variables: { id: get(record, '_id') } })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    handleActivated: ({ updateUserStatus }) => (record, value) => {
      updateUserStatus({ variables: { id: get(record, '_id'), type: 'ACTIVATED', value: value}})
    },
    handlePopular: ({ updateUserStatus }) => (record, value) => {
      updateUserStatus({ variables: { id: get(record, '_id'), type: 'POPULAR', value: value}})
    },
    handleVerified: ({ updateUserStatus }) => (record, value) => {
      updateUserStatus({ variables: { id: get(record, '_id'), type: 'VERIFIED', value: value}})
    },
    handleAdmin: ({ updateUserStatus }) => (record, value) => {
      updateUserStatus({ variables: { id: get(record, '_id'), type: 'ADMIN', value: value}})
    },
    openUserInTab: () => (record) => {
      window.open(userBaseUrl + get(record, 'username'), "_blank");
    },
    setGlobalFilter: ( props ) => (value) => {
      var localFilter = props.filteredInfo;
      if (value) {
        localFilter.username = [value];
        localFilter.name = [value];
        localFilter.email = [value];
        console.log(value);
      } else {
        localFilter.username = null;
        localFilter.name = null;
        localFilter.email = null;
      }
      console.log(props);
      props.setFilteredInfo(localFilter);
    },
    handleEdit: ( props ) => (username) => {
      console.log(username);
      if(username) {
        props.history.push('/users/edit/' + username);
      } else {
        props.history.push('/users/edit');
      }
    }
  }),
)(UserList);
