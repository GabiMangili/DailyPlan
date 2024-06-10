import { Text, View } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { formatPhoneNumber } from "../../utils";
import TouchableCustom from "../TouchableCustom";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";

interface BlockInforOs {
  gap?: 8 | 16 | 24;
  infos: {
    label: string;
    value: string | undefined | null | string[];
    copy?: boolean;
    mask?: "phone" | "cpf" | "obscureCpf"; // ainda não implementados
  }[];
  onCopy?: Function;
}

export default function InfosOsBlock({ onCopy, infos, gap = 8 }: BlockInforOs) {
  return (
    <View style={{ gap: 16, paddingHorizontal: 5 }}>
      {infos.length == 0 ? (
        <Text>-</Text>
      ) : (
        <View style={{ gap }}>
          {infos.map((item, index) => {
            const valueItem = Array.isArray(item.value)
              ? item.value
              : [item.value];

            const copyValue = item.copy === true ? true : false;

            return (
              <View key={index} style={{}}>
                <Text style={{ fontWeight: "600", fontSize: 15 }}>
                  {item.label}
                </Text>
                <View>
                  {valueItem.map((val, itemId) => {
                    const copyToClipboard = () => {
                      if (val) {
                        Clipboard.setString(val);
                        onCopy && onCopy();
                      }
                    };
                    const finalTextValue = val
                      ? item.mask === "phone"
                        ? formatPhoneNumber(val)
                        : val
                      : val;

                    return (
                      <View
                        key={itemId}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <View style={{ flexShrink: 1 }}>
                          <Text>
                            {!!!finalTextValue ? "-" : finalTextValue}
                          </Text>
                        </View>
                        <TouchableCustom
                          style={{ padding: 8 }}
                          onPress={() => {
                            copyToClipboard();
                            console.log("copiado");
                          }}
                        >
                          {copyValue && !!finalTextValue && (
                            <Feather
                              name="copy"
                              size={16}
                              color={Colors.primary}
                            />
                          )}
                        </TouchableCustom>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
