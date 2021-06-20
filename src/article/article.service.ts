import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IArticle } from './interfaces/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article')
    private readonly articleModel: Model<IArticle>,
  ) {}
  // fetch all article
  async getAllArticle(): Promise<IArticle[]> {
    const article = await this.articleModel.find().exec();
    return article;
  }
  // Get a single customer
  async getArticle(customerID): Promise<IArticle> {
    const customer = await this.articleModel.findById(customerID).exec();
    return customer;
  }
  // post a single customer
  async addArticle(createArticleDTO: CreateArticleDTO): Promise<IArticle> {
    const newArticle = await new this.articleModel(createArticleDTO);
    return newArticle.save();
  }
  // Edit customer details
  async updateArticle(
    customerID,
    createArticleDTO: CreateArticleDTO,
  ): Promise<IArticle> {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(
      customerID,
      createArticleDTO,
      { new: true },
    );
    return updatedArticle;
  }
  // Delete a customer
  async deleteArticle(customerID): Promise<any> {
    const deletedArticle = await this.articleModel.findByIdAndRemove(
      customerID,
    );
    return deletedArticle;
  }
}
