"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  name: string;
}

export function DropDown({ options, name }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parsed = queryString.parse(searchParams.toString());
  const currentValue = (parsed[name] as string) || "";

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
      <option></option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
