import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const allStyles = StyleSheet.create({
  inputContainer: {
    padding: 8,
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerGeral: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  defaultScreen: { flex: 1, padding: 20, backgroundColor: "white" },
});
