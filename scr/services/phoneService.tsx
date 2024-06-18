import dotenv from "dotenv";
dotenv.config();
import axios, { AxiosResponse } from "axios";

export class PhoneService {
  static INSTANCE?: PhoneService;
  static API_URL: string = process.env.API_URL!;

  static getInstance() {
    //pegar a instancia única
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
