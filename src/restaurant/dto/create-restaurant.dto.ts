import { RestaurantType } from '../interfaces/restaurant.interface';

export class CreateRestaurantDTO {
  id: number;
  name: string;
  type: RestaurantType;
  articles: Array<any>;
  menus: Array<any>;
  avaibilities: Array<any>;
  picture: string;
  address: string;
  editors: Array<any>;
}
