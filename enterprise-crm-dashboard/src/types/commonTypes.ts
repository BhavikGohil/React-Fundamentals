export interface ApiError {
  message: string;
  status?: number;
}

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}