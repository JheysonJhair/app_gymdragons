export interface User {
  IdUser?: number;
  Code: string;
  UserName?: string;
  Password?: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Dni?: string;
  Access?: string | boolean;
  Mail?: string;
  BirthDate: string;
  Image?: string;
  RoleId?: number;
}

export interface ErrorMessages {
  UserName?: string | null;
  Password?: string | null;
  FirstName: string | null;
  LastName: string | null;
  PhoneNumber: string | null;
  Dni?: string | null;
  Access?: string | null | boolean;
  Mail?: string | null;
  BirthDate?: string | null;
  RoleId: number | null;
}

export interface Login {
  UserName: string;
  Password: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
