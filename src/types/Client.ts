export interface Client {
  IdClient?: number;
  Code?: string;
  Username: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Document: string;
  DocumentType: string;
  MaritalStatus: string;
  Gender: string;
  Address: string;
  Whatsapp: string;
  Mail: string;
  BirthDate: string;
  Note?: string;
  Image?: string;
}

export interface ErrorMessages {
  FirstName: string | null;
  LastName: string | null;
  Address: string | null;
  MaritalStatus: string | null;
  Gender: string | null;
  DocumentType: string | null;
  Document: string | null;
  BirthDate: string | null;
  Mail: string | null;
  PhoneNumber: string | null;
  Whatsapp: string | null;
  Note: string | null;
}