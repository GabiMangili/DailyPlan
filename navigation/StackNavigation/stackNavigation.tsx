import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../scr/screens/LoginScreen";
import RegisterScreen from "../../scr/screens/RegisterScreeen";
import ContactsScreen from "../../scr/screens/ContactsScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ContactsScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
