import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";
import { Content } from "./Content";

const menuOptions = [
  { href: "/", title: "Início" },
  { href: "/viaturas", title: "Viaturas" },
  { href: "/oficina", title: "Oficina" },
  { href: "/", title: "Contacto" },
];
interface Props {
  hero?: boolean;
}
export const Header = ({ hero }: Props) => {
  return (
    <section>
      <div
        className={classnames("z-20 hidden md:block", {
          "bg-primary": !hero,
          "opacity-0": hero,
        })}
      >
        <Content
          className={classnames(
            "py-2 flex items-center justify-end flex-col sm:flex-row text-sm",
            { "text-primaryConstrast": !hero, "text-white": hero }
          )}
        >
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
      <Content className="z-20 flex justify-center items-center py-4">
        <Link href="/">
          <div className="grow-0 shrink-0 w-40 md:w-auto">
            <Image
              src={hero ? "/images/logo-w.png" : "/images/logo.png"}
              alt="Auto Canhas"
              width="200"
              height="100"
            ></Image>
          </div>
        </Link>
        <nav className="grow justify-end hidden md:flex">
          {menuOptions.map((option) => {
            return (
              <Link
                key={option.title}
                href={option.href}
                className={classnames(
                  "p-4 uppercase border-b-2 border-transparent hover:border-white transition-colors",
                  { "text-gray-700": !hero, "text-white": hero }
                )}
              >
                {option.title}
              </Link>
            );
          })}
        </nav>
        <nav className="text-white grow justify-end text-right md:hidden">
          H
        </nav>
      </Content>
      {!hero && <div className="border-b border-gray-300"></div>}
    </section>
  );
};
