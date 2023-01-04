import {
  faCarOn,
  faDollarSign,
  faTag,
  faStar,
  faComments,
  faScrewdriverWrench,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const avaiableIcons = {
  faTag,
  faStar,
  faComments,
  faCarOn,
  faDollarSign,
  faScrewdriverWrench,
  faArrowRight,
};

export type IconName = keyof typeof avaiableIcons;

interface IconProps {
  name: IconName;
  className?: string;
}

export default function FaIcon({ name, className }: IconProps) {
  if (!Object.keys(avaiableIcons).includes(name)) {
    return null;
  }

  return <FontAwesomeIcon className={className} icon={avaiableIcons[name]} />;
}
