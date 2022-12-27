import { formatEuro, formatNumber } from "lib/format";
import client from "lib/sanityClient";
import { groq } from "next-sanity";
import DropDown from "./Dropdown";

async function fetchFilters() {
  const query = groq`{
    "brands": *[_type == "brand"] | order(name) {
         name,
         "id": _id,
         "count": count(*[_type == "car" && references(^._id)])
       },
     }`;

  return client.fetch<{
    brands: { name: string; id: string; count: number }[];
  }>(query);
}

interface LabelProps {
  children: React.ReactNode;
  name: string;
}
function Label({ children, name }: LabelProps) {
  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-900">
      {children}
    </label>
  );
}

export default async function CarsFilter() {
  const { brands } = await fetchFilters();

  const brandsOptions = brands
    .filter((brand) => brand.count)
    .map((brand) => ({
      label: brand.name,
      value: brand.id,
    }));

  const prices = [
    5000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 25000, 30000, 40000,
  ];

  const priceOptions = prices.map((price) => ({
    label: `${formatEuro(price)}`,
    value: `${price}`,
  }));

  const kms = [
    5000, 10000, 15000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
    100000, 120000, 140000, 160000,
  ];

  const kmsOptions = kms.map((km) => ({
    label: `${formatNumber(km)}km`,
    value: `${km}`,
  }));

  const fuels = [
    "Diesel",
    "Eléctrico",
    "Gasolina",
    "GPL",
    "Híbrido (Diesel)",
    "Híbrido (Gasolina)",
    "Hidrogénio",
  ];

  const fuelOptions = fuels.map((fuel) => ({
    label: `${fuel}`,
    value: `${fuel}`,
  }));

  const transmitions = ["Manual", "Automática"];
  const transmitionsOptions = transmitions.map((trans) => ({
    label: `${trans}`,
    value: `${trans}`,
  }));

  const years = [
    2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2010,
    2008, 2004, 2000,
  ];

  const yearsOptions = years.map((year) => ({
    label: `${year}`,
    value: `${year}`,
  }));

  return (
    <div className="shadow p-2">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-1 md:gap-4">
        <div>
          <Label name="brand">Marca</Label>
          <DropDown name="brand" options={brandsOptions} />
        </div>
        <div>
          <Label name="fuel">Combustível</Label>
          <DropDown name="fuel" options={fuelOptions} />
        </div>
        <div>
          <Label name="transmission">Caixa</Label>
          <DropDown name="transmission" options={transmitionsOptions} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div>
            <Label name="price_min">Preço desde</Label>
            <DropDown name="price_min" options={priceOptions} />
          </div>
          <div>
            <Label name="price_max">Preço até</Label>
            <DropDown name="price_max" options={priceOptions} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div>
            <Label name="km_min">Km desde</Label>
            <DropDown name="km_min" options={kmsOptions} />
          </div>
          <div>
            <Label name="km_max">Km até</Label>
            <DropDown name="km_max" options={kmsOptions} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div>
            <Label name="year_min">Ano desde</Label>
            <DropDown name="year_min" options={yearsOptions} />
          </div>
          <div>
            <Label name="year_max">Ano até</Label>
            <DropDown name="year_max" options={yearsOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
