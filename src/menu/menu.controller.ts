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
import { MenuService } from './menu.service';
import { CreateMenuDTO } from './dto/create-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  // add a menu
  @Post()
  async addMenu(@Res() res, @Body() createMenuDTO: CreateMenuDTO) {
    const menu = await this.menuService.addMenu(createMenuDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Menu has been created successfully',
      menu,
    });
  }

  // Retrieve menu list
  @Get()
  async getAllMenu(@Res() res) {
    const menu = await this.menuService.getAllMenu();
    return res.status(HttpStatus.OK).json(menu);
  }

  // Fetch a particular menu using ID
  @Get('/:id')
  async getMenu(@Res() res, @Param('id') id) {
    const menu = await this.menuService.getMenu(id);
    if (!menu) throw new NotFoundException('Menu does not exist!');
    return res.status(HttpStatus.OK).json(menu);
  }

  @Put('/:id')
  async updateMenu(
    @Res() res,
    @Param('id') id,
    @Body() createMenuDTO: CreateMenuDTO,
  ) {
    const menu = await this.menuService.updateMenu(id, createMenuDTO);
    if (!menu) throw new NotFoundException('Menu does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Menu has been successfully updated',
      menu,
    });
  }

  // Delete a menu
  @Delete('/:id')
  async deleteMenu(@Res() res, @Query('menuID') menuID) {
    const menu = await this.menuService.deleteMenu(menuID);
    if (!menu) throw new NotFoundException('Menu does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Menu has been deleted',
      menu,
    });
  }
}
