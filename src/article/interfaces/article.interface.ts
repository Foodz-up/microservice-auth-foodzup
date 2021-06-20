import { Document } from 'mongoose';

export enum ArticleType {
  'VIANDE' = 'Viande',
  'LEGUME' = 'Légumes',
}

export interface IArticle extends Document {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
}