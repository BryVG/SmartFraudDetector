import { api } from "./api";
//fazer a tipagem dos dados de retorno e dos payloads

export const createCrudService = (endpoint: string) => ({
  getAll: async () => {
    const { data } = await api.get(`/${endpoint}`);
    return data;
  },
  getById: async (id: number |string) => {
    const { data } = await api.get(`/${endpoint}/${id}`);
    return data;
  }
});
  create: async (endpoint: string,payload: any) => {
    const { data } = await api.post(`/${endpoint}`, payload);
    return data;
  }
  update: async (id: number |string, payload: any, endpoint: string) => {
    const { data } = await api.put(`/${endpoint}/${id}`, payload);
    return data;
  }
  remove: async (id: string, endpoint: string) => {
    const { data } = await api.delete(`/${endpoint}/${id}`);
    return data;
  }