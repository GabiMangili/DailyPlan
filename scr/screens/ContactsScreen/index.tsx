import {
  FlatList,
  Linking,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Contact } from "../../models";
import Divider from "../../components/Divider";
import { Colors } from "../../styles/colors";
import ContactInfos from "../../components/ContactInfos";
import Button, { IconButton } from "../../components/Button";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ContactsScreen() {
  const navigation = useNavigation<any>();

  const contacts: Contact[] = [
    {
      id: 1,
      description: "menina chata",
      name: "Gabi Mangili",
      user_id: 0,
      emails: [
        { id: 1, email: "gabriela@gmail.com", user_id: 2, contact_id: 2 },
        {
          id: 3,
          email: "gabriela.mangili@gmail.com",
          user_id: 3,
          contact_id: 3,
        },
      ],
      addresses: [
        {
          city: "Marília",
          contact_id: 1,
          id: 1,
          neighborhood: "Bairro Univem",
          number: "123",
          postal_code: "17452733",
          state: "sp",
          street: "Rua dos bobos",
          user_id: 2,
        },
      ],
      phones: [
        {
          contact_id: 1,
          id: 1,
          phone: "14999999999",
          user_id: 1,
          description: "número de celular",
        },
        {
          contact_id: 1,
          id: 1,
          phone: "11123123123",
          user_id: 1,
          description: "número de celular",
        },
      ],
    },
    {
      id: 2,
      description: "o que usa boné",
      name: "Lucas Ferrari",
      user_id: 0,
      emails: [
        { id: 2, email: "lucas@gmail.com", user_id: 3, contact_id: 3 },
        {
          id: 4,
          email: "lucas.ferrari@gmail.com",
          user_id: 4,
          contact_id: 4,
        },
      ],
      addresses: [
        {
          city: "Marília",
          contact_id: 2,
          id: 2,
          neighborhood: "Bairro Univem",
          number: "123",
          postal_code: "17452733",
          state: "sp",
          street: "Rua dos bobos",
          user_id: 3,
        },
      ],
      phones: [
        {
          contact_id: 2,
          id: 2,
          phone: "14111111111",
          user_id: 2,
          description: "número de celular",
        },
      ],
    },
  ];

  return (
    <TouchableWithoutFeedback>
      <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
        <View style={{ flex: 1, gap: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Contatos</Text>
          <View>
            <FlatList
              data={contacts}
              ItemSeparatorComponent={({}) => (
                <View style={{ padding: 8 }}>
                  <Divider />
                </View>
              )}
              renderItem={({ item, index }) => (
                <View style={{ padding: 8, gap: 16 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.primary,
                      fontWeight: "700",
                    }}
                  >
                    {item.name}
                  </Text>
                  <ContactInfos contact={item} />
                </View>
              )}
            />
          </View>
        </View>
        <IconButton
          variant="contained"
          onPress={() => {
            navigation.navigate("AddContactScreen");
          }}
          icon={<AntDesign name="plus" size={20} color="white" />}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
/**<View>
      <Text>Contatos</Text>
      <FlatList
        data={contacts}
        renderItem={({ item, index }) => (
          <View style={{ padding: 8 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View> */
