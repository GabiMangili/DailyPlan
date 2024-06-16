import dotenv from "dotenv";
dotenv.config();
import axios, { AxiosResponse } from "axios";

export class UserService {
  static INSTANCE?: UserService;
  static API_URL: string = process.env.API_URL!;

  static getInstance() {
    if (!UserService.INSTANCE) UserService.INSTANCE = new UserService();
    return UserService.INSTANCE;
  }
  private constructor() {}

  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(
        UserService.API_URL + "register",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      if (response.data.message) {
        console.log("Success:", response.data.message);
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const response: AxiosResponse = error.response;
        console.error("Error:", response.data.error, error);
      } else {
        console.error("Error:", error);
      }
    }
  }

  async loginUser(email: string, password: string) {
    const loginData = { email, password };
    try {
      const response = await axios.post(
        process.env.API_URL + "login",
        loginData
      );
      const token = response.headers.authentication;
      // localStorage.setItem('TOKEN', token)
      console.log(token);
      console.log("Login successful");
    } catch (error) {
      console.error("Error response data:", error);
    }
  }

  async fetchUser(userId: number, token: string) {
    const requestData = {
      user: { id: userId },
    };
    try {
      const response = await axios.post(
        process.env.API_URL + "auth/user",
        requestData,
        { headers: { Authentication: token } }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error message:", error);
    }
  }

  async deleteUser(userId: number, token: string) {
    const requestData = {
      user: { id: userId },
    };
    try {
      const response = await axios.delete(process.env.API_URL + "auth/user", {
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error message:", error);
    }
  }
}

export class ContactService {
  static INSTANCE?: ContactService;
  static API_URL: string = process.env.API_URL!;

  static getInstance() {
    if (!ContactService.INSTANCE)
      ContactService.INSTANCE = new ContactService();
    return ContactService.INSTANCE;
  }

  private constructor() {}

  async fetchContacts(userId: number, token: string) {
    const requestData = { user: { id: userId } };
    try {
      const response = await axios.post(
        process.env.API_URL + "auth/contact",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
        }
      );
      console.log("Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error message:", error);
    }
  }

  async fetchContactById(contactId: number, userId: number, token: string) {
    const url = process.env.API_URL + `auth/contact/${contactId}`;
    const requestBody = { user: { id: userId } };
    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao recuperar contato:", error);
    }
  }

  async insertContact(
    name: string,
    description: string,
    userId: number,
    token: string
  ) {
    const requestData = {
      name,
      description,
      user: { id: userId },
    };
    try {
      const response = await axios.put(
        process.env.API_URL + "auth/contact",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
        }
      );

      console.log("Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error message:", error);
    }
  }

  async updateContactById(
    contactId: number,
    userId: number,
    name: string,
    description: string,
    token: string
  ) {
    const url = process.env.API_URL + `auth/contact/${contactId}`;
    const requestData = {
      user: { id: userId },
      name,
      description,
    };
    try {
      const response = await axios.patch(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
    }
  }

  async deleteContactById(contactId: number, userId: number, token: string) {
    const url = process.env.API_URL + `auth/contact/${contactId}`;
    try {
      const response = await axios.delete(url, {
        headers: { Authentication: token },
        data: { user: { id: userId } },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
    }
  }

  async deleteContact(contactId: number, userId: number, token: string) {
    const url = `${process.env.API_URL}main/contact/${contactId}`;
    try {
      const response = await axios.delete(url, {
        data: {
          user: {
            id: userId,
          },
        },
        headers: {
          Authentication: token,
          "Content-Type": "application/json",
        },
      });
      console.log("Contato deletado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
    }
  }

  async fetchContactDetails(userId: number, contactId: number, token: string) {}
}

export class EmailService {
  static INSTANCE?: EmailService;
  static API_URL: string = process.env.API_URL!;

  static getInstance() {
    if (!EmailService.INSTANCE) EmailService.INSTANCE = new EmailService();
    return EmailService.INSTANCE;
  }

  private constructor() {}

  async getEmailById(
    contactId: number,
    emailId: number,
    userId: number,
    token: string
  ) {
    const url =
      process.env.API_URL + `auth/contact/${contactId}/email/${emailId}`;
    try {
      const response = await axios.post(
        url,
        { user: { id: userId } },
        { headers: { Authentication: token } }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao recuperar email:", error);
    }
  }

  async getAllEmails(contactId: number, userId: number, token: string) {
    const url = process.env.API_URL + `auth/contact/${contactId}/email`;

    try {
      const response = await axios.post(
        url,
        {
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao recuperar emails:", error);
    }
  }

  async insertEmail(
    email: string,
    contactId: number,
    userId: number,
    token: string
  ) {
    const url = process.env.API_URL + `auth/contact/${contactId}/email`;

    try {
      const response = await axios.put(
        url,
        {
          email,
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao inserir email:", error);
    }
  }

  async updateEmail(
    email: string,
    contactId: number,
    emailId: number,
    userId: number,
    token: string
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/email/${emailId}`;

    try {
      const response = await axios.patch(
        url,
        {
          email,
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar email:", error);
    }
  }

  async deleteEmail(
    contactId: number,
    emailId: number,
    userId: number,
    token: string
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/email/${emailId}`;

    try {
      const response = await axios.delete(url, {
        data: {
          user: {
            id: userId,
          },
        },
        headers: {
          Authentication: token,
          "Content-Type": "application/json",
        },
      });

      console.log("Email deletado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar email:", error);
      throw error;
    }
  }
}

export class AddressService {
  static INSTANCE?: AddressService;
  static API_URL: string = process.env.API_URL!;

  static getInstance() {
    if (!AddressService.INSTANCE)
      AddressService.INSTANCE = new AddressService();
    return AddressService.INSTANCE;
  }

  private constructor() {}

  async getAddressById(
    contactId: number,
    addressId: number,
    userId: number,
    token: string
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/address/${addressId}`;

    try {
      const response = await axios.post(
        url,
        {
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Endereço recebido com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao recuperar endereço:", error);
    }
  }

  async getAllAddresses(contactId: number, userId: number, token: string) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/address`;

    try {
      const response = await axios.post(
        url,
        {
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Endereços recebidos com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao recuperar endereços:", error);
    }
  }

  async addAddress(
    contactId: number,
    userId: number,
    token: string,
    address: any
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/address`;

    try {
      const response = await axios.put(
        url,
        {
          street: address.street,
          number: address.number,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zipcode: address.zipcode,
          user_id: userId,
          contact_id: contactId,
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Endereço criado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar endereço:", error);
    }
  }

  async updateAddress(
    contactId: number,
    addressId: number,
    userId: number,
    token: string,
    address: any
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/address/${addressId}`;

    try {
      const response = await axios.patch(
        url,
        {
          street: address.street,
          number: address.number,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zipcode: address.zipcode,
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Endereço atualizado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
    }
  }

  async deleteAddress(
    contactId: number,
    addressId: number,
    userId: number,
    token: string
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/address/${addressId}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Authentication: token,
        },
        data: {
          user: {
            id: userId,
          },
        },
      });

      console.log("Endereço deletado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar endereço:", error);
    }
  }
}

export class PhoneService {
  static INSTANCE?: PhoneService;
  static API_URL: string = process.env.API_URL!;

  static getInstance() {
    if (!PhoneService.INSTANCE) PhoneService.INSTANCE = new PhoneService();
    return PhoneService.INSTANCE;
  }

  private constructor() {}

  async getPhone(
    contactId: number,
    phoneId: number,
    userId: number,
    token: string
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/phone/${phoneId}`;

    try {
      const response = await axios.post(
        url,
        {
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Telefone recebido com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao recuperar telefone:", error);
    }
  }

  async getAllPhones(contactId: number, userId: number, token: string) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/phone`;

    try {
      const response = await axios.post(
        url,
        {
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Telefones recebidos com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao recuperar telefones:", error);
      throw error;
    }
  }

  async insertPhone(
    number: string,
    description: string,
    contactId: number,
    userId: number,
    token: string
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/phone`;
    try {
      const response = await axios.put(
        url,
        {
          number,
          description,
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Telefone criado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar telefone:", error);
    }
  }

  async updatePhone(
    id: number,
    number: string,
    description: string,
    contactId: number,
    userId: number,
    token: string
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/phone/${id}`;

    try {
      const response = await axios.patch(
        url,
        {
          number,
          description,
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authentication: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Telefone atualizado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar telefone:", error);
    }
  }

  async deletePhone(
    phoneId: number,
    contactId: number,
    userId: number,
    token: string
  ) {
    const url = `${process.env.API_URL}auth/contact/${contactId}/phone/${phoneId}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Authentication: token,
        },
      });

      console.log("Telefone deletado com sucesso");
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar telefone:", error);
    }
  }
}
