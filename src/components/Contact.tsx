import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="mb-4 block font-mono text-sm tracking-widest text-[var(--accent)] uppercase dark:text-[var(--primary)]">
            {t("contact.label")}
          </span>
          <h2 className="font-heading mb-6 text-4xl font-bold leading-tight md:text-6xl">
            {t("contact.title1")}
            <br />
            <span className="cyber-gradient-text">{t("contact.title2")}</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg font-light text-[var(--text-secondary)]">
            {t("contact.description")}
          </p>
          <a
            href="mailto:jiahe.bao@uq.net.au"
            className="clip-path-slant group inline-flex items-center gap-3 bg-[var(--primary)] px-10 py-5 font-mono text-sm font-bold tracking-wider text-black transition-all hover:brightness-110"
          >
            {t("contact.cta")}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-6 font-mono text-xs text-[var(--text-quaternary)]">{t("contact.hint")}</p>
        </motion.div>
      </div>
    </section>
  );
}
