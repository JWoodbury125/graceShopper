"use strict";

const {
  db,
  models: { User, Wine, Beer },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");

    // Creating Users
    const users = await Promise.all([
      User.create({ username: "cody", password: "123" }),
      User.create({ username: "murphy", password: "123" }),
    ]);

    // Creating Products - Wine
    const wines = await Promise.all([
      Wine.create({
        name: "Duckhorn",
        year: 2017,
        region: "California",
        type: "Red",
        style: "Cabernet Sauvignon",
        abv: 14.5,
        imgURL: "/wine1_demo.jpeg",
        price: 154.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "Josh Cellars",
        year: 2019,
        region: "California",
        type: "Red",
        style: "Cabernet Sauvignon",
        abv: 13.5,
        imgURL: "/2019_JoshCellars_Cabernet.jpeg",
        price: 17.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "Silver Oak",
        year: 2017,
        region: "California",
        type: "Red",
        style: "Cabernet Sauvignon",
        abv: 14.2,
        imgURL: "/2017_SilverOaks_Cabernet.jpeg",
        price: 89.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "Goldeneye",
        year: 2018,
        region: "California",
        type: "Red",
        style: "Pinot Noir",
        abv: 14.5,
        imgURL: "/2018_Goldeneye_Pinot.jpeg",
        price: 58.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "Chandon de Brialles",
        year: 2019,
        region: "France",
        type: "Red",
        style: "Pinot Noir",
        abv: 13.5,
        imgURL: "/2019_ChandondeBrialles.jpeg",
        price: 249.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "Catena Zapata Adrianna White Bones Chardonnay",
        year: 2019,
        region: "Mendoza, Argentina",
        type: "White",
        style: "Chardonnay",
        abv: 12.6,
        imgURL: "/Catena_Zapata_Adrianna_White_Bones_Chardonnay_2019.jpg",
        price: 129.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "Sine Qua Non Aperta",
        year: 2018,
        region: "California",
        type: "White",
        style: "Other White Blends",
        abv: 12.5,
        imgURL: "/Sine_Qua_Non_Aperta_2018.jpg",
        price: 299.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "Marc Colin Montrachet Grand Cru",
        year: 2019,
        region:
          "Puligny-Montrachet, Cote de Beaune, Cote d'Or, Burgundy, France",
        type: "White",
        style: "Chardonnay",
        abv: 12.5,
        imgURL: "/Marc_Colin_Montrachet_Grand_Cru_2019.jpg",
        price: 1799.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "R. Lopez de Heredia Rioja White Vina Tondonia Gran Reserva",
        year: 2001,
        region: "Rioja, Spain",
        type: "White",
        style: "Other White Blends ",
        abv: 12.5,
        imgURL:
          "/R_Lopez_de_Heredia_Rioja_White_Vina_Tondonia_Gran_Reserva.jpg",
        price: 499.99,
        inventoryCount: 100,
      }),
      Wine.create({
        name: "Christian Moreau Chablis Les Clos Grand Cru",
        year: 2019,
        region: "Chablis, Burgundy, France",
        type: "White",
        style: "Chardonnay",
        abv: 13,
        imgURL: "Christian_Moreau_Chablis_Les_Clos_Grand_Cru_2019.jpg",
        price: 129.99,
        inventoryCount: 100,
      }),
    ]);

    // Creating Products - Beer
    await Promise.all([
      Beer.create({
        name: "KBS - Hazelnut",
        brand: "Founders Brewing Company",
        state: "Michigan",
        country: "USA",
        type: "Ale",
        style: "Stout",
        ABV: 12,
        imgURL: "/2022_KBS_Hazelnut_Featured.jpg",
        price: 17.5,
        inventoryCount: 100,
      }),
      Beer.create({
        name: "All Day Vacay",
        brand: "Founders Brewing Company",
        state: "Michigan",
        country: "USA",
        type: "Ale",
        style: "Wheat Beer",
        ABV: 4.6,
        imgURL: "/2020_All_Day_Vacay_Featured.jpg",
        price: 17.99,
        inventoryCount: 100,
      }),
      Beer.create({
        name: "Vanilla Java Porter",
        brand: "Atwater Brewery",
        state: "Michigan",
        country: "USA",
        type: "Ale",
        style: "Porter",
        ABV: 5,
        imgURL: "/porter.jpg",
        price: 18.99,
        inventoryCount: 100,
      }),
      Beer.create({
        name: "Detroit Pale Ale",
        brand: "Atwater Brewery",
        state: "Michigan",
        country: "USA",
        type: "Ale",
        style: "Pale Ale",
        ABV: 5,
        imgURL: "/paleAle.png",
        price: 16.99,
        inventoryCount: 100,
      }),
      Beer.create({
        name: "Dirty Blonde",
        brand: "Atwater Brewery",
        state: "Michigan",
        country: "USA",
        type: "Ale",
        style: "Wheat Beer",
        ABV: 4.5,
        imgURL: "/dirtyBlonde.jpg",
        price: 16.99,
        inventoryCount: 100,
      }),
    ]);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
    return {
      users: {
        cody: users[0],
        murphy: users[1],
      },
    };
  } catch (error) {
    console.log(error);
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
