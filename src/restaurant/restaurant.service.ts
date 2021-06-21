import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IRestaurant } from './interfaces/restaurant.interface';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<IRestaurant>,
  ) {}
  // fetch all restaurant
  async getAllRestaurant(): Promise<IRestaurant[]> {
    const restaurant = await this.restaurantModel.find().exec();
    return restaurant;
  }
  // Get a single customer
  async getRestaurant(customerID): Promise<IRestaurant> {
    const customer = await this.restaurantModel.findById(customerID).exec();
    return customer;
  }
  // post a single customer
  async addRestaurant(
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<IRestaurant> {
    const newRestaurant = await new this.restaurantModel(createRestaurantDTO);
    return newRestaurant.save();
  }
  // Edit customer details
  async updateRestaurant(
    customerID,
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<IRestaurant> {
    const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(
      customerID,
      createRestaurantDTO,
      { new: true },
    );
    return updatedRestaurant;
  }
  // Delete a customer
  async deleteRestaurant(customerID): Promise<any> {
    const deletedRestaurant = await this.restaurantModel.findByIdAndRemove(
      customerID,
    );
    return deletedRestaurant;
  }
}
