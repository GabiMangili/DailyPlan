/*
    - Interfaces TypeScript que representam as estruturas de dados usadas na aplicação.
    - Essas interfaces ajudam a garantir a consistência e a segurança de tipo ao manipular 
    - dados relacionados a usuários, contatos, endereços, e-mails, telefones e logs. 
*/
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  contacts?: Contact[];
}

export interface Contact {
  id: number;
  name: string;
  description: string;
  user_id: number;
  emails?: Email[];
  phones?: Phone[];
  addresses?: Address[];
}

export interface Address {
  id: number;
  street: string;
  number: string;
  neighborhood: string;
  postal_code: string;
  city: string;
  state: string;
  contact_id: number;
  user_id: number;
}

export interface Email {
  id: number;
  email: string;
  contact_id: number;
  user_id: number;
}

export interface Log {
  id: number;
  message: string;
  date: Date;
}

export interface Phone {
  id: number;
  phone: string;
  description?: string;
  contact_id: number;
  user_id: number;
}
