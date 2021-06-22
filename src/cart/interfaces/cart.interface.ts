import { Document } from 'mongoose';

export interface ICart extends Document {
  id: number;
  articles: [];
  price: number;
}
