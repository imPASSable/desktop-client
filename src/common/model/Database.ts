export type SecretIdentifier = string;

export type SecretUri = string;

export interface Secret {
  id: SecretIdentifier;
  name: string;
  description?: string;
  icon?: string;
  note?: string;
}

interface SecretWithUri extends Secret {
  uri?: SecretUri;
}

export interface UsernamePasswordSecret extends SecretWithUri {
  username: string;
  password: string;
}

export interface TokenSecret extends SecretWithUri {
  token: string;
}

export interface GroupSecret extends Secret {
  members: SecretIdentifier[];
}

export interface Database {
  secrets: Secret[];
  root: SecretIdentifier;
}
