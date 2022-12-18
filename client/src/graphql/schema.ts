export type Mission = {
  id: String;
  title: String;
  operator: String;
  launch: Launch;
  orbit: Orbit;
  payload: Payload;
}

export type Launch = {
  date: Date;
  vehicle: String;
  location: Location;
}

export type Location = {
  name: String;
  longitude: Number;
  Latitude: Number;
}

export type Orbit = {
  periapsis: Number;
  apoapsis: Number;
  inclination: Number;
}

export type Payload = {
  capacity: Number;
  available: Number;
}

export type ForecastDay = {
  date: string;
  day: Day;
  astro: Astro;
}

export type Astro = {
  sunrise: string;
  sunset:string
}

export type Day = {
  condition: Condition
  maxtemp_c: Number,
  mintemp_c: Number,
  maxtemp_f: Number,
  mintemp_f: Number
}

export type Condition = {
  text: string;
  icon: string;
  code: Number;
}