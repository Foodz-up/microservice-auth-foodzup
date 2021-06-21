import { ArticleType } from '../interfaces/article.interface';

export class CreateArticleDTO {
  id: number;
  name: string;
  description: string;
  type: ArticleType;
  price: number;
}
