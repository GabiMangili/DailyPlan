import {
  StyleProp,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  ButtonCustomProps,
  IconButtonCustomProps,
} from "../../types/interfaces";
import { Colors } from "../../styles/colors";
import TouchableCustom from "../TouchableCustom";

export function IconButton({
  color = "primary",
  children,
  disabled,
  variant = "outlined",
  isRounded = false,
  icon,
  ...props
}: IconButtonCustomProps) {
  return (
    <Button
      style={{
        justifyContent: "center",
        alignContent: "center",
        borderRadius: isRounded ? 999 : 8,
        padding: 10,
        backgroundColor:
          variant === "contained"
            ? disabled
              ? Colors.disabled
              : Colors[color]
            : undefined,
      }}
      {...props}
    >
      {icon}
    </Button>
  );
}

export default function Button({
  color = "primary",
  children,
  disabled,
  style,
  ...props
}: ButtonCustomProps) {
  const useStyle: StyleProp<ViewStyle> = style
    ? style
    : {
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        borderRadius: 8,
        padding: 10,
        backgroundColor: disabled ? Colors.disabled : Colors[color],
      };
  return (
    <View>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.7}
        style={useStyle}
        {...props}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "500",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
