import { Text, View } from "react-native";
import { Contact } from "../../models";
import { Colors } from "../../styles/colors";

export default function Teste(contact: Contact) {
  return (
    <View style={{ padding: 8, gap: 16 }}>
      <Text
        style={{
          fontSize: 18,
          color: Colors.primary,
          fontWeight: "700",
        }}
      >
        {contact.name}
      </Text>
      <Text style={{ fontWeight: "600", fontSize: 15 }}>Telefones</Text>
    </View>
  );
}
