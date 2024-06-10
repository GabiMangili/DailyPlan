import { StyleProp, Text, TextInput, View, ViewStyle } from "react-native";
import { InputDefaultProps, InputProps } from "../../types/interfaces";
import { Colors } from "../../styles/colors";
import { allStyles } from "../../styles/styles";
import TouchableCustom from "../TouchableCustom";

export default function Input({
  disabled,
  error,
  errorMessage,
  label,
  placeholder,
  required,
  suffixIcon,
  onPressIcon,
  ...props
}: InputDefaultProps) {
  const borderColor: StyleProp<ViewStyle> = {
    borderColor: error ? "red" : Colors.secondary,
  };
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text>{label}</Text>
        {required && <Text style={{ color: "red" }}> *</Text>}
      </View>
      <View style={[allStyles.inputContainer, borderColor]}>
        <TextInput placeholder={placeholder} {...props} />
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
