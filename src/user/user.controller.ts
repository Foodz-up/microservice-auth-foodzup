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
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.create.dto';
import { UpdateUserDTO } from './dto/user.update.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    //add a user
    @Post()
    async addUser(
        @Res() res,
        @Body() CreateUserDTO: CreateUserDTO,
    ) {
        const user = await this.userService.addUser(CreateUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User has been created successfully',
            user
        });
    }

    // Retrieve users list
    @Get()
    async getAllUser(@Res() res) {
        const users = await this.userService.getAllUsers();
        return res.status(HttpStatus.OK).json(users);
    }

  // Fetch a particular user using ID
    @Get('/:id')
    async getUser(@Res() res, @Param('id') id) {
        const user = await this.userService.getUser(id);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/:id')
    async updateUser(
        @Res() res,
        @Param('id') id,
        @Body() updateUserDTO: UpdateUserDTO,
    ) {
        const user = await this.userService.updateUser(
        id,
        updateUserDTO,
        );
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        user,
        });
    }

    // Delete a user
    @Delete('/:id')
    async deleteUser(@Res() res, @Param('id') userID) {
        const user = await this.userService.deleteUser(
        userID,
        );

        return res.status(HttpStatus.OK).json({
        message: 'User has been deleted',
        user,
        });
    }
}
