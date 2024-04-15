
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country, NewCountryInput } from "../entities/Country";

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find({relations: {continent: true}});
  }

  @Query(() => Country)
  async country(@Arg("code") code: string){
    return  Country.findOne({ where: { code } });
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentCode") continentCode: string
  ){
    return Country.find({ where: { continent: {code: continentCode} } });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg('data') data: NewCountryInput
  ) {
    const newCountry = new Country();
    Object.assign(newCountry, data)
    const {id} = await newCountry.save()
    return Country.findOne({where: {id}, relations: { continent: true}})
  }
}
