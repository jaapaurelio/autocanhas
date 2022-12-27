import { Content } from "components/Content";
import H1 from "components/H1";
import TotalCars from "components/TotalCars";
import CarsFilter from "components/CarsFilter";
import { Suspense } from "react";

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div>
      <Content>
        <div className="flex justify-between items-center mt-14 mb-8">
          <H1>As nossas viaturas</H1>
          <div className="text-right">
            <TotalCars total={12}></TotalCars>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-8 md:w-1/4">
            {/* @ts-expect-error Server Component */}
            <CarsFilter />
          </div>
          {children}
        </div>
      </Content>
    </div>
  );
}
