import Content from "components/Content";
import H1 from "components/H1";
import TotalCars from "components/TotalCars";
import { groq } from "next-sanity";
import client from "lib/sanityClient";
import CarFilter from "components/CarFilter";
import { Metadata } from "next";

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}

async function fetchNumberOfCars() {
  const query = groq`count(*[_type == "car"])`;

  return client.fetch<number>(query);
}

export default async function Layout({ children }: Props) {
  const numberOfCars = await fetchNumberOfCars();

  return (
    <div>
      <Content>
        <div className="flex justify-between items-center mt-14 mb-8">
          <H1>As nossa viaturas</H1>
          <div className="text-right">
            <TotalCars total={numberOfCars} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-8 md:w-1/4">
            <CarFilter />
          </div>

          {children}
        </div>
      </Content>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const numberOfCars = await fetchNumberOfCars();

  return {
    title: `Ver ${numberOfCars} carros usados | Auto Canhas`,
    description:
      "No Auto Canhas encontra carros usados de qualidade com financiamento fácil. Visite-nos agora para garantir o seu próximo carro! As melhores ofertas em Funchal e Ilha da Madeira.",
  };
}
