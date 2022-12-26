import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  children: React.ReactNode;
}

export default function CheckItem({ children }: Props) {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon className="pr-2 text-primary" icon={faCheck} />
      {children}
    </div>
  );
}
