import { formatEuro, formatNumber } from "lib/format";
import client from "lib/sanityClient";
import { groq } from "next-sanity";
import DropdownQueryParam from "components/DropdownSearchParam";
import { fuels, kms, prices, transmitions, years } from "constants/filters";

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

/**
 *
 * For now only brands are dynamic.
 * All other filters are created from constants.
 */
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

export default async function CarsFilter() {
  const { brands } = await fetchFilters();

  // Show only brands with cars
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
  const stringOptions = (value: string | number) => ({
    label: `${value}`,
    value: `${value}`,
  });
  const fuelOptions = fuels.map(stringOptions);
  const transmitionsOptions = transmitions.map(stringOptions);
  const yearsOptions = years.map(stringOptions);

  return (
    <div className="shadow p-2" data-pw="cars-filter">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-1 md:gap-4">
        <div>
          <Label name="brand">Marca</Label>
          <DropdownQueryParam name="brand" options={brandsOptions} />
        </div>
        <div>
          <Label name="fuel">Combustível</Label>
          <DropdownQueryParam name="fuel" options={fuelOptions} />
        </div>
        <div>
          <Label name="transmission">Caixa</Label>
          <DropdownQueryParam
            name="transmission"
            options={transmitionsOptions}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div>
            <Label name="price_min">Preço desde</Label>
            <DropdownQueryParam name="price_min" options={priceOptions} />
          </div>
          <div>
            <Label name="price_max">Preço até</Label>
            <DropdownQueryParam name="price_max" options={priceOptions} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div>
            <Label name="km_min">Kms desde</Label>
            <DropdownQueryParam name="km_min" options={kmsOptions} />
          </div>
          <div>
            <Label name="km_max">Kms até</Label>
            <DropdownQueryParam name="km_max" options={kmsOptions} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div>
            <Label name="year_min">Ano desde</Label>
            <DropdownQueryParam name="year_min" options={yearsOptions} />
          </div>
          <div>
            <Label name="year_max">Ano até</Label>
            <DropdownQueryParam name="year_max" options={yearsOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
