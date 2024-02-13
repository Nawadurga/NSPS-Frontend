import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Text } from 'react-native-paper';

const UserItem = ({ user }) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{user.name}</DataTable.Cell>
      <DataTable.Cell>{user.phoneNo}</DataTable.Cell>
      {/* <DataTable.Cell>{user.address}</DataTable.Cell>
      <DataTable.Cell>{user.isAdmin ? 'Yes' : 'No'}</DataTable.Cell>
      <DataTable.Cell>{user.vehicles.length}</DataTable.Cell> */}
    </DataTable.Row>
  );
};

export default UserItem;
