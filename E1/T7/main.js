import { kilometersToMiles, milesToKilometers } from "./converter.js";

const conversionType = process.argv[2];
const distance = parseFloat(process.argv[3]);

if (conversionType === "mi_to_km") {
  console.log(milesToKilometers(distance));
} else if (conversionType === "km_to_mi") {
  console.log(kilometersToMiles(distance));
} else {
  console.log("Invalid conversion type.");
}
