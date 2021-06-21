import { Document } from 'mongoose';

export enum RestaurantType {
  'FASTFOOD' = 'Fastfood',
  'KEBAB' = 'Kebab',
}

export interface IRestaurant extends Document {
  id: number;
  name: string;
  // TODO: update to enum
  type: string;
  articles: Array<any>;
  menus: Array<any>;
  avaibilities: Array<any>;
  picture: string;
  address: string;
  editors: Array<any>;
}
