import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  total: number;
}

export default function TotalCars({ total }: Props) {
  return (
    <div className="font-bold text-right">
      <FontAwesomeIcon className="px-2 text-primary" icon={faCar} />
      {total} viaturas disponíveis
    </div>
  );
}
