import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreeen";
import ContactsScreen from "../../screens/ContactsScreen";
import AddContactScreen from "../../screens/AddContactScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  //arquivo para navegação em pilhas
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ContactsScreen" //trocar para login screen para iniciar na tela de login
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
