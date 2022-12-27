"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";

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

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value;

    const parsed = queryString.parse(location.search);
    parsed[name] = newValue;
    const query = queryString.stringify(parsed);
    router.replace(`/viaturas?${query}`);
  };

  return (
    <select
      onChange={onChange}
      defaultValue=""
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
