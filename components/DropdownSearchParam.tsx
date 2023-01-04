"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

export interface SearchParamsProps {
  brand?: string;
  fuel?: string;
  transmission?: string;
  price_min?: string;
  price_max?: string;
  km_min?: string;
  km_max?: string;
  year_min?: string;
  year_max?: string;
}
export type SearchParamName = keyof SearchParamsProps;

interface Option {
  label: string;
  value: string;
}

export interface DropdownSearchParamProps {
  options: Option[];
  name: SearchParamName;
}

/**
 *
 * This component is responsible to set and read search params that can be used by the page to load data.
 *
 */
export default function DropdownSearchParam({
  options,
  name,
}: DropdownSearchParamProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parsedN = queryString.parse(searchParams.toString());
  const currentValue = (parsedN[name] as string) || "";

  const [value, setValue] = useState(currentValue);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parsed = queryString.parse(searchParams.toString());
    const newValue = e.currentTarget.value;
    setValue(newValue);
    parsed[name] = newValue;
    const query = queryString.stringify(parsed);
    router.replace(`${pathname}?${query}`);
  };

  return (
    <select
      onChange={onChange}
      value={value}
      id={name}
      className="bg-gray-50 arrow-select m-0 block w-full appearance-none rounded border border-solid border-gray-300  bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-gray-50 focus:text-gray-700 focus:outline-none"
    >
      <option value=""> </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
