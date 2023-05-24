import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  creator: string;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
