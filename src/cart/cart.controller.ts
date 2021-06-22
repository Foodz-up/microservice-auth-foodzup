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
import { CartService } from './cart.service';
import { CreateCartDTO } from './dto/create-cart.dto';

@Controller('carts')
export class CartController {
  constructor(private cartService: CartService) {}

  // add a cart
  @Post()
  async addCart(@Res() res, @Body() createCartDTO: CreateCartDTO) {
    const cart = await this.cartService.addCart(createCartDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Cart has been created successfully',
      cart,
    });
  }

  // Retrieve cart list
  @Get()
  async getAllCart(@Res() res) {
    const cart = await this.cartService.getAllCart();
    return res.status(HttpStatus.OK).json(cart);
  }

  // Fetch a particular cart using ID
  @Get('/:id')
  async getCart(@Res() res, @Param('id') id) {
    const cart = await this.cartService.getCart(id);
    if (!cart) throw new NotFoundException('Cart does not exist!');
    return res.status(HttpStatus.OK).json(cart);
  }

  @Put('/:id')
  async updateCart(
    @Res() res,
    @Param('id') id,
    @Body() createCartDTO: CreateCartDTO,
  ) {
    const cart = await this.cartService.updateCart(id, createCartDTO);
    if (!cart) throw new NotFoundException('Cart does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Cart has been successfully updated',
      cart,
    });
  }

  // Delete a cart
  @Delete('/:id')
  async deleteCart(@Res() res, @Query('cartID') cartID) {
    const cart = await this.cartService.deleteCart(cartID);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Cart has been deleted',
      cart,
    });
  }
}
