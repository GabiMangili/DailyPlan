import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ContactsScreen from "../../scr/screens/ContactsScreen";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ContactsScreen} />
    </Tab.Navigator>
  );
}
