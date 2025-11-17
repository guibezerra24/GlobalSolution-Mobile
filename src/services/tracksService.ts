// src/services/tracksService.ts
import api from './api';
import { Track } from '../types/Track';

const RESOURCE = '/tracks';

export const tracksService = {
  async list(): Promise<Track[]> {
    const response = await api.get<Track[]>(RESOURCE);
    return response.data;
  },

  async getById(id: string): Promise<Track> {
    const response = await api.get<Track>(`${RESOURCE}/${id}`);
    return response.data;
  },

  async create(payload: Omit<Track, 'id' | 'createdAt' | 'updatedAt'>): Promise<Track> {
    const response = await api.post<Track>(RESOURCE, payload);
    return response.data;
  },

  async update(id: string, payload: Partial<Track>): Promise<Track> {
    const response = await api.put<Track>(`${RESOURCE}/${id}`, payload);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${RESOURCE}/${id}`);
  },
};
