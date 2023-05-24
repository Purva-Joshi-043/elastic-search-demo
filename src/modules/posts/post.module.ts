import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Post } from './entities/post.entity';
import PostsController from './posts.controller';
import { PostsService } from './posts.service';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Post]), SearchModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostModule {}
