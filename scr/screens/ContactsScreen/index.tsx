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
import { contacts } from "../../utils";

export default function ContactsScreen() {
  const navigation = useNavigation<any>();

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
