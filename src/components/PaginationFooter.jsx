import React from "react";
import { Divider, useTheme } from "react-native-paper";
import { StyleSheet, View, FlatList } from "react-native";

import SmallBox from "./SmallBox";

const PaginationFooter = ({
  totalPages,
  fetchOptions,
  setFetchOptions,
  setActivePagination,
  activePagination,
}) => {
  const theme = useTheme();
  const myStyles = styles(theme);

  const DATA = Array(totalPages).fill(0);

  const renderItem = (item) => {
    const style = item.index === activePagination ? "active" : "pagination";
    return (
      <SmallBox
        title={item.index + 1}
        size={42}
        varient={style}
        onPress={() => {
          if (item.index !== activePagination) {
            setActivePagination(item.index);
            setFetchOptions({
              ...fetchOptions,
              pageNo: item.index,
            });
          }
        }}
      />
    );
  };

  return (
    <View style={myStyles.container}>
      <Divider />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        horizontal
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 16 }}>
            No items to display
          </Text>
        )}
      />
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      zIndex: 5,
      height: 52,
      backgroundColor: theme.datk
        ? theme.colors.elevation.level1
        : theme.colors.background,
    },
  });

export default React.memo(PaginationFooter);
