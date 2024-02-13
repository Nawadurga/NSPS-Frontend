import React from "react";
import {  StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";

const size = 200 - 32;
const strokeWidth = 20;
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;

const CircularProgress = ({ progress }) => {
  const theme = useTheme();
  const circumference = r * 2 * PI;
  const α = (progress / 100) * PI * 2;
  const strokeDashoffset = circumference - α * r;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svgContainer}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor={theme.colors.primary} />
          </LinearGradient>
        </Defs>
        <Circle
          stroke={theme.colors.elevation.level3}
          fill="none"
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
        <Circle
          stroke="url(#grad)"
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          {...{
            strokeDashoffset,
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.progressText}>{`${progress}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  svgContainer: {
    transform: [{ rotateZ: "270deg" }],
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default CircularProgress;
