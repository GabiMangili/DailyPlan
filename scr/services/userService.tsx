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
