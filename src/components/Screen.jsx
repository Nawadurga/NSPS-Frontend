import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";

const Screen = ({ children }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles(theme).screen}>
      {children}
    </SafeAreaView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

export default Screen;
