import * as mongoose from 'mongoose';

enum ArticleType {
  'VIANDE' = 'Viande',
  'LEGUME' = 'Légumes',
}

export const ArticleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  type: ArticleType,
  price: Number,
});
