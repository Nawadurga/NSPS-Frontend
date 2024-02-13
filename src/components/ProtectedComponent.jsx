import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const ProtectedComponent = ({ children, unProtectedComponent }) => {
  const { isAdmin } = useSelector(selectUser);

  return <>{isAdmin ? children : unProtectedComponent}</>;
};

export default ProtectedComponent;

const styles = StyleSheet.create({});
