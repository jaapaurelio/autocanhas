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
  asset: Referece;
}

export interface Car extends SanityBody {
  _type: "car";
  title: string;
  model: string;
  photos: Image[];
  price: number;
  year: number;
  km: number;
  fuel: string;
}
