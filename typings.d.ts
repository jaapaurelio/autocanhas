interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updated: string;
}

interface Referece {
  _ref: string;
  _type: "reference";
}

interface Image {
  _type: "image";
  asset: ImageAsset;
}
interface Brand extends SanityBody {
  _type: "car";
  id: string;
  name: string;
}

interface ImageAsset extends SanityBody {}

export interface Car extends SanityBody {
  _type: "car";
  id: string;
  title: string;
  model: string;
  photos: Image[];
  price: number;
  year: number;
  km: number;
  fuel: string;
  doors: number;
  seats: number;
  transmission: string;
  brand: Brand;
  horsePower: string;
  extras?: string[];
  enginePower: string;
  info?: string;
  article?: string;
}
