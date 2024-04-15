import { db } from "./db";
import { Country } from "./entities/Country";
import { Continent } from "./entities/Continent";

async function cleadDb() {
  const runner = db.createQueryRunner();
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS ${entity.tableName}`)
    )
  );
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await cleadDb();

  const france = Country.create({ name: "france", code: "FR", emoji: "🇫🇷" });
  const chine = Country.create({ name: "china", code: "CN", emoji: "🇨🇳" });
  const canada = Country.create({ name: "canada", code: "CA", emoji: "🇨🇦" });

  const europe = Continent.create({ name: "europe", code: 'EU' });
  const asie = Continent.create({ name: "asie", code: 'AS' });
  const amerique = Continent.create({ name: "amerique du nord", code: 'NA' });

  france.continent = europe;
  chine.continent = asie;
  canada.continent = amerique;

  await france.save();
  await chine.save();
  await canada.save();

}

main();
