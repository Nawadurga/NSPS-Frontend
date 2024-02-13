import { StyleSheet, View } from "react-native";
import { Text, useTheme , ActivityIndicator} from "react-native-paper";

export default function Loading({ text, width, height, style }) {
  const theme = useTheme();
  const myStyles = styles(theme, width, height);


  return (
    <View style={[myStyles.lodingContainer, style]}>
      <ActivityIndicator animating={true} />
      {text !== null ? <Text>{text}</Text> : null}
    </View>
  );
}

const styles = (theme, width, height) =>
  StyleSheet.create({
    lodingContainer: {
      flex:1,
      height: height !== undefined ? height : 200,
      width: width !== undefined ? width : "95%",
      borderColor: theme.colors.elevation.level5,
      borderWidth: 0.5,
      marginLeft:"auto",
      marginRight:"auto",
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 2,
      backgroundColor: theme.dark
        ? theme.colors.elevation.level1
        : theme.colors.background,
    },
  });
