import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import { useGetAlertImagesQuery } from "../../redux/alertImagesAPISlice";
import { Text } from "react-native-paper";

import config from "../../config/config.json";

const BASE_URL = config.BASE_URL;

const AlertScreen = () => {
  const {
    data: alertImages,
    isLoading,
    isError,
    error,
  } = useGetAlertImagesQuery();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesWithBaseUrl, setImagesWithBaseUrl] = useState([]);



  useEffect(() => {
    if (alertImages) {
      // Replace base URL for image URLs
      const updatedImages = alertImages.map((item) => ({
        ...item,
        imageUrl:
          BASE_URL +
          item.imageUrl.substring(item.imageUrl.lastIndexOf("/api")),
      }));
      setImagesWithBaseUrl(updatedImages);
    }
  }, [alertImages]);

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return <Loading height={600} style={{ marginVertical: 10 }} />;
  }

  if (isError) {
    let errMsg = error?.data?.message || "Please try again later.";
    return <ErrorComponent errorMessage={errMsg} />;
  }

  return (
    <>
      <Text style={styles.heading}>Unauthorized Vehicle Images</Text>
      <View style={styles.line}></View>
      <ScrollView style={styles.container}>
        <View style={styles.gridContainer}>
          {imagesWithBaseUrl.map((item, index) => (
            <TouchableOpacity
              style={styles.imageContainer}
              key={index}
              onPress={() => handleImagePress(item.imageUrl)}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.createdAtText}>
                {item.formattedCreatedAt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedImage && (
          <Modal visible={!!selectedImage} animationType="slide">
            <View style={styles.modalContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullScreenImage}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },
  line: {
    borderBottomColor: "#0099ff",
    borderBottomWidth: 1,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    borderWidth: 2,
    borderRadius: 20,
    margin: 8,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 90,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
  },
  createdAtText: {
    marginTop: 5,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#0099ff",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AlertScreen;
