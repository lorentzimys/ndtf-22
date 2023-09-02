export class SignUpDTO {
  login: string;
  email: string;
  firstName: string;
  password: string;
}

export class SignInDTO {
  email?: string;
  password: string;
}
