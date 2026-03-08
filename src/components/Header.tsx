import { motion } from "framer-motion";
import { Moon, Sun, Menu, X, Github, Linkedin, Mail, Twitter, Languages } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SOCIALS = [
  { icon: <Github size={16} />, href: "https://github.com/Joe-Bao", label: "GitHub" },
  { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/joe-bao-649146313/", label: "LinkedIn" },
  { icon: <Mail size={16} />, href: "mailto:jiahe.bao@uq.net.au", label: "Email" },
];

interface NavItem {
  key: string;
  href: string;
  type: "anchor" | "route";
}

const NAV_ITEMS: NavItem[] = [
  { key: "about", href: "/#about", type: "anchor" },
  { key: "skills", href: "/#skills", type: "anchor" },
  { key: "experience", href: "/#experience", type: "anchor" },
  { key: "projects", href: "/#projects", type: "anchor" },
  { key: "blog", href: "/blog", type: "route" },
];

interface HeaderProps {
  dark: boolean;
  setDark: (v: boolean) => void;
}

const iconBtnClass =
  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] text-black/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 dark:border-white/20 dark:text-white/70 dark:hover:border-[var(--primary)] dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary)]/10";

const iconBtnMobileClass =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] text-black/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/20 dark:text-white/70 dark:hover:border-[var(--primary)] dark:hover:text-[var(--primary)]";

export default function Header({ dark, setDark }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
  };

  function handleAnchorClick(href: string) {
    setMobileOpen(false);
    if (isHome) {
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function renderNavItem(item: NavItem) {
    const className =
      "font-mono text-sm cursor-pointer text-black/80 transition-colors hover:text-[var(--accent)] dark:text-white/80 dark:hover:text-[var(--primary)]";
    const label = t(`header.${item.key}`);

    if (item.type === "route") {
      return (
        <Link key={item.key} to={item.href} className={className} onClick={() => setMobileOpen(false)}>
          {label}
        </Link>
      );
    }

    if (isHome) {
      return (
        <button key={item.key} className={className} onClick={() => handleAnchorClick(item.href)}>
          {label}
        </button>
      );
    }

    return (
      <Link key={item.key} to={item.href} className={className} onClick={() => setMobileOpen(false)}>
        {label}
      </Link>
    );
  }

  const langTooltip = i18n.language === "zh" ? "Switch to English" : "切换到中文";
  const themeTooltip = dark ? (i18n.language === "zh" ? "切换到浅色模式" : "Light mode") : (i18n.language === "zh" ? "切换到深色模式" : "Dark mode");

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-[#E2E2E2] bg-[#F9F9F9]/80 px-6 py-4 backdrop-blur-md dark:border-white/8 dark:bg-[#0a0a0c]/85"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-black dark:text-white">
          {t("hero.name")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 md:flex">
          {NAV_ITEMS.map(renderNavItem)}

          <div className="h-6 w-px bg-[#E2E2E2] dark:bg-white/15" />

          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} className={iconBtnClass}>
              {s.icon}
            </a>
          ))}

          <div className="h-6 w-px bg-[#E2E2E2] dark:bg-white/15" />

          <button onClick={toggleLang} className={iconBtnClass} title={langTooltip}>
            <Languages size={16} />
          </button>

          <button onClick={() => setDark(!dark)} className={iconBtnClass} title={themeTooltip}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} className={iconBtnMobileClass}>
              {s.icon}
            </a>
          ))}
          <button onClick={toggleLang} className={iconBtnMobileClass} title={langTooltip}>
            <Languages size={14} />
          </button>
          <button onClick={() => setDark(!dark)} className={iconBtnMobileClass} title={themeTooltip}>
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="cursor-pointer text-black/80 dark:text-white/80">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-col gap-4 border-t border-[#E2E2E2] pt-4 md:hidden dark:border-white/10"
        >
          {NAV_ITEMS.map(renderNavItem)}
        </motion.nav>
      )}
    </motion.header>
  );
}
