import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  // add an article
  @Post()
  async addArticle(@Res() res, @Body() CreateArticleDTO: CreateArticleDTO) {
    const article = await this.articleService.addArticle(CreateArticleDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Article has been created successfully',
      article,
    });
  }

  // Retrieve articles list
  @Get()
  async getAllArticle(@Res() res) {
    const articles = await this.articleService.getAllArticle();
    return res.status(HttpStatus.OK).json(articles);
  }

  // Fetch a particular article using ID
  @Get('/:id')
  async getArticle(@Res() res, @Param('id') id) {
    const article = await this.articleService.getArticle(id);
    if (!article) throw new NotFoundException('Article does not exist!');
    return res.status(HttpStatus.OK).json(article);
  }

  @Put('/:id')
  async updateArticle(
    @Res() res,
    @Param('id') id,
    @Body() createArticleDTO: CreateArticleDTO,
  ) {
    const article = await this.articleService.updateArticle(
      id,
      createArticleDTO,
    );
    if (!article) throw new NotFoundException('Article does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Article has been successfully updated',
      article,
    });
  }

  // Delete a article
  @Delete('/:id')
  async deleteArticle(@Res() res, @Query('articleID') articleID) {
    const article = await this.articleService.deleteArticle(articleID);
    if (!article) throw new NotFoundException('article does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Article has been deleted',
      article,
    });
  }
}
