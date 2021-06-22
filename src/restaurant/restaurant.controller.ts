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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  // add a restaurant
  @Post()
  async addRestaurant(
    @Res() res,
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ) {
    const restaurant = await this.restaurantService.addRestaurant(
      createRestaurantDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Restaurant has been created successfully',
      restaurant,
    });
  }

  // Retrieve restaurants list
  @Get()
  async getAllRestaurant(@Res() res) {
    const restaurants = await this.restaurantService.getAllRestaurant();
    return res.status(HttpStatus.OK).json(restaurants);
  }

  // Fetch a particular restaurant using ID
  @Get('/:id')
  async getRestaurant(@Res() res, @Param('id') id) {
    const restaurant = await this.restaurantService.getRestaurant(id);
    if (!restaurant) throw new NotFoundException('Restaurant does not exist!');
    return res.status(HttpStatus.OK).json(restaurant);
  }

  @Put('/:id')
  async updateRestaurant(
    @Res() res,
    @Param('id') id,
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ) {
    const restaurant = await this.restaurantService.updateRestaurant(
      id,
      createRestaurantDTO,
    );
    if (!restaurant) throw new NotFoundException('Restaurant does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Restaurant has been successfully updated',
      restaurant,
    });
  }

  // Delete a restaurant
  @Delete('/:id')
  async deleteRestaurant(@Res() res, @Param('id') restaurantID) {
    const restaurant = await this.restaurantService.deleteRestaurant(
      restaurantID,
    );
    if (!restaurant) throw new NotFoundException('Restaurant does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Restaurant has been deleted',
      restaurant,
    });
  }
}
