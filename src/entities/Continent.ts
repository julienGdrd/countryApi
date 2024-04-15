import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./Country";

@Entity()
@ObjectType()
export class Continent extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    code: string;

    @OneToMany(()=> Country, (country)=> country.continent)
    countries: Country[]
}

@InputType()
export class NewContinentInput {
    @Field()
    name: string;

    @Field()
    code: string;
}