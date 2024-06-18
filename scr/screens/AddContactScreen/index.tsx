import { ScrollView, Text, View } from "react-native";
import { allStyles } from "../../styles/styles";
import Input from "../../components/Input";
import { Header } from "../../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../styles/colors";
import { useReducer, useState } from "react";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from "react-native-masked-text";
import { UserService } from "../../services/userService";
import { ContactService } from "../../services/contactService";

export default function AddContactScreen() {
  const navigation = useNavigation<any>();

  const [name, setName] = useReducer(
    //usereducer é usado para atualizar o estado da variável de maneira mais rapida que o usestate
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [description, setDescription] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [phoneNumbers, setPhoneNumbers] = useReducer(
    (_: any, value: any) => {
      return { value: value, valid: true };
    },
    { value: "", valid: false }
  );

  const [phoneDescription, setPhoneDescription] = useReducer(
    (_: any, value: any) => {
      return { value: value, valid: true };
    },
    { value: "", valid: false }
  );

  const [email, setEmail] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [cep, setCep] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [street, setStreet] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [neighborhood, setNeighborhood] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [addressNumber, setAddressNumber] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [city, setCity] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [state, setState] = useReducer(
    (_: any, value: any) => {
      const isValid = value != "";
      return { value: value, valid: isValid };
    },
    { value: "", valid: false }
  );

  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        title="ADICIONAR CONTATO"
        iconLeft={
          <AntDesign name="arrowleft" size={18} color={Colors.primary} />
        }
        onPressIconLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, padding: 20, gap: 16, paddingVertical: 16 }}>
          <Input
            required
            label="Nome"
            placeholder="Digite seu nome"
            /* error={buttonPressed && !name.valid} */ //verificando se o botão foi pressionado para não mostrar mensagens de erro antes de apertar o botão
            onChangeText={(val) => {
              setName(val);
            }}
          />
          <Input
            label="Descrição"
            placeholder="Adicione alguma descrição sobre o contato"
            multiline
            numberOfLines={7}
            textAlignVertical="top"
            onChangeText={(val) => {
              setDescription(val);
            }}
          />

          <Divider color="disabled" />

          <Text style={{ fontWeight: "600", fontSize: 16 }}>Contato</Text>
          <Input
            required
            label="Número"
            keyboardType="numeric"
            placeholder="Ex.: +55 (99) 99999-9999"
            onChangeText={(val) => {
              setPhoneNumbers(val);
            }}
          />

          <Input
            label="Descrição"
            placeholder="Ex.: Celular"
            error={buttonPressed}
            onChangeText={(val) => {
              setPhoneDescription(val);
            }}
          />

          <Input
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            error={buttonPressed}
            onChangeText={(val) => {
              setEmail(val);
            }}
          />

          <Divider color="disabled" />

          <Text style={{ fontWeight: "600", fontSize: 16 }}>Endereço</Text>
          <Input
            label="CEP"
            placeholder="Ex.: 99.999-999"
            onPressIcon={() => {
              console.log("pressionado");
            }}
            onChangeText={(val) => {
              setCep(val);
            }}
          />

          <Input
            label="Endereço"
            placeholder="Ex.: Rua Higyno Muzy Filho"
            onPressIcon={() => {
              console.log("pressionado");
            }}
            onChangeText={(val) => {
              setStreet(val);
            }}
          />

          <Input
            label="Bairro"
            placeholder="Ex.: Campus"
            onPressIcon={() => {
              console.log("pressionado");
            }}
            onChangeText={(val) => {
              setNeighborhood(val);
            }}
          />
          <Input
            label="Número"
            placeholder="Ex.: 123"
            onPressIcon={() => {
              console.log("pressionado");
            }}
            onChangeText={(val) => {
              setAddressNumber(val);
            }}
          />

          <Input
            label="Cidade"
            placeholder="Ex.: Marília"
            onPressIcon={() => {
              console.log("pressionado");
            }}
            onChangeText={(val) => {
              setCity(val);
            }}
          />
          <Input
            label="Estado"
            placeholder="Ex.: SP"
            onPressIcon={() => {
              console.log("pressionado");
            }}
            onChangeText={(val) => {
              setState(val);
            }}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button
          color="primary"
          onPress={() => {
            console.log("pressionando botão");
            setButtonPressed(true);
          }}
        >
          Adicionar
        </Button>
      </View>
    </View>
  );
}
