import * as mongoose from 'mongoose';

enum OrderState {
  'VALIDE' = 'Validé',
  'ENCOURS' = 'En cours',
}

export const OrderSchema = new mongoose.Schema({
  id: Number,
  orderNumber: Number,
  price: Number,
  articles: [],
  restaurant: Object,
  driver: Object,
  delivery: Object,
  state: String,
});
