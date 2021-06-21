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
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // add a order
  @Post()
  async addOrder(@Res() res, @Body() createOrderDTO: CreateOrderDTO) {
    const order = await this.orderService.addOrder(createOrderDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Order has been created successfully',
      order,
    });
  }

  // Retrieve orders list
  @Get()
  async getAllOrder(@Res() res) {
    const orders = await this.orderService.getAllOrder();
    return res.status(HttpStatus.OK).json(orders);
  }

  // Fetch a particular order using ID
  @Get('/:id')
  async getOrder(@Res() res, @Param('id') id) {
    const order = await this.orderService.getOrder(id);
    if (!order) throw new NotFoundException('Order does not exist!');
    return res.status(HttpStatus.OK).json(order);
  }

  @Put('/:id')
  async updateOrder(
    @Res() res,
    @Param('id') id,
    @Body() createOrderDTO: CreateOrderDTO,
  ) {
    const order = await this.orderService.updateOrder(id, createOrderDTO);
    if (!order) throw new NotFoundException('Order does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Order has been successfully updated',
      order,
    });
  }

  // Delete a order
  @Delete('/:id')
  async deleteOrder(@Res() res, @Query('orderID') orderID) {
    const order = await this.orderService.deleteOrder(orderID);
    if (!order) throw new NotFoundException('Order does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Order has been deleted',
      order,
    });
  }
}
