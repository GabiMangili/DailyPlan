import { View, Text, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import TouchableCustom from "../../components/TouchableCustom";
import Button from "../../components/Button";
import { Colors } from "../../styles/colors";
import { useReducer, useState } from "react";
import { Octicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = useState(true);

  const [password, setPassword] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid }; //função ao chamar o setPassword
    },
    { value: "", valid: false } //valor inicial
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <View style={{ flex: 1, gap: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Seja bem vindo!</Text>

        <Input
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
        />
        <Input
          required
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry={showPassword}
          suffixIcon={
            showPassword ? (
              <Octicons name="eye" size={20} color="black" />
            ) : (
              <Octicons name="eye-closed" size={20} color="black" />
            )
          }
          onPressIcon={() => {
            console.log("pressionado");
            setShowPassword(!showPassword);
          }}
          onChangeText={(val) => {
            setPassword(val);
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text>Ainda não se cadastrou?</Text>
          <TouchableCustom
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={{ color: Colors.primary, fontWeight: "500" }}>
              {" "}
              Cadastre-se
            </Text>
          </TouchableCustom>
        </View>
        <Button
          color="primary"
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        >
          Entrar
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
