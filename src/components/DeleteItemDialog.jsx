import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const DeleteItemDialog = ({
  itemName,
  onDelete,
  onCancel,
  showDeleteDialog,
}) => {

  const handleDelete = () => {
    onDelete();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Portal>
      <Dialog
        visible={showDeleteDialog}
        onDismiss={onCancel}
        style={styles.modalContent}
      >
        <Text style={styles.modalTitle}>Delete Confirmation</Text>
        <Text style={styles.modalText}>
          Are you sure you want to delete {itemName}?
        </Text>
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={handleDelete}>
            Delete
          </Button>
          <Button mode="outlined" onPress={handleCancel}>Cancel</Button>
        </View>
      </Dialog>
    </Portal>
  );
};

export default DeleteItemDialog;

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
