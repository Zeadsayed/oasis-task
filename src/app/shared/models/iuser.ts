import { FormControl } from "@angular/forms";

export interface IUser {
  email?: FormControl<string | null>;
  username?: FormControl<string | null>;
  password?: FormControl<string | null>;
}

export interface LoginResponse {
  token?: string;
}

export interface UserAccess {
  token?: string;
  email?: string;
  name?: string;
}
