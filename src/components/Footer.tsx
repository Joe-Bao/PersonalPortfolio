import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-[#F4F4F4] py-20 dark:border-white/6 dark:bg-[#08080a]">
      {/* Marquee */}
      <div className="relative mb-16 flex overflow-x-hidden select-none">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="footer-marquee-text font-syne stroke-text cyber-gradient-text text-[4rem] font-bold text-transparent opacity-30 dark:opacity-40 md:text-[9rem]">
              {t("footer.marquee")}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
        <div className="col-span-2">
          <h3 className="font-heading mb-4 text-2xl text-black dark:text-white">{t("hero.name")}</h3>
          <p className="max-w-sm text-black/50 dark:text-white/50">{t("footer.description")}</p>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[var(--accent)] dark:text-[var(--primary)]">{t("footer.navigation")}</h4>
          <ul className="space-y-2 text-sm text-black/70 dark:text-white/60">
            {(["about", "skills", "experience", "projects"] as const).map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="transition-colors hover:text-[var(--accent)] dark:hover:text-[var(--primary)]">
                  {t(`header.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-black dark:text-white">{t("footer.connect")}</h4>
          <ul className="space-y-2 text-sm text-black/70 dark:text-white/60">
            <li><a href="https://github.com/Joe-Bao" className="transition-colors hover:text-[var(--accent)] dark:hover:text-[var(--primary)]">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/joe-bao-649146313/" className="transition-colors hover:text-[var(--accent)] dark:hover:text-[var(--primary)]">LinkedIn</a></li>
            <li><a href="mailto:jiahe.bao@uq.net.au" className="transition-colors hover:text-[var(--accent)] dark:hover:text-[var(--primary)]">Email</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-20 text-center font-mono text-xs text-black/30 dark:text-white/30">
        <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
        <p className="mt-2 text-[10px] text-black/20 dark:text-white/20">{t("footer.builtWith")}</p>
      </div>
    </footer>
  );
}
