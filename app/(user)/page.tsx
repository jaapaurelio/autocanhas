import client from "../../lib/sanityClient";

async function fetchData() {
  const query = '*[_type == "car"]';

  const response = await client.fetch(query, {});
  console.log(response);

  return response;
}

export default async function Page() {
  const data = await fetchData();
  console.log(data);
  return <div className="text-3xl font-bold underline">Page 2</div>;
}
