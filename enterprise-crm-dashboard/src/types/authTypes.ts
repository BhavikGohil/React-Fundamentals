export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser{
    id:string;
    name:string;
    email:string;
}
export interface AuthState{
    user:AuthUser | null;
    token:string | null;
    loading:boolean;
    error: string | null;
}