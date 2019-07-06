import { graphql } from 'react-apollo';
import {branch, compose, renderComponent, withHandlers} from 'recompose';
import { Modal } from 'antd';
import omit from 'lodash/omit';

//import { filter, get } from 'lodash';
import UserQuery from '@/graphql/userByUserName.graphql';
import AddUpdateUserMutation from '@/graphql/addUpdateUser.graphql';
import EditUser from './editUser';
import Loading from '@/components/loading';

const alert = Modal.error;

export default compose(
  graphql(
    UserQuery,
    {
      options: (props) => ({
        variables: {
          username: props.match.params.username || ' '
        }
      }),
    }
  ),
  graphql(
    AddUpdateUserMutation,
    {
      name: 'addUpdateUser',
    }
  ),
  branch(
    ({ data }) => data && data.loading,
    renderComponent(Loading)
  ),
  withHandlers({
    handleEdit: ( { addUpdateUser, data }, props ) => (values) => {
      values.urls = {};
      values.urls.web = values.web;
      if(values._id === ' ' || values._id === '') {
        values._id = null;
      }
      if(typeof values.location === "string") {
        values.location = data.profile.location;
      }
      values = omit(values, 'location.__typename', 'web', 'confirm');

      addUpdateUser({
        variables: {
          id: values._id, data: values
        }
      }).then(() => {
        window.location.href = "/users/"
      }).catch((err) => {
        const error = err.message.indexOf("duplicate") !== -1 ? "Error: Username or Email already in use" : err.message;
        alert({
          title: "Error",
          content: error,
          maskClosable: true,
          footer: null,
        });
      });
    },
    handleCancel: () =>() => {
      window.location.href = "/users/";
    }
  }),
)(EditUser);
