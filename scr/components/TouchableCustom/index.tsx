import { TouchableOpacity } from "react-native";
import { TouchableCustomProps } from "../../types/interfaces";

export default function TouchableCustom({
  children,
  ...props
}: TouchableCustomProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      {children}
    </TouchableOpacity>
  );
}
