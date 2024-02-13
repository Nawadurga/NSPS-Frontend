import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { DataTable, IconButton, Text, useTheme } from "react-native-paper";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import {
  useDeleteUserMutation,
  useLazyFetchUserListQuery,
} from "../../redux/userAPISlice";
import DeleteItemDialog from "../../components/DeleteItemDialog";
import Routes from "../../navigation/Routes";
import { useNavigation } from "@react-navigation/native";

const UserList = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const myStyles = styles(theme);
  const [showLoading, setShowLoading] = useState(false);
  const [fetchOptions, setFetchOptions] = useState({
    pageNo: 0,
    pageSize: 5,
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState();

  const [deleteUserMutation] = useDeleteUserMutation();

  const [
    userListQuery,
    { data: userList, isFetching, isError, error, },
  ] = useLazyFetchUserListQuery();

  useEffect(() => {
    if (isFetching) {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [isFetching]);

  useEffect(() => {
    setShowLoading(true);
    userListQuery(fetchOptions).then(() => setShowLoading(false));
  }, [fetchOptions]);

  const handlePageChange = (page) => {
    setFetchOptions((prevOptions) => ({
      ...prevOptions,
      pageNo: page,
    }));
  };

  const handleEdit = (user) => {
    navigation.navigate(Routes.USER_PROFILE_SCREEN, {
      userId: user.id,
    });
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const onDelete = () => {
    deleteUserMutation(userToDelete.id);
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };
  const onCancel = () => {
    setShowDeleteDialog(false);
  };

  const renderActionsCell = (user) => (
    <View style={myStyles.actionsContainer}>
      <IconButton
        icon="pencil"
        onPress={() => handleEdit(user)}
        iconColor={theme.colors.primary}
      />
      <IconButton
        icon="delete"
        onPress={() => handleDelete(user)}
        iconColor="#FF4040"
      />
    </View>
  );

  if (showLoading) {
    return (
      <View style={myStyles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  if (isError) {
    let errMsg = error?.data?.message || "Please try again later.";
    return <ErrorComponent errorMessage={errMsg} />;
  }

  return (
    <ScrollView contentContainerStyle={myStyles.container}>
      <View style={myStyles.tableContainer}>
        <View style={myStyles.headerRow}>
          <Text style={myStyles.headerText}>Name</Text>
          <Text style={myStyles.headerText}>Phone Number</Text>
          <Text style={myStyles.headerText}>Actions</Text>
        </View>

        {userList?.content.map((user) => (
          <View style={myStyles.row} key={user.id}>
            <Text style={myStyles.cell}>
              {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            </Text>
            <Text style={myStyles.cell}>{user.phoneNo}</Text>
            {renderActionsCell(user)}
          </View>
        ))}
      </View>

      <DataTable.Pagination
        page={fetchOptions.pageNo}
        numberOfPages={userList?.paginationResponse?.totalPages}
        onPageChange={handlePageChange}
        label={`${fetchOptions.pageNo + 1} of ${
          userList?.paginationResponse?.totalPages || 1
        }`}
        showFastPaginationControls
        numberOfItemsPerPageList={[5, 25, 50, 100]}
        numberOfItemsPerPage={fetchOptions.pageSize}
        onItemsPerPageChange={(size) =>
          setFetchOptions((prevOptions) => ({
            ...prevOptions,
            pageSize: size,
          }))
        }
        selectPageDropdownLabel={"Rows per page"}
      />

      <DeleteItemDialog
        showDeleteDialog={showDeleteDialog}
        itemName={"user: " + userToDelete?.name}
        onDelete={onDelete}
        onCancel={onCancel}
      />
    </ScrollView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
    },
    tableContainer: {
      backgroundColor: theme.dark ? theme.colors.elevation.level3 : "#f7f7f7",
      borderRadius: 10,
      overflow: "hidden",
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.primary,
    },
    headerText: {
      fontWeight: "bold",
      color: "#fff",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    cell: {
      flex: 1,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end", // Align buttons to the right
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default UserList;
