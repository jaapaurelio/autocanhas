"use client";

import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

interface MenuOption {
  href: string;
  title: string;
}
interface PropsMenuMobile {
  options: MenuOption[];
}

export default function MobileMenu({ options }: PropsMenuMobile) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className=""
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {isOpen && (
        <div className="bg-stone-800 text-white z-50 fixed top-0 left-0 right-0 bottom-0 shadow ">
          <button
            type="button"
            className="p-4 py-5 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <nav>
            {options.map(({ title, href }) => (
              <Link
                className="block py-4 px-8 cursor-pointer font-bold text-2xl"
                href={href}
                key={title}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
