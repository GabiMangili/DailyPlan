import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";
import { Colors } from "../../styles/colors";

interface DividerProps {
  heigth?: DimensionValue;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  color?: keyof typeof Colors;
}

export default function Divider({
  heigth = 1,
  width = "100%",
  style,
  color,
}: DividerProps) {
  return (
    <View
      style={[
        {
          height: heigth,
          borderColor: "gray",
          backgroundColor: color ? Colors[color] : "gray",
          width: "100%",
        },
        style,
      ]}
    />
  );
}
