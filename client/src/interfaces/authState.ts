export interface AuthState {
  userData: UserDataType | null;
}

interface UserDataType {
  id: string;
  name: string;
  email: string;
}


