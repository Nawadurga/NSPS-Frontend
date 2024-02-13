import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, DataTable, Text, useTheme } from "react-native-paper";
import { useLazyFindVehicleStampsByVehicleIdQuery } from "../../redux/vehicleAPISlice";
import DisplayInfo from "../../components/DisplayInfo";

const VehicleStamp = ({ vehicleId }) => {
  const theme = useTheme();
  const myStyles = styles(theme);

  const [fetchOptions, setFetchOptions] = useState({
    pageNo: 0,
    pageSize: 25,
  });

  const [
    vehicleStampsQuery,
    { data: vehicleStamps, isLoading, isError, error },
  ] = useLazyFindVehicleStampsByVehicleIdQuery();

  useEffect(() => {
    const query = {
      vehicleId: vehicleId,
      ...fetchOptions,
    };

    vehicleStampsQuery(query);
  }, [fetchOptions, vehicleId]);

  const handlePageChange = (page) => {
    setFetchOptions((prevOptions) => ({
      ...prevOptions,
      pageNo: page,
    }));
  };

  if (isLoading) {
    return (
      <View style={myStyles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={myStyles.errorContainer}>
        <Text>Error: {error?.message || "Unknown error"}</Text>
      </View>
    );
  }

  if (vehicleStamps?.content.length < 1) {
    return <DisplayInfo info={" No Log Found."} />;
  }

  return (
    <View style={myStyles.container}>
      <View style={myStyles.tableContainer}>
        <View style={myStyles.headerRow}>
          <Text style={myStyles.headerText}>Entry Date</Text>
          <Text style={myStyles.headerText}>Entry Time</Text>
          <Text style={myStyles.headerText}>Total Hours Parked</Text>
        </View>

        {vehicleStamps?.content.map((log, index) => (
          <View style={myStyles.row} key={index}>
            <Text style={myStyles.cell}>{log.entryDate}</Text>
            <Text style={myStyles.cell}>{log.entryTime}</Text>
            <Text style={myStyles.cell}>
              {log.totalHoursParked || "still parked"}
            </Text>
          </View>
        ))}
      </View>

      <DataTable.Pagination
        page={fetchOptions.pageNo}
        numberOfPages={vehicleStamps?.paginationResponse?.totalPages}
        onPageChange={handlePageChange}
        label={`${fetchOptions.pageNo + 1} of ${
          vehicleStamps?.paginationResponse?.totalPages || 1
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
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    tableContainer: {
      backgroundColor: theme.dark ? theme.colors.elevation.level3 : "#f7f7f7",
      borderRadius: 10,
      overflow: "hidden",
      marginTop: 16,
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
      textAlign: "left",
    },
    alignRight: {
      textAlign: "right",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorContainer: {
      flex: 1,

      justifyContent: "center",
      alignItems: "center",
    },
  });

export default VehicleStamp;
