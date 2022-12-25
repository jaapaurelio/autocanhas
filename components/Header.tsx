import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";
import { Content } from "./Content";

const menuOptions = [
  { href: "/", title: "Início" },
  { href: "/", title: "Viaturas" },
  { href: "/oficina", title: "Oficina" },
  { href: "/", title: "Contacto" },
];
export const Header = () => {
  return (
    <section>
      <div className="bg-primary">
        <Content className="py-2 flex items-center justify-end text-primaryConstrast flex-col sm:flex-row">
          <div>
            <FontAwesomeIcon className="px-2 text-white" icon={faPhone} />
            <span>+351 291 976 381</span>
          </div>
          <div>
            <FontAwesomeIcon className="px-2 text-white" icon={faEnvelope} />
            <span>geral@autocanhas.com.pt</span>
          </div>
        </Content>
      </div>
      <Content className="flex justify-center items-center py-2">
        <div className="grow-0 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Auto Canhas"
            width="200"
            height="100"
          ></Image>
        </div>
        <nav className="grow justify-end hidden md:flex">
          {menuOptions.map((option) => {
            return (
              <Link
                key={option.title}
                href={option.href}
                className={classnames(
                  "text-gray-700 p-4 uppercase border-b-2 border-transparent hover:border-white transition-colors"
                )}
              >
                {option.title}
              </Link>
            );
          })}
        </nav>
      </Content>
      <div className="border-b border-gray-300"></div>
    </section>
  );
};
