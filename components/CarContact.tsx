import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import WhatsAppFloat from "./WhatsAppFloat";

interface Props {
  showHeader?: boolean;
}
export default function CarContact({ showHeader }: Props) {
  return (
    <div className="border p-3 bg-white">
      {showHeader && (
        <div>
          <div className="mb-3 font-bold flex justify-between items-center">
            Contato
            <div>
              <FontAwesomeIcon className="px-2 text-primary" icon={faMessage} />
            </div>
          </div>
          <div className="text-gray-500 my-5 text-sm">
            <p>Interessado? Dúvidas?</p>
            <p>Entre em contato e nós ajudamos.</p>
          </div>

          <div className="my-5">
            <div>
              <FontAwesomeIcon className="px-2 text-primary " icon={faPhone} />
              <span>+351 291 976 381</span>
            </div>
            <div>
              <FontAwesomeIcon
                className="px-2 text-primary"
                icon={faEnvelope}
              />
              <span>geral@autocanhas.com</span>
            </div>
          </div>
          <WhatsAppFloat text="Enviar mensagem WhatsApp" />
          <div className="text-gray-500 my-5 text-sm">
            <p>Ou envie utilize o seguinte formulário:</p>
          </div>
        </div>
      )}
      <form>
        <div className="mb-6">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mensagem
          </label>
          <textarea
            id="message"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            required
            placeholder="A sua mensagem aqui."
          />
        </div>
        <div className="mb-6">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Telefone
          </label>
          <input
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
