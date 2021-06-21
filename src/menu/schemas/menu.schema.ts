import * as mongoose from 'mongoose';

export const MenuSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  articles: [],
  price: Number,
  picture: String,
});
