import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import classnames from "classnames";
import Link from "next/link";
import Content from "./Content";

interface TitleProps {
  children: React.ReactNode;
  small?: boolean;
}

function Title({ children, small }: TitleProps) {
  return (
    <div
      className={classnames("uppercase font-bold mt-4", {
        "mb-2": small,
        "mb-4": !small,
      })}
    >
      {children}
    </div>
  );
}

interface InfoRowProps {
  label: string;
  info: string;
}

function InfoRow({ label, info }: InfoRowProps) {
  return (
    <div className="text-sm">
      <span className="text-stone-500 font-bold">{label}</span>{" "}
      <span>{info}</span>
    </div>
  );
}

interface IconProps {
  children: React.ReactNode;
}
function Icon({ children }: IconProps) {
  return (
    <div className="text-lg bg-stone-500 w-10 h-10 text-center leading-10 hover:bg-secondary cursor-pointer">
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-stone-800 text-white py-20 mt-20">
      <Content className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Title>Contato stand</Title>
          <InfoRow label="Telefone:" info="291 976 381" />
          <InfoRow label="Móvel 1:" info="965 582 960" />
          <InfoRow label="Móvel 2:" info="919 912 837" />

          <Title small>Oficina</Title>
          <InfoRow label="Telefone:" info="291 974 006" />
        </div>
        <div>
          <Title>Horário stand</Title>
          <InfoRow label="Segunda - Sexta:" info="09:00h - 18:00h" />
          <InfoRow label="Sábado:" info="09:00h - 13:00h" />
          <InfoRow label="Domingo:" info="Fechado" />
        </div>
        <div>
          <Title>Horário Oficina</Title>
          <InfoRow label="Segunda - Sexta:" info="09:00h - 18:00h" />
          <InfoRow label="Sábado:" info="09:00h - 13:00h" />
          <InfoRow label="Domingo:" info="Fechado" />
        </div>
        <div>
          <Title>Redes Sociais</Title>
          <div className="flex gap-3">
            <Link
              href="https://www.facebook.com/autocanhas.stand"
              target="_blank"
            >
              <Icon>
                <FontAwesomeIcon icon={faFacebookF} />
              </Icon>
            </Link>
            <Link
              href="https://www.instagram.com/autocanhasstand/"
              target="_blank"
            >
              <Icon>
                <FontAwesomeIcon icon={faInstagram} />
              </Icon>
            </Link>
          </div>
        </div>
      </Content>
      <Content className="mt-14 text-stone-500">
        <div className="">
          © Auto Canhas - A informação apresentada é para efeitos informativos.
        </div>
      </Content>
    </div>
  );
}
