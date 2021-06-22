import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMenu } from './interfaces/menu.interface';
import { CreateMenuDTO } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel('Menu')
    private readonly menuModel: Model<IMenu>,
  ) {}
  // fetch all menu
  async getAllMenu(): Promise<IMenu[]> {
    const menu = await this.menuModel.find().exec();
    return menu;
  }
  // Get a single customer
  async getMenu(customerID): Promise<IMenu> {
    const customer = await this.menuModel.findById(customerID).exec();
    return customer;
  }
  // post a single customer
  async addMenu(createMenuDTO: CreateMenuDTO): Promise<IMenu> {
    const newMenu = await new this.menuModel(createMenuDTO);
    return newMenu.save();
  }
  // Edit customer details
  async updateMenu(customerID, createMenuDTO: CreateMenuDTO): Promise<IMenu> {
    const updatedMenu = await this.menuModel.findByIdAndUpdate(
      customerID,
      createMenuDTO,
      { new: true },
    );
    return updatedMenu;
  }
  // Delete a customer
  async deleteMenu(customerID): Promise<any> {
    const deleteMenu = await this.menuModel.findByIdAndRemove(customerID);
    return deleteMenu;
  }
}
