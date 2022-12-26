import CheckItem from "components/CheckItem";
import { Content } from "components/Content";
import H1 from "components/H1";
import H2 from "components/H2";
import Image from "next/image";
import autoRepairParallax from "public/images/auto-repair-parallax.jpg";
import autoRepair1 from "public/images/auto-repair-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  "Reparações Gerais de Mecânica",
  "Revisão Preventiva",
  "Manutenção do Ar Condicionado",
  "Reparação do Sistema de Refrigeração e Radiador",
  "Mudança de Óleo",
  "Substituição do Filtro de Óleo",
  "Reparação de Travões",
  "Diagnóstico de Avarias no Motor",
  "Manutenção de Luzes e Piscas",
  "Reparação do Sistema de Velocidades e Embraiagem",
];

export default async function Page() {
  return (
    <div>
      <Content>
        <H1 gutterBottom gutterTop>
          Oficina <span className="text-primary">Auto Canhas</span>
        </H1>
      </Content>
      <Content className="flex flex-col-reverse md:flex-row gap-4">
        <div className="md:w-2/3">
          <div>
            <H2>Quer dar ao seu carro o melhor serviço da ilha?</H2>
            <p>
              Contacte-nos para agendar uma visita à nossa oficina. Os nossos
              mecânicos qualificados cuidarão do seu carro para que ele se
              mantenha funcional durante muitos anos. Também daremos máxima
              prioridade ao seu carro, para que ele esteja pronto o mais rápido
              possível.
            </p>
          </div>
          <H2 gutterTop>Os nossos serviços incluem</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {services.map((service) => {
              return <CheckItem key={service}>{service}</CheckItem>;
            })}
          </div>
          <p className="mt-10">
            Ganhe tempo e marque a manutenção do seu carro connosco.
          </p>
        </div>
        <div className="relative w-full min-h-[40vh] md:w-1/3 mb-10 md:mb-0">
          <Image
            className="z-0 object-cover object-top"
            src={autoRepair1}
            alt="Estrada"
            fill
          ></Image>
        </div>
      </Content>
      <div className="bg-slate-500 my-20 py-20 md:py-40 relative">
        <Image
          className="z-0 object-cover"
          src={autoRepairParallax}
          alt="Estrada"
          fill
        ></Image>
        <Content className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
            {[
              {
                icon: "stm-icon-oil-add",
                iconSize: "text-xl",
                label: "Mudanças de óleo",
              },
              { icon: "stm-icon-air_conditioning", label: "Ar condicionado" },
              { icon: "stm-icon-auto_electric", label: "Eletrônica automóvel" },
              { icon: "stm-icon-brake", label: "Substituição de travões" },
              {
                icon: "stm-icon-transmission",
                label: "Sistema de velocidades",
              },
              { icon: "stm-icon-tire_wheel", label: "Pneus" },
            ].map(({ label, icon, iconSize }) => {
              return (
                <div key={label} className="flex items-center">
                  <div className="flex justify-center items-center w-16 h-16 text-4xl bg-red-700 leading-10 p-2 mr-6">
                    <div className={`stm-icon ${icon} ${iconSize}`}></div>
                  </div>
                  <div className="font-bold">{label}</div>
                </div>
              );
            })}
          </div>
        </Content>
      </div>
      <Content>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 flex flex-col gap-6 justify-center mb-10">
            <div className="flex">
              <FontAwesomeIcon
                className="pr-2 mt-1   text-primary"
                icon={faLocationDot}
              />
              <div>
                <div className="font-bold mb-2">Morada Oficina</div>
                <div>Estrada Eng. Teixeira de Sousa 105,</div>
                <div>9369-361 Canhas</div>
              </div>
            </div>
            <div className="flex">
              <FontAwesomeIcon
                className="pr-2 mt-1   text-primary"
                icon={faPhone}
              />
              <div>
                <div className="font-bold mb-2">Contato Oficina</div> 291 974
                006
              </div>
            </div>
            <div className="flex">
              <FontAwesomeIcon
                className="pr-2 mt-1   text-primary"
                icon={faClock}
              />
              <div>
                <div className="font-bold mb-2">Horário Oficina</div>
                <div>
                  <span className="text-sm font-bold">Segunda – Sexta:</span>{" "}
                  09:00h – 18:00h{" "}
                </div>
                <div>
                  <span className="text-sm font-bold">Sábado: </span>09:00h –
                  13:00h
                </div>
                <div>
                  <span className="text-sm font-bold">Domingo: </span>Fechado
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13428.859979902569!2d-17.138336598873142!3d32.70691429912947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc60517960f4e81f%3A0x7783830323076cb0!2sAuto%20Canhas%20Oficina!5e0!3m2!1spt-PT!2spt!4v1672071484576!5m2!1spt-PT!2spt"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Content>
    </div>
  );
}
