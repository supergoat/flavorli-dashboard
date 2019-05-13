import React from 'react';
import styled, {css} from 'styled-components/macro';
import gql from 'graphql-tag';
import UpdateInput from '../containers/UpdateInput';
import Label from '../ui/Label';
import Colours from '../Colours';

interface Props {
  admin: any;
}

const AdminDetails = ({admin}: Props) => {
  return (
    <AdminDetailsWrapper>
      <Heading>Admin Details</Heading>

      <Label>Name</Label>
      <UpdateInput
        style={css`
          margin-bottom: 20px;
          input {
            font-size: 20px;
            width: 100%;
            padding: 7px 0;
          }
        `}
        required
        name="name"
        placeholder="Name"
        inputValue={admin.name}
        variables={{adminId: admin.id}}
        mutation={UPDATE_ADMIN_NAME}
      />

      <Label>Email</Label>
      <UpdateInput
        style={css`
          margin-bottom: 20px;
          input {
            font-size: 20px;
            width: 100%;
            padding: 7px 0;
          }
        `}
        required
        name="email"
        placeholder="Email"
        inputValue={admin.email}
        variables={{adminId: admin.id}}
        mutation={UPDATE_ADMIN_EMAIL}
      />

      <Label>Tel</Label>
      <UpdateInput
        style={css`
          margin-bottom: 20px;
          input {
            font-size: 20px;
            width: 100%;
            padding: 7px 0;
          }
        `}
        required
        name="tel"
        placeholder="Tel"
        inputValue={admin.tel}
        variables={{adminId: admin.id}}
        mutation={UPDATE_ADMIN_TEL}
      />
    </AdminDetailsWrapper>
  );
};

export default AdminDetails;

const UPDATE_ADMIN_NAME = gql`
  mutation updateAdmin($adminId: ID!, $name: String) {
    updateAdmin(adminId: $adminId, name: $name) {
      id
      name
    }
  }
`;

const UPDATE_ADMIN_EMAIL = gql`
  mutation updateAdmin($adminId: ID!, $email: String) {
    updateAdmin(adminId: $adminId, email: $email) {
      id
      email
    }
  }
`;

const UPDATE_ADMIN_TEL = gql`
  mutation updateAdmin($adminId: ID!, $tel: String) {
    updateAdmin(adminId: $adminId, tel: $tel) {
      id
      tel
    }
  }
`;

const AdminDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  margin: 5px 0;
  width: 580px;
  background: ${Colours.white};
  padding: 10px 0;
`;

const Heading = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;
