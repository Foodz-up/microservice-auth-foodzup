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
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.create.dto';
import { UpdateUserDTO } from './dto/user.update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { IsAdminGuard } from 'src/auth/guards/isAdmin.guard';
import { SameUserIdGuard } from 'src/auth/guards/sameUserId.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //add a user
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Post()
  async addUser(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(CreateUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      user,
    });
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  // Retrieve users list
  @Get()
  async getAllUser(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @UseGuards(JwtAuthGuard, SameUserIdGuard)
  // Fetch a particular user using ID
  @Get('/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(JwtAuthGuard, SameUserIdGuard)
  @Put('/:id')
  async updateUser(
    @Res() res,
    @Param('id') id,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(id, updateUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUserFromApp(
    @Res() res,
    @Req() req,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(req.user.id, updateUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user,
    });
  }

  @UseGuards(JwtAuthGuard, SameUserIdGuard)
  // Delete a user
  @Delete('/:id')
  async deleteUser(@Res() res, @Param('id') userID) {
    const user = await this.userService.deleteUser(userID);

    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
