import { User } from './user.interface';

export interface Participant extends User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: Date;
}