import { StyleProp, Text, TextInput, View, ViewStyle } from "react-native";
import { InputDefaultProps, InputProps } from "../../types/interfaces";
import { Colors } from "../../styles/colors";
import { allStyles } from "../../styles/styles";
import TouchableCustom from "../TouchableCustom";
import {
  TextInputMask,
  TextInputMaskOptionProp,
} from "react-native-masked-text";

export default function Input({
  disabled,
  error,
  errorMessage,
  label,
  placeholder,
  required,
  suffixIcon,
  onPressIcon,
  maskType = "custom",
  ...props
}: InputDefaultProps) {
  const borderColor: StyleProp<ViewStyle> = {
    borderColor: error ? "red" : Colors.secondary,
  };

  var options: TextInputMaskOptionProp;

  switch (maskType) {
    case "credit-card":
      options = {
        obfuscated: false,
        issuer: "visa-or-mastercard",
      };
    case "money":
      options = {
        unit: "R$",
      };
    case "cel-phone":
      console.log("asdasdasasdasdasd");
      options = {
        maskType: "BRL",
        withDDD: true,
        dddMask: "(99) ",
      };
    case "datetime":
      options = { format: "DD/MM/YYYY" };
  }

  function InputCustom() {
    if (maskType === "custom") {
      return <TextInput placeholder={placeholder} {...props} />;
    } else {
      return (
        <TextInputMask
          placeholder={placeholder}
          {...props}
          type={maskType}
          options={options}
        />
      );
    }
  }

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Text>{label}</Text>
        {required && <Text style={{ color: "red" }}> *</Text>}
      </View>
      <View style={[allStyles.inputContainer, borderColor]}>
        <InputCustom />
        <TouchableCustom onPress={() => onPressIcon && onPressIcon()}>
          {suffixIcon && suffixIcon}
        </TouchableCustom>
      </View>
      {errorMessage && error && (
        <Text style={{ fontSize: 12, color: "red" }}>{errorMessage}</Text>
      )}
    </View>
  );
}
