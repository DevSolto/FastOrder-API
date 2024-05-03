import { seedAddress } from "./addressSeed";
import { seedCategory } from "./categorySeed";
import { seedCompany } from "./companySeed";
import { seedProduct } from "./productSeed";
import { seedUnit } from "./unitiesSeed";
import { seedUsers } from "./usersSeed";
import { seedUserUnity } from "./userUnitSeed";

// seedUsers().catch((e) => {
//   console.error(e);
//   process.exit(1);
// })
// seedCompany().catch((e) => {
//   console.error(e);
//   process.exit(1);
// })
// seedUnit().catch((e) => {
//   console.error(e);
//   process.exit(1);
// })
// seedAddress().catch((e) => {
//   console.error(e);
//   process.exit(1);
// })
// seedProduct().catch((e) => {
//   console.error(e);
//   process.exit(1);
// })
// seedCategory().catch((e) => {
//   console.error(e);
//   process.exit(1);
// })
seedUserUnity().catch((e) => {
  console.error(e);
  process.exit(1);
})