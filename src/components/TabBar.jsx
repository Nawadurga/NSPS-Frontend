import { useState } from "react";
import {  View, StyleSheet } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const TabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();
  const myStyles = styles(theme);
  const [textWidth, setTextWidth] = useState(0);

  const handleTextLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
  };

  return (
    <View>
      <View style={myStyles.titleSection}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <Pressable
              key={`item-${index}`}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              <View style={myStyles.center}>
                <Text
                  variant="titleMedium"
                  onLayout={handleTextLayout}
                  style={
                    isFocused ? myStyles.activeText : myStyles.inActiveText
                  }
                >
                  {label}
                </Text>
                {isFocused && (
                  <View style={[myStyles.active, { width: textWidth + 16  }]}></View>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
      <Divider bold style={{ marginTop: 5 }} />
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    activeText: {
      color: theme.colors.primary,
    },
    inActiveText: {
      color: theme.colors.outline,
    },
    center: {
      alignItems: "center",
    },
    titleSection: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    active: {
      position: "absolute",
      bottom: -5,
      borderBottomColorStyle: "solid",
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
    },
  });

export default TabBar;
