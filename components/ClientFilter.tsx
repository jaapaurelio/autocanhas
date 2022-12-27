"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";

export default function ClientFilter() {
  const router = useRouter();

  const click = () => {
    console.log("click");
    const parsed = queryString.parse(location.search);
    parsed.brand = "d6805f7f-249a-440f-b7eb-cd231f3bdd22";
    const query = queryString.stringify(parsed);
    router.replace(`/viaturas?${query}`);
  };

  return (
    <div>
      <button onClick={click}>click</button>
    </div>
  );
}
