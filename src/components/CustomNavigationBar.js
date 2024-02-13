import { Appbar, Divider, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme, selectTheme } from "../redux/themeSlice";
import Routes from "../navigation/Routes";

const CustomNavigationBar = ({ navigation, back, title, ...props }) => {
  const theme = useTheme();
  const isDarkMOde = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <>
      <Appbar.Header style={{ height: 42, backgroundColor: "transparent" }}>
        {back ? (
          <Appbar.BackAction
            onPress={navigation.goBack}
            style={{ marginLeft: -2 }}
          />
        ) : (
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        )}

        <Appbar.Content
          title={title ? title : props.route.name}
          color={theme.colors.white}
        />
        {!back ? (
          <Appbar.Action
            icon={isDarkMOde ? "moon-waning-crescent" : "white-balance-sunny"}
            onPress={() => dispatch(toggleTheme())}
            style={{ marginRight: 0 }}
          />
        ) : null}
      </Appbar.Header>
      <Divider />
    </>
  );
};

export default CustomNavigationBar;
