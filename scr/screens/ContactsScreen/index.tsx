import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Contact } from "../../Models";

export default function ContactsScreen() {
  const contcts: Contact[] = [
    {
      id: 1,
      description: "menina chata",
      name: "Gabriela Mangili",
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
      ],
    },
  ];
  return (
    <View>
      <Text>Contatos</Text>
      <FlatList data={} renderItem={} />
    </View>
  );
}
