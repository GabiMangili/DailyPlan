import { StatusBar, Text, View } from "react-native";
import { HeaderCustomProps } from "../../types/interfaces";
import { allStyles } from "../../styles/styles";
import Button, { IconButton } from "../Button";
import { Colors } from "../../styles/colors";
import TouchableCustom from "../TouchableCustom";

export const Header = ({
  iconLeft,
  iconRight,
  bottom,
  title,
  style,
  onPressIconLeft,
  onPressIconRight,
}: HeaderCustomProps) => {
  var statusbarHeight = StatusBar.currentHeight!;
  return (
    <View
      style={[
        {
          width: "100%",
          padding: 20,
          alignItems: "center",
        },
        style,
      ]}
    >
      <View style={allStyles.headerGeral}>
        <View
          style={{
            justifyContent: "center",
            width: 40,
            alignItems: "flex-start",
          }}
        >
          {iconLeft ? (
            <IconButton
              variant="outlined"
              icon={iconLeft}
              onPress={() => {
                onPressIconLeft && onPressIconLeft();
              }}
            ></IconButton>
          ) : null}
        </View>

        {title ? (
          <Text
            style={{
              flex: 3,
              textAlign: "center",
              textTransform: "uppercase",
              color: Colors.primary,
            }}
          >
            {title}
          </Text>
        ) : null}

        <View
          style={{
            justifyContent: "center",
            width: 40,
            alignItems: "flex-end",
          }}
        >
          {iconRight ? (
            <IconButton
              variant="outlined"
              icon={iconRight}
              onPress={() => {
                onPressIconRight && onPressIconRight();
              }}
            ></IconButton>
          ) : null}
        </View>
      </View>
      {bottom}
    </View>
  );
};
