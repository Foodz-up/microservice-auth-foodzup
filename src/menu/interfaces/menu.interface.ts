import { Document } from 'mongoose';

export interface IMenu extends Document {
  id: number;
  name: string;
  description: string;
  articles: [];
  price: number;
  picture: string;
}
