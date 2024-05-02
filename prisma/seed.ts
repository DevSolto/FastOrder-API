import { seedCompany } from "./companySeed";
import { seedUsers } from "./usersSeed";

seedUsers().catch((e) => {
  console.error(e);
  process.exit(1);
})
seedCompany().catch((e) => {
  console.error(e);
  process.exit(1);
})