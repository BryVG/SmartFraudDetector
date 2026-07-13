
// metadata.service.ts

import { api } from "./api";

export const metadataService = {
  get: async (entity: string) => {
    const { data } = await api.get(`/metadata/${entity}`);
    return data;
  },
};