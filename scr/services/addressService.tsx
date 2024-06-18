import dotenv from "dotenv";
dotenv.config();
import axios, { AxiosResponse } from "axios";

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
