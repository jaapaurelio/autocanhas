import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default function WhatsAppFloat({
  fixed = false,
  text = "Quer saber mais? Envie Mensagem.",
}: {
  fixed?: boolean;
  text?: string;
}) {
  return (
    <div
      className={classNames("text-white cursor-pointer text-xs", {
        "fixed p-10 bottom-0 right-0 left-0 z-50 flex justify-center md:justify-end ":
          fixed,
      })}
    >
      <a
        href="https://api.whatsapp.com/send?phone=351965582960"
        className="bg-green-500 hover:bg-green-600 p-2 flex flex-row items-center gap-2 rounded-lg"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
        {text}
      </a>
    </div>
  );
}
