import { Document } from 'mongoose';

export enum OrderState {
  'VALIDE' = 'Validé',
  'ENCOURS' = 'En cours',
}

export interface IOrder extends Document {
  id: number;
  orderNumber: number;
  price: number;
  articles: [];
  restaurant: Array<any>;
  driver: Array<any>;
  state: string;
}
