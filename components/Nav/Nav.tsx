"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { NavigationMenu } from "radix-ui";

const Nav = () => {
  const pathname = usePathname();
  const t = useTranslations("header.nav.links");
  console.log(pathname);
  const Links = [
    { title: t("hero.text"), path: "/" },
    { title: t("skills.text"), path: "/skills" },
    { title: t("about.text"), path: "/about" },
    { title: t("projects.text"), path: "/projects" },
    { title: t("services.text"), path: "/services" },
    { title: t("contact.text"), path: "/contact" },
  ];
  return (
    <NavigationMenu.Root className="relative z-10 flex justify-center">
      <NavigationMenu.List>
        {Links.map(({ title, path }, index) => (
          <NavigationMenu.Item key={`${title}-${index}`}>
            <NavigationMenu.Link href={path}>{title}</NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
export default Nav;
