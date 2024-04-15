

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Continent } from "./Continent";
import { ObjectId } from "../utils";


@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  emoji: string;

  @ManyToOne(() => Continent, (c) => c.countries, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field()
  continent: Continent;

}
@InputType()
export class NewCountryInput {
    @Field()
    code: string;

    @Field()
    name: string;

    @Field()
    emoji: string;
    
    @Field(() => ObjectId)
    continent: ObjectId
}