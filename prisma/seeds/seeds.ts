import { clearDatabase } from "./clearData";
import { createOrderItems } from "./orderItems";
import { createOrders } from "./orders";
import { createOrderUnities } from "./orderUnities";
import { createProducts } from "./products";
import { createUnits } from "./units";
import { createUsers } from "./users";
import { createWorks } from "./works";

async function seeds(){
  // await clearDatabase()
  
  await createUsers(13)
  await createUnits(6)
  await createProducts(15)
  await createOrders(25)
  await createOrderUnities(50)
  await createOrderItems(100)
  await createWorks(50)
}

seeds()