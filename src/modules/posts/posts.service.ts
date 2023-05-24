import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import PostsSearchService from '../search/posts-search.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private postsSearchService: PostsSearchService,
  ) {}

  async createPost(post: CreatePostDto) {
    const newPost = this.postsRepository.create({
      ...post,
    });
    await this.postsRepository.save(newPost);
    this.postsSearchService.indexPost(newPost);
    return newPost;
  }

  async searchForPosts(text: string) {
    const results = await this.postsSearchService.search(text);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.postsRepository.find({
      where: { id: In(ids) },
    });
  }

  async getAllPosts() {
    return await this.postsRepository.find();
  }

  async deletePost(id: string) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(id);
    }
    await this.postsSearchService.remove(id);
  }

  async updatePost(post: UpdatePostDto) {
    await this.postsRepository.update(post.id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: { id: post.id },
    });
    if (updatedPost) {
      await this.postsSearchService.update(updatedPost);
      return updatedPost;
    }
    throw new NotFoundException(post.id);
  }
}
