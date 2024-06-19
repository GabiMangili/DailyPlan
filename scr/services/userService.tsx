import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env para process.env
import axios, { AxiosResponse } from "axios";

export class UserService {
  // Declaração de uma instância singleton da classe UserService
  static INSTANCE?: UserService;

  // URL base da API, obtida das variáveis de ambiente
  static API_URL: string = process.env.API_URL!;

  // Método para obter a instância singleton do UserService
  static getInstance() {
    if (!UserService.INSTANCE) UserService.INSTANCE = new UserService();
    return UserService.INSTANCE;
  }

  // Construtor privado para impedir a criação de novas instâncias fora da classe
  private constructor() {}

  // Método para registrar um novo usuário
  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      // Envia uma requisição PUT para registrar um novo usuário com os dados fornecidos
      const response: AxiosResponse = await axios.put(
        UserService.API_URL + "register",
        {
          name,
          email,
          password,
        }
      );
      // Verifica se a resposta contém uma mensagem de sucesso
      if (response.data.message) {
        console.log("Success:", response.data.message);
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      // Trata erros que ocorrerem durante a requisição
      if (axios.isAxiosError(error) && error.response) {
        const response: AxiosResponse = error.response;
        console.error("Error:", response.data.error, error);
      } else {
        console.error("Error:", error);
      }
    }
  }

  // Método para autenticar um usuário (login)
  async loginUser(email: string, password: string) {
    const loginData = { email, password };
    try {
      // Envia uma requisição POST para autenticar o usuário com os dados fornecidos
      const response = await axios.post(
        UserService.API_URL + "login",
        loginData
      );
      // Obtém o token de autenticação dos headers da resposta
      const token = response.headers.authentication;
      console.log(token);
      console.log("Login successful");
    } catch (error) {
      // Trata erros que ocorrerem durante a requisição
      console.error("Error response data:", error);
    }
  }

  // Método para buscar informações de um usuário autenticado
  async fetchUser(userId: number, token: string) {
    const requestData = {
      user: { id: userId },
    };
    try {
      // Envia uma requisição POST para obter dados do usuário autenticado
      const response = await axios.post(
        UserService.API_URL + "auth/user",
        requestData,
        { headers: { Authentication: token } } // Inclui o token de autenticação nos headers
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Trata erros que ocorrerem durante a requisição
      console.error("Error message:", error);
    }
  }

  // Método para deletar um usuário autenticado
  async deleteUser(userId: number, token: string) {
    const requestData = {
      user: { id: userId },
    };
    try {
      // Envia uma requisição DELETE para deletar o usuário autenticado
      const response = await axios.delete(UserService.API_URL + "auth/user", {
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          Authentication: token, // Inclui o token de autenticação nos headers
        },
      });
      console.log("Success:", response.data);
    } catch (error) {
      // Trata erros que ocorrerem durante a requisição
      console.error("Error message:", error);
    }
  }
}
