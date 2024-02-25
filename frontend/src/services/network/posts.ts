import { PaginationMeta, Post } from '@/types';
import api from './axiosInstance';
import { AxiosResponse } from 'axios';

export type PagiAxiosResponse = AxiosResponse & {
  meta : PaginationMeta
};

export const getPostList = async (page: number):Promise<PagiAxiosResponse> => {
  return await api.get(`/posts?page=${page}`);
};

export const getPostById = async (id: number) => {
  return await api.get(`/posts/${id}`);
};

export const createPost = async (data: Omit<Post, 'id' | 'userId'>) => {
  return await api.post(`/posts`, data);
};

export const updatePost = async (
  id: number,
  data: Omit<Post, 'id' | 'userId'>
) => {
  return await api.put(`/posts/${id}`, data);
};

export const deletePost = async (id: number) => {
  return await api.delete(`/posts/${id}`);
};
