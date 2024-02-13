import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";

import { parkingSVG } from "../../components/ParkingMapSVG";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import { useGetParkingStatusQuery } from "../../redux/vehicleAPISlice";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height - 108;

//original dimensions
const originalSVGWidth = 589;
const originalSVGHeight = 1120;

//determine the scale factor
const scale = Math.min(
  screenWidth / originalSVGWidth,
  screenHeight / originalSVGHeight
);

const finalSVGWidth = originalSVGWidth * scale;

const carSpaceMaking = {
  11: { position: { x: 330, y: 14 }, rotate: "90deg" },
  12: { position: { x: 331, y: 70 }, rotate: "90deg" },
  13: { position: { x: 331, y: 126 }, rotate: "90deg" },
  14: { position: { x: 331, y: 182 }, rotate: "90deg" },
  15: { position: { x: 331, y: 238 }, rotate: "90deg" },
  16: { position: { x: 331, y: 294 }, rotate: "90deg" },
  21: { position: { x: 331, y: 350 }, rotate: "90deg" },
  22: { position: { x: 331, y: 406 }, rotate: "90deg" },
  23: { position: { x: 331, y: 462 }, rotate: "90deg" },
  24: { position: { x: 331, y: 518 }, rotate: "90deg" },
  25: { position: { x: 331, y: 574 }, rotate: "90deg" },

  31: { position: { x: 20, y: 280 }, rotate: "270deg" },
  32: { position: { x: 20, y: 342 }, rotate: "270deg" },
  33: { position: { x: 20, y: 405 }, rotate: "270deg" },
  34: { position: { x: 20, y: 460 }, rotate: "270deg" },

  41: { position: { x: 95, y: 502 }, rotate: "270deg" },
  42: { position: { x: 95, y: 557 }, rotate: "270deg" },
  43: { position: { x: 95, y: 612 }, rotate: "270deg" },

  44: { position: { x: 145, y: 662 }, rotate: "270deg" },
  45: { position: { x: 145, y: 720 }, rotate: "270deg" },

  51: { position: { x: 170, y: 840 }, rotate: "180deg" },
  52: { position: { x: 220, y: 840 }, rotate: "180deg" },
  53: { position: { x: 270, y: 840 }, rotate: "180deg" },

  61: { position: { x: 369, y: 796 }, rotate: "180deg" },
  62: { position: { x: 340, y: 868 }, rotate: "270deg" },
  63: { position: { x: 340, y: 926 }, rotate: "270deg" },
  64: { position: { x: 340, y: 984 }, rotate: "270deg" },
  65: { position: { x: 340, y: 1040 }, rotate: "270deg" },

  71: { position: { x: 500, y: 530 }, rotate: "90deg" },
  72: { position: { x: 500, y: 588 }, rotate: "90deg" },
  73: { position: { x: 500, y: 644 }, rotate: "90deg" },
  74: { position: { x: 500, y: 701 }, rotate: "90deg" },
  75: { position: { x: 500, y: 758 }, rotate: "90deg" },
  81: { position: { x: 500, y: 815 }, rotate: "90deg" },
  82: { position: { x: 500, y: 871 }, rotate: "90deg" },
  83: { position: { x: 500, y: 927 }, rotate: "90deg" },
  84: { position: { x: 500, y: 986 }, rotate: "90deg" },
  85: { position: { x: 500, y: 1040 }, rotate: "90deg" },

  91: { position: { x: 322, y: 796 }, rotate: "180deg" },
};

export default function ParkingMap() {
  const {
    data: parkingStatusData,
    isLoading,
    isError,
    error,
  } = useGetParkingStatusQuery();

  if (isLoading) {
    return <Loading height={600} style={{ marginVertical: 10 }} />;
  }

  if (isError) {
    let errMsg = error?.data?.message || "Please try again later.";
    return <ErrorComponent errorMessage={errMsg} />;
  }

  return (
    <View style={styles.container}>
      <SvgXml
        xml={parkingSVG}
        width={finalSVGWidth}
        height={originalSVGHeight * scale}
        style={styles.parkingArea}
      />

      {parkingStatusData.map((key) => {
        const car = carSpaceMaking[key];
        if (car) {
          const adjustedPositionX = car.position.x * scale;
          const adjustedPositionY = car.position.y * scale;
          const adjustedWidth = 68 * scale;
          const adjustedHeight = 68 * scale;

          return (
            <Image
              key={key}
              source={require("../../assets/car_top_view.png")}
              style={[
                styles.car,
                {
                  left: adjustedPositionX,
                  top: adjustedPositionY,
                  width: adjustedWidth,
                  height: adjustedHeight,
                  transform: [{ rotate: car.rotate }],
                },
              ]}
            />
          );
        }
        return null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: finalSVGWidth,
    height: screenHeight,
  },
  parkingArea: {
    position: "absolute",
  },
  car: {
    position: "absolute",
    resizeMode: "contain",
    zIndex: 3,
  },
});

// import React from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { SvgXml } from "react-native-svg";

// import { parkingSVG } from "../../components/ParkingMapSVG";

// const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;

// // const screenWidth = 300;
// // const screenHeight = 600;

// const carSpaceMaking = {
//   99: { isVisible: true, position: { x: 0, y: 0 }, rotate: "90deg" },
//   11: { isVisible: true, position: { x: 0.57, y: 0 }, rotate: "90deg" },
//   12: { isVisible: true, position: { x: 0.57, y: 0.044 }, rotate: "90deg" },
//   13: { isVisible: true, position: { x: 0.57, y: 0.088 }, rotate: "90deg" },
//   14: { isVisible: true, position: { x: 0.57, y: 0.132 }, rotate: "90deg" },
//   15: { isVisible: true, position: { x: 0.57, y: 0.176 }, rotate: "90deg" },
//   16: { isVisible: true, position: { x: 0.57, y: 0.22 }, rotate: "90deg" },
//   21: { isVisible: true, position: { x: 0.57, y: 0.264 }, rotate: "90deg" },
//   22: { isVisible: true, position: { x: 0.57, y: 0.308 }, rotate: "90deg" },
//   23: { isVisible: true, position: { x: 0.57, y: 0.352 }, rotate: "90deg" },
//   24: { isVisible: true, position: { x: 0.57, y: 0.396 }, rotate: "90deg" },
//   25: { isVisible: true, position: { x: 0.57, y: 0.44 }, rotate: "90deg" },
// };

// export default function ParkingMap() {
//   return (
//     <View style={styles.container}>
//       <SvgXml
//         xml={parkingSVG}
//         width={screenWidth}
//         height={screenHeight}
//         style={styles.parkingArea}
//       />

//       {Object.keys(carSpaceMaking).map((key) => {
//         const car = carSpaceMaking[key];
//         if (car.isVisible) {
//           return (
//             <Image
//               key={key}
//               source={require("../../assets/car_top_view.png")}
//               style={[
//                 styles.car,
//                 {
//                   left: car.position.x * screenWidth,
//                   top: car.position.y * screenHeight,
//                   transform: [{ rotate: car.rotate }],
//                 },
//               ]}
//             />
//           );
//         } else {
//           return null;
//         }
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#ddd",
//     width: screenWidth,
//     height:screenHeight,
//     borderWidth:2,
//     // margin:16,
//   },
//   parkingArea: {
//     position: "absolute",
//     backgroundColor:"red"
//   },
//   car: {
//     position: "absolute",
//     width: 40,
//     height: 40,
//     resizeMode: "contain",
//     zIndex: 3,
//   },
// });
