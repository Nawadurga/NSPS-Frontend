import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { selectTheme } from "../redux/themeSlice";
import darkTheme from "../config/darkTheme";
import lightTheme from "../config/lightTheme";
import DrawerNavigation from "../navigation/DrawerNavigation";
import AuthNavigator from "../navigation/AuthNavigator";
import { selectUser } from "../redux/userSlice";

export default function MyApp() {
  const isDarkMode = useSelector(selectTheme);
  const statusBar = isDarkMode ? "light" : "dark";
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { isAuthenticated } = useSelector(selectUser);

  return (
    <PaperProvider style={styles.container} theme={theme}>
      <StatusBar style={statusBar} />
      {isAuthenticated ? <DrawerNavigation /> : <AuthNavigator />}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
