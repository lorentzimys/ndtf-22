export class SignUpDTO {
  login: string;
  email: string;
  firstName: string;
  password: string;
}

export class SignInDTO {
  login?: string;
  email?: string;
  password: string;
}
