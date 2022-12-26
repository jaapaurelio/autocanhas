import {
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarContact from "components/CarContact";
import { Content } from "components/Content";
import H1 from "components/H1";
import Image from "next/image";
import contact from "public/images/contact.jpg";

export default async function Page() {
  const years = new Date().getFullYear() - 1993 - 1;
  return (
    <div>
      <Content>
        <div className="flex flex-col md:flex-row gap-4 mt-20">
          <div className="md:w-2/3 flex flex-col gap-6 mb-10 justify-center">
            <div>
              <H1 gutterBottom>
                <span className="text-6xl">
                  Ao seu dispor{" "}
                  <span className="text-primary">há {years} anos.</span>
                </span>
              </H1>
              <p>
                Desde <span className="text-primary">1993</span> que uma das
                nossas prioridades é ouvir o cliente.
              </p>
              <p>
                Utilize os nossos contactos para qualquer dúvida ou sugestão.
              </p>
              <p>Responderemos o mais rapidamente possível.</p>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col mb-10">
            <CarContact showHeader={false}></CarContact>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-20">
          <div className="md:w-1/3 flex flex-col gap-4 justify-center">
            <div className="flex">
              <FontAwesomeIcon
                className="pr-2 mt-1 text-primary"
                icon={faLocationDot}
              />
              <div>
                <div className="font-bold mb-2">Morada</div>
                <div>Estrada Eng. Teixeira de Sousa 51,</div>
                <div>9360-361 Canhas</div>
              </div>
            </div>
            <div className="flex">
              <FontAwesomeIcon
                className="pr-2 mt-1 text-primary"
                icon={faPhone}
              />
              <div>
                <div className="font-bold mb-2">Contato</div>
                <div>
                  <span className="text-sm font-bold">Telefone:</span>
                  291 976 381
                </div>
                <div>
                  <span className="text-sm font-bold">Móvel 1:</span> 965 582
                  960
                </div>
                <div>
                  <span className="text-sm font-bold">Móvel 2:</span> 919 912
                  837
                </div>
              </div>
            </div>
            <div className="flex">
              <FontAwesomeIcon
                className="pr-2 mt-1 text-primary"
                icon={faClock}
              />
              <div>
                <div className="font-bold mb-2">Horário</div>
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13429.18002091419!2d-17.11572997403564!3d32.70478782998149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe8ce151eda8b6616!2sAuto%20Canhas%20-%20Loreto%20%26%20Nascimento%2C%20Unipessoal%20Lda!5e0!3m2!1sen!2spt!4v1672079021368!5m2!1sen!2spt"
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
