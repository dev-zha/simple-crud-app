import useSWR from 'swr';
import { getPostList } from '@/services/network/posts';

export const swrKey = (page: number) => ['posts', page];

export function usePosts(page: number) {
  return useSWR(swrKey(page), ([, page]) => getPostList(page as number));
}
