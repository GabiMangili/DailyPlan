import { View } from "react-native";
import InfosOsBlock from "../ContactItem";
import { Contact } from "../../models";

interface ContactInfoProps {
  contact: Contact;
}
export default function ContactInfos({ contact }: ContactInfoProps) {
  return (
    <View>
      <InfosOsBlock
        onCopy={() => {
          //onCopy();
        }}
        infos={[
          {
            label: "Telefones",
            value: contact.phones?.map((phone) => {
              return phone.phone;
            }),
            copy: true,
            mask: "phone",
          },
          {
            label: "E-mails",
            value: contact.emails?.map((email) => {
              return email.email;
            }),
          },
        ]}
      />
    </View>
  );
}
