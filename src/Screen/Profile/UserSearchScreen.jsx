import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  DataTable,
  useTheme,
  IconButton,
  Divider,
} from "react-native-paper";
import {
  useDeleteUserMutation,
  useLazySearchUsersQuery,
} from "../../redux/userAPISlice";
import DeleteItemDialog from "../../components/DeleteItemDialog";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import Routes from "../../navigation/Routes"

const UserSearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [showLoading, setShowLoading] = useState(false);

  const theme = useTheme();
  const myStyles = styles(theme);

  const searchCriteriaOptions = [
    { label: "Name", value: "name" },
    { label: "Phone No", value: "phone_no" },
    { label: "Number Plate", value: "number_plate" },
    { label: "Parking Slot", value: "parking_slot" },
  ];

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState();

  const [deleteUserMutation] = useDeleteUserMutation();

  const [searchUserQuery, { data: userList, isError, error }] =
    useLazySearchUsersQuery();

  const handleSearch = () => {
    setShowLoading(true);
    if (query !== "") {
      searchUserQuery({ query, searchBy }).then(() => setShowLoading(false));
    } else {
      setShowLoading(false);
    }
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

  return (
    <ScrollView style={myStyles.container}>
      <Text style={myStyles.searchByText}>Search by:</Text>

      <View style={myStyles.buttonContainer}>
        {searchCriteriaOptions.map((option) => (
          <Button
            key={option.value}
            mode={searchBy === option.value ? "contained" : "outlined"}
            onPress={() => setSearchBy(option.value)}
            style={myStyles.button}
          >
            {option.label}
          </Button>
        ))}
      </View>

      <TextInput
        label="Search"
        mode="outlined"
        value={query}
        onChangeText={setQuery}
        style={myStyles.input}
      />

      <Button
        mode="contained"
        onPress={handleSearch}
        style={myStyles.searchButton}
      >
        Search
      </Button>

      {isError && (
        <Text
          style={{
            marginBottom: 16,
            backgroundColor: "red",
            width: "100%",
            padding: 16,
            color: "white",
          }}
        >
          {error.data.message}
        </Text>
      )}

      {userList?.length > 0 && (
        <View>
          <View style={myStyles.tableContainer}>
            <View style={myStyles.headerRow}>
              <Text style={myStyles.headerText}>Name</Text>
              <Text style={myStyles.headerText}>Phone Number</Text>
              <Text style={myStyles.headerText}>Actions</Text>
            </View>

            {userList.map((user) => (
              <View style={myStyles.row} key={user.id}>
                <Text style={myStyles.cell}>
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </Text>
                <Text style={myStyles.cell}>{user.phoneNo}</Text>
                {renderActionsCell(user)}
              </View>
            ))}
          </View>

          <DeleteItemDialog
            showDeleteDialog={showDeleteDialog}
            itemName={"user: " + userToDelete?.name}
            onDelete={onDelete}
            onCancel={onCancel}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      marginBottom: 16,
    },
    searchByText: {
      fontSize: 16,
      marginBottom: 8,
    },
    buttonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    button: {
      marginBottom: 8,
      minWidth: "48%",
    },
    searchButton: {
      marginBottom: 16,
    },

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

export default UserSearchScreen;
