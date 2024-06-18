import dotenv from "dotenv";
dotenv.config();
import axios, { AxiosResponse } from "axios";

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
