import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  creator: string;
}
