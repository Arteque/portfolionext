"use client";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { li } from "motion/react-client";
export default function Nav() {
  const t = useTranslations("header.nav.links");
  const pathname = usePathname();
  const navigation = [
    { title: t("hero.text"), path: "/" },
    { title: t("about.text"), path: "/about" },
    { title: t("skills.text"), path: "/skills" },
    { title: t("projects.text"), path: "/projects" },
    { title: t("services.text"), path: "/services" },
    { title: t("contact.text"), path: "/contact" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const ref = useRef<HTMLLIElement>(null);

  return (
    <>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link
            href={navigation[0].path}
            className="-m-1.5 p-1.5 flex items-center gap-2 font-bold text-text-200"
          >
            <Image
              alt="Ahmed Lemssiah Logo"
              width={32}
              height={32}
              src="/Logo.svg"
              className="h-8 w-auto"
            />
            <span>Ahmed Lemssiah</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <ul
          className="hidden lg:flex lg:gap-x-12"
          onMouseLeave={() => {
            setPosition((pv) => ({
              ...pv,
              opacity: 0,
            }));
          }}
        >
          {navigation.slice(1).map(({ title, path }, index) => (
            <li
              key={`desktop-${title}-${index}`}
              className="block w-auto h-auto z-10 mix-blend-difference text-text-200"
              ref={ref}
              onMouseEnter={() => {
                if (!ref.current) return;
                const width = ref.current.getBoundingClientRect().width;
                const left = ref.current.getBoundingClientRect().left;
                console.log(ref.current, width, left);
                setPosition({
                  left: left,
                  width,
                  opacity: 1,
                });
              }}
            >
              <Link
                href={path}
                className={`block p-6 h-full text-sm/6 font-semibold`}
              >
                {title}
              </Link>
            </li>
          ))}
          <AnimatedBackground position={position} />
        </ul>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background-200 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link
              href={navigation[0].path}
              onClick={() => setMobileMenuOpen(false)}
              className={`-m-1.5 p-1.5 flex items-center gap-2 font-bold text-text-200 `}
            >
              <Image
                alt="Ahmed Lemssiah Logo"
                width={32}
                height={32}
                src="/Logo.svg"
                className="h-8 w-auto"
              />
              <span>Ahmed Lemssiah</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-text-100"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.slice(1).map(({ title, path }, index) => (
                  <Link
                    key={title}
                    href={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${
                      pathname.split("/")[2] === path.replace("/", "")
                        ? "text-text-200 bg-background-100"
                        : ""
                    }`}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}

type AnimatedBackgroundProps = {
  position: {
    left?: number;
    width?: number;
    opacity?: number;
  };
};

const AnimatedBackground = ({ position }: AnimatedBackgroundProps) => {
  return (
    <motion.li animate={position} className="absolute h-full z-0 bg-text-100" />
  );
};
