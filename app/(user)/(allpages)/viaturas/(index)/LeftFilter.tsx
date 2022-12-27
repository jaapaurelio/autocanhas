import { formatEuro, formatNumber } from "lib/format";
import client from "lib/sanityClient";
import { groq } from "next-sanity";
import DropDown from "components/Dropdown";

const prices = [
  5000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 25000, 30000, 40000,
];

const kms = [
  5000, 10000, 15000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
  100000, 120000, 140000, 160000,
];

const transmitions = ["Manual", "Automática"];

const fuels = [
  "Diesel",
  "Eléctrico",
  "Gasolina",
  "GPL",
  "Híbrido (Diesel)",
  "Híbrido (Gasolina)",
  "Hidrogénio",
];

const years = [
  2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2010, 2008,
  2004, 2000,
];

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
  const priceOptions = prices.map((price) => ({
    label: `${formatEuro(price)}`,
    value: `${price}`,
  }));
  const kmsOptions = kms.map((km) => ({
    label: `${formatNumber(km)}km`,
    value: `${km}`,
  }));
  const formatStringOption = (value: string | number) => ({
    label: `${value}`,
    value: `${value}`,
  });
  const fuelOptions = fuels.map(formatStringOption);
  const transmitionsOptions = transmitions.map(formatStringOption);
  const yearsOptions = years.map(formatStringOption);
  const singleDropdownItem = [
    { name: "brand", title: "Marca", options: brandsOptions },
    { name: "fuel", title: "Combustível", options: fuelOptions },
    {
      name: "transmission",
      title: "Caixa",
      options: transmitionsOptions,
    },
  ];
  const doubleDropdownItems = [
    {
      title: "Preço",
      name: "price",
      rightName: "price",
      options: priceOptions,
    },
    {
      title: "Kms",
      name: "km",
      options: kmsOptions,
    },
    {
      title: "Ano",
      name: "year",
      options: yearsOptions,
    },
  ];

  return (
    <div className="shadow p-2">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-1 md:gap-4">
        {singleDropdownItem.map(({ name, title, options }) => (
          <div key={name}>
            <Label name={name}>{title}</Label>
            <DropDown name={name} options={options} />
          </div>
        ))}

        {doubleDropdownItems.map(({ title, name, options }) => (
          <div
            key={title}
            className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2"
          >
            <div>
              <Label name={`${name}_min`}>{title} desde</Label>
              <DropDown name={`${name}_min`} options={options} />
            </div>
            <div>
              <Label name={`${name}_max`}>{title} até</Label>
              <DropDown name={`${name}_max`} options={options} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
