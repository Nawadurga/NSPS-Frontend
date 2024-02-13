import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Menu, Button, List, Text, useTheme } from "react-native-paper";

const CustomDropdown = ({ label, options, onSelect }) => {
  const theme = useTheme();
  const myStyles = styles(theme);
  const [visible, setVisible] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    closeMenu();
  };

  return (
    <View style={myStyles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} style={myStyles.button}>
            <Button
              mode="outlined"
              style={myStyles.buttonLabel}
              icon={"chevron-down"}
            >
              {selectedOption || label}
            </Button>
          </TouchableOpacity>
        }
        style={myStyles.menu}
      >
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionSelect(option)}
            style={myStyles.option}
          >
            <View style={myStyles.optionContent}>
              <Text>{option}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Menu>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      width: "100%",
    },
    buttonLabel: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      borderWidth: 1,
      borderRadius: 5,
    },
    menu: {
      width: "92%",
      marginTop: 46,
      borderRadius: 5,
    },
    option: {
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    optionContent: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,

      borderColor: "#d7d7d7",
      padding: 10,
    },
  });

export default CustomDropdown;
