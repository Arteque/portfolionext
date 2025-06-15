import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("hero.title.top")}</h1>
    </div>
  );
}
