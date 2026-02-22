import { Role } from '../enums/role.enum';

export interface User {
  userId: string;
  username: string;
  password: string; // ในโปรเจกต์จริงควร hash ก่อนเก็บเสมอ
  email: string;
  role: Role;
}