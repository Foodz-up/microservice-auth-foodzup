import * as mongoose from 'mongoose';

enum ArticleType {
  'VIANDE' = 'Viande',
  'LEGUME' = 'Légumes',
}

export const ArticleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  // TODO: update to enum
  type: String,
  price: Number,
});
