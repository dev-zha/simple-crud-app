import useSWR from 'swr';
import { getPostById } from '@/services/network/posts';

export const swrKey = (id: number) => ['post', id];

export function usePost(id: number | null) {
  return useSWR(id ? swrKey(id) : null, ([, id]) => getPostById(id as number));
}
