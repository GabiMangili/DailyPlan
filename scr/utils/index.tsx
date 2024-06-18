import { Contact } from "../models";

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(
      2,
      6
    )}-${cleaned.substring(6)}`;
  } else if (cleaned.length === 11) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(
      2,
      7
    )}-${cleaned.substring(7)}`;
  } else {
    return phoneNumber;
  }
}

export const contacts: Contact[] = [
  //variável fixa
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
