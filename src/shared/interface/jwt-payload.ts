import { Types } from 'mongoose';

export interface JwtPayload {
  id: string;
  name: string;
  roles: Types.ObjectId;
  iat?: number;
  exp?: number;
}
