export class CreateUserDto {
  username: string;
  email: string;
  password_hash: string;
  steam_id?: string;
  profile_url?: string;
  balance?: number;
}
