import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Input from "../../components/Input";
import TouchableCustom from "../../components/TouchableCustom";
import { Colors } from "../../styles/colors";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useReducer, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as EmailValidator from "email-validator";
import { Octicons } from "@expo/vector-icons";
import { Header } from "../../components/Header";

const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const [buttonPressed, setButtonPressed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messageError, setMessageError] = useState<string | null>(null);

  const [name, setName] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [email, setEmail] = useReducer(
    //useReducer para fazer uma função ao trocar estado (e também a troca é mais rápida que no useState)
    (_: any, value: any) => {
      const isEmpty = value == "";
      const emailIsValdid = EmailValidator.validate(value);
      console.log("email valido? ", emailIsValdid + " vazio? ", isEmpty);
      const isValid = emailIsValdid && !isEmpty;
      return {
        value: value,
        valid: isValid,
        errorMessage: isEmpty
          ? "Campo obrigatório"
          : !emailIsValdid
          ? "E-mail inválidao"
          : "",
      };
    },
    { value: "", valid: false, errorMessage: "" }
  );

  const [password, setPassword] = useReducer(
    (_: any, value: any) => {
      const has6MoreCharacters = value.length >= 7;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecial = /[^a-zA-Z0-9 ]/.test(value);
      const valid =
        hasUpper && hasLower && hasNumber && has6MoreCharacters && hasSpecial;
      return {
        valid: valid,
        value: value,
        hasUpper: hasUpper,
        hasLower: hasLower,
        hasNumber: hasNumber,
        has6MoreCharacters: has6MoreCharacters,
        hasSpecial: hasSpecial,
        errorMessage:
          value == "" ? "Campo obrigatório" : !valid ? "Senha inválida" : "",
      };
    },
    {
      valid: false,
      value: "",
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      has6MoreCharacters: false,
      hasSpecial: false,
      errorMessage: "",
    }
  );

  const [confirmPassword, setConfirmPassword] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const hasSomeFieldEmpty =
    confirmPassword.value === "" ||
    password.value === "" ||
    name.value === "" ||
    email.value === ""; //saber se existe algum campo vazio para não habilitar o botão

  const validate = () => {
    return (
      name.valid &&
      email.valid &&
      password.valid &&
      confirmPassword.valid &&
      confirmPassword.value === password.value
    );
  };

  function rulesPasswordRow(text: string, check?: boolean) {
    return (
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        {check ? (
          <AntDesign name="check" size={14} color="green" />
        ) : (
          <AntDesign name="close" size={14} color="red" />
        )}
        <Text>{text}</Text>
      </View>
    );
  }

  console.log(buttonPressed);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          title="CADASTRO"
          iconLeft={
            <AntDesign name="arrowleft" size={18} color={Colors.primary} />
          }
          onPressIconLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ flex: 1, padding: 20, gap: 16, paddingVertical: 16 }}>
            <Input
              required
              label="Nome"
              placeholder="Digite seu nome"
              error={buttonPressed && !name.valid} //verificando se o botão foi pressionado para não mostrar mensagens de erro antes de apertar o botão
              errorMessage={"Campo obrigatório"}
              onChangeText={(val) => {
                setName(val);
              }}
            />
            <Input
              required
              label="E-mail"
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              error={buttonPressed && !email.valid}
              errorMessage={
                email.value === "" ? "Campo obrigatório" : email.errorMessage
              }
              onChangeText={(val) => {
                setEmail(val);
              }}
            />
            <Input
              required
              label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry={!showPassword}
              suffixIcon={
                showPassword ? (
                  <Octicons name="eye" size={20} color="black" />
                ) : (
                  <Octicons name="eye-closed" size={20} color="black" />
                )
              }
              error={buttonPressed && !password.valid}
              errorMessage={
                password.value === ""
                  ? "Campo obrigatório"
                  : password.errorMessage
              }
              onChangeText={(val) => {
                setPassword(val);
              }}
              onPressIcon={() => {
                console.log("pressionado");
                setShowPassword(!showPassword);
              }}
            />
            <View style={{ gap: 8 }}>
              {rulesPasswordRow(
                "Deve conter no mínimo 7 caracteres",
                password.has6MoreCharacters
              )}
              {rulesPasswordRow("Deve conter número", password.hasNumber)}
              {rulesPasswordRow(
                "Deve conter letra maiúscula",
                password.hasUpper
              )}
              {rulesPasswordRow(
                "Deve conter letra minúscula",
                password.hasLower
              )}
              {rulesPasswordRow(
                "Deve conter caractere especial",
                password.hasSpecial
              )}
            </View>
            <Input
              required
              label="Digite a nova senha outra vez"
              placeholder="Digite a senha novamente"
              secureTextEntry={!showConfirmPassword}
              errorMessage={
                !confirmPassword.valid
                  ? "Campo obrigatório"
                  : confirmPassword.value != password.value
                  ? "Senhas diferentes"
                  : ""
              }
              error={
                buttonPressed &&
                (!confirmPassword.valid ||
                  confirmPassword.value != password.value)
              }
              value={confirmPassword.value}
              suffixIcon={
                showConfirmPassword ? (
                  <Octicons name="eye" size={20} color="black" />
                ) : (
                  <Octicons name="eye-closed" size={20} color="black" />
                )
              }
              onPressIcon={() => {
                console.log("pressionado");
                setShowConfirmPassword(!showConfirmPassword);
              }}
              onChangeText={(val) => {
                setConfirmPassword(val);
              }}
            />
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            color="primary"
            disabled={hasSomeFieldEmpty}
            onPress={() => {
              console.log("pressionando botão");
              setButtonPressed(true);
              navigation.navigate("RegisterScreen");
            }}
          >
            Cadastrar-se
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
