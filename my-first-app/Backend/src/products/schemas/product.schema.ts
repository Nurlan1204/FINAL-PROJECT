import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
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