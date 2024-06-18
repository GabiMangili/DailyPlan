import dotenv from "dotenv";
dotenv.config();
import axios, { AxiosResponse } from "axios";

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
