export interface AuthUser {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export interface PaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  searchKeyword: string;
}
