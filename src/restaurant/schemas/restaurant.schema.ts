import * as mongoose from 'mongoose';

enum RestaurantType {
  'FASTFOOD' = 'Fastfood',
  'KEBAB' = 'Kebab',
}

export const RestaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  // TODO: update to enum
  type: String,
  articles: [],
  menus: [],
  avaibilities: [],
  picture: String,
  address: String,
  editors: [],
});
