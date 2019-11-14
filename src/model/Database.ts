export type SecretIdentifier = string;

export interface Secret {
  id: SecretIdentifier;
  name: string;
  description?: string;
  icon?: string;
  note?: string;
}

export interface UsernamePasswordSecret extends Secret {
  username: string;
  password: string;
  url?: string;
}

export interface TokenSecret extends Secret {
  token: string;
  url?: string;
}

export interface GroupSecret extends Secret {
  members: SecretIdentifier[];
}

export interface Database {
  secrets: Secret[];
  root: SecretIdentifier;
}
