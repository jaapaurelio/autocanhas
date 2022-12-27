import * as React from "react";

interface Props {
  children: React.ReactNode;
}
export default function Button({ children }: Props) {
  return (
    <button
      type="button"
      className="text-gray-900 bg-white border border-primary focus:outline-none hover:bg-secondary focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full md:w-auto"
    >
      {children}
    </button>
  );
}
