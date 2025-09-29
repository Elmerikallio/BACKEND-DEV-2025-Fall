export const milesToKilometers = (miles) => miles * 1.60934;
// milesToKilometers(10) // 16.0934;
// export function milesToKilometers(miles) { return miles * 1.60934 }

export const kilometersToMiles = (kilometers) => {
  return kilometers / 1.60934;
};

export const converter = {
  milesToKilometers,
  kilometersToMiles,
};
