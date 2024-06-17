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

export default function AddContactScreen() {
  const navigation = useNavigation<any>();

  const [name, setName] = useReducer(
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

  const [emails, setemails] = useReducer(
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
            errorMessage={"Campo obrigatório"}
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
            onChangeText={(val) => {}}
            onPressIcon={() => {
              console.log("pressionado");
            }}
          />

          <Divider color="disabled" />

          <Text style={{ fontWeight: "600", fontSize: 16 }}>Contato</Text>
          <Input
            required
            label="Número"
            placeholder="Ex.: +55 (99) 99999-9999"
            onChangeText={(val) => {}}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Input
              required
              label="Descrição"
              placeholder="Ex.: Celular"
              error={buttonPressed}
              onChangeText={(val) => {}}
            />
          </View>

          <Input
            required
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            error={buttonPressed}
            onChangeText={(val) => {}}
          />

          <Divider color="disabled" />

          <Text style={{ fontWeight: "600", fontSize: 16 }}>Endereço</Text>
          <Input
            required
            label="CEP"
            placeholder="Ex.: 99.999-999"
            onPressIcon={() => {
              console.log("pressionado");
            }}
            onChangeText={(val) => {}}
          />

          <Input
            required
            label="Endereço"
            placeholder="Ex.: Rua Higyno Muzy Filho"
            onPressIcon={() => {
              console.log("pressionado");
            }}
            onChangeText={(val) => {}}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Input
              required
              label="Bairro"
              placeholder="Ex.: Campus"
              onPressIcon={() => {
                console.log("pressionado");
              }}
              onChangeText={(val) => {}}
            />
            <Input
              required
              label="Número"
              placeholder="Ex.: 123"
              onPressIcon={() => {
                console.log("pressionado");
              }}
              onChangeText={(val) => {}}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Input
              required
              label="Cidade"
              placeholder="Ex.: Marília"
              onPressIcon={() => {
                console.log("pressionado");
              }}
              onChangeText={(val) => {}}
            />
            <Input
              required
              label="Estado"
              placeholder="Ex.: SP"
              onPressIcon={() => {
                console.log("pressionado");
              }}
              onChangeText={(val) => {}}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button
          color="primary"
          onPress={() => {
            console.log("pressionando botão");
            setButtonPressed(true);
            navigation.navigate("RegisterScreen");
          }}
        >
          Adicionar
        </Button>
      </View>
    </View>
  );
}
