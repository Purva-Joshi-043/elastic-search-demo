import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/get-posts')
  async getPosts(@Query('search') search: string) {
    if (search) {
      return this.postsService.searchForPosts(search);
    }
    return this.postsService.getAllPosts();
  }

  @Post('/create-post')
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Patch('/update-post')
  async updatePost(@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(updatePostDto);
  }

  @Delete('delete-post/:id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
