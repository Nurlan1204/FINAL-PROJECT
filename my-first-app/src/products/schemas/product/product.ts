import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  name!: string;

  @Prop()
  brand!: string;

  @Prop()
  category!: string;

  @Prop()
  image!: string;

  @Prop()
  price!: number;

  @Prop()
  rating!: number;
}

export const ProductSchema =
  SchemaFactory.createForClass(Product);


//   mongodb+srv://MegaSport:<db_password>@cluster0.tqzr7nw.mongodb.net/?appName=Cluster0