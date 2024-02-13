import { createStackNavigator } from "@react-navigation/stack";

import CustomNavigationBar from "../components/CustomNavigationBar";
import Routes from "./Routes";
import BottomNavigator from "./BottomNavigator";
import PaymentReportScreen from "../Screen/payment/PaymentReportScreen";
import EditProfileInfoScreen from "../Screen/Profile/EditProfileInfoScreen";
import EditVehicleInfoScreen from "../Screen/Profile/EditVehicleInfoScreen";
import AddVehicleScreen from "../Screen/Profile/AddVehicleScreen";
import AddUserScreen from "../Screen/Profile/AddUserScreen";
import UserSearchScreen from "../Screen/Profile/UserSearchScreen";
import UserProfile from "../Screen/Profile/UserProfile";
import useNotificationNavigation from "../hooks/useNotificationNavigation";
import AlertScreen from "../Screen/Alert/AlertScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  useNotificationNavigation();

  return (
    <Stack.Navigator
      initialRouteName={Routes.BOTTOM_NAVIGATION}
      screenOptions={{
        header: (props) => {
          return <CustomNavigationBar title={props.options.title} {...props} />;
        },
      }}
    >
      <Stack.Screen
        name={Routes.BOTTOM_NAVIGATION}
        component={BottomNavigator}
      />
      <Stack.Screen
        name={Routes.PAYMENT_REPORT}
        component={PaymentReportScreen}
      />
      <Stack.Screen
        name={Routes.EDIT_PROFILE_INFO_SCREEN}
        component={EditProfileInfoScreen}
      />
      <Stack.Screen
        name={Routes.EDIT_VEHICLE_INFO_SCREEN}
        component={EditVehicleInfoScreen}
      />
      <Stack.Screen
        name={Routes.ADD_VEHICLE_SCREEN}
        component={AddVehicleScreen}
      />
      <Stack.Screen name={Routes.USER_PROFILE_SCREEN} component={UserProfile} />
      <Stack.Screen name={Routes.ADD_USER_SCREEN} component={AddUserScreen} />
      <Stack.Screen
        name={Routes.USER_SEARCH_SCREEN}
        component={UserSearchScreen}
      />
      <Stack.Screen
        name={Routes.ALERT_SCREEN}
        component={AlertScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
