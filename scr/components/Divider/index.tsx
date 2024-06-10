import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";

interface DividerProps {
  heigth?: DimensionValue;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
}

export default function Divider({
  heigth = 1,
  width = "100%",
  style,
}: DividerProps) {
  return (
    <View
      style={[
        {
          height: heigth,
          borderColor: "gray",
          backgroundColor: "gray",
          width: "100%",
        },
        style,
      ]}
    />
  );
}
