import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICart } from './interfaces/cart.interface';
import { CreateCartDTO } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<ICart>,
  ) {}
  // fetch all cart
  async getAllCart(): Promise<ICart[]> {
    const cart = await this.cartModel.find();
    return cart;
  }
  // Get a single customer
  async getCart(customerID): Promise<ICart> {
    const customer = await this.cartModel.findOne({ id: customerID });
    return customer;
  }
  // post a single customer
  async addCart(createCartDTO: CreateCartDTO): Promise<ICart> {
    const newCart = await new this.cartModel(createCartDTO);
    return newCart.save();
  }
  // Edit customer details
  async updateCart(customerID, createCartDTO: CreateCartDTO): Promise<ICart> {
    const updatedCart = await this.cartModel.findOneAndUpdate(
      customerID,
      createCartDTO,
      { new: true },
    );
    return updatedCart;
  }
  // Delete a customer
  async deleteCart(customerID): Promise<any> {
    const deleteCart = await this.cartModel.findOneAndRemove(customerID);
    return deleteCart;
  }
}
