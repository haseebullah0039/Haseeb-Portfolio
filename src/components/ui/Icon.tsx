import type { IconType } from "react-icons";
import {
  LuAppWindow,
  LuArrowRight,
  LuArrowUpRight,
  LuBadgeCheck,
  LuBookOpen,
  LuBoxes,
  LuBriefcase,
  LuBuilding2,
  LuChartColumn,
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuCloud,
  LuCode,
  LuDatabase,
  LuDumbbell,
  LuFileText,
  LuGlobe,
  LuHospital,
  LuIdCard,
  LuImage,
  LuLayers,
  LuLayoutDashboard,
  LuLock,
  LuMail,
  LuMapPin,
  LuMegaphone,
  LuMenu,
  LuMonitor,
  LuPalette,
  LuPenTool,
  LuPhone,
  LuPrinter,
  LuQuote,
  LuSchool,
  LuSearch,
  LuSend,
  LuServer,
  LuShare2,
  LuShoppingBag,
  LuShoppingCart,
  LuSmartphone,
  LuSparkles,
  LuStethoscope,
  LuStore,
  LuTarget,
  LuTrendingUp,
  LuUsers,
  LuWandSparkles,
  LuX,
} from "react-icons/lu";
import {
  SiCss,
  SiElectron,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
} from "react-icons/si";
import { FaBehance, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

/**
 * Central icon registry. Data files reference icons by these string keys so
 * content stays serialisable and separate from UI code.
 */
const icons: Record<string, IconType> = {
  // UI
  appWindow: LuAppWindow,
  arrowRight: LuArrowRight,
  arrowUpRight: LuArrowUpRight,
  badge: LuBadgeCheck,
  bookOpen: LuBookOpen,
  boxes: LuBoxes,
  briefcase: LuBriefcase,
  building: LuBuilding2,
  chart: LuChartColumn,
  check: LuCheck,
  chevronLeft: LuChevronLeft,
  chevronRight: LuChevronRight,
  cloud: LuCloud,
  code: LuCode,
  database: LuDatabase,
  dumbbell: LuDumbbell,
  fileText: LuFileText,
  globe: LuGlobe,
  hospital: LuHospital,
  idCard: LuIdCard,
  image: LuImage,
  layers: LuLayers,
  dashboard: LuLayoutDashboard,
  lock: LuLock,
  mail: LuMail,
  mapPin: LuMapPin,
  megaphone: LuMegaphone,
  menu: LuMenu,
  monitor: LuMonitor,
  palette: LuPalette,
  penTool: LuPenTool,
  phone: LuPhone,
  printer: LuPrinter,
  quote: LuQuote,
  school: LuSchool,
  search: LuSearch,
  send: LuSend,
  server: LuServer,
  share: LuShare2,
  bag: LuShoppingBag,
  cart: LuShoppingCart,
  smartphone: LuSmartphone,
  sparkles: LuSparkles,
  stethoscope: LuStethoscope,
  store: LuStore,
  target: LuTarget,
  trendingUp: LuTrendingUp,
  users: LuUsers,
  wand: LuWandSparkles,
  x: LuX,

  // Technology brands
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  electron: SiElectron,
  mongodb: SiMongodb,
  mysql: SiMysql,

  // Social
  linkedin: FaLinkedinIn,
  github: FaGithub,
  behance: FaBehance,
  whatsapp: FaWhatsapp,
  email: LuMail,
};

/** Maps a technology display name to its icon key, if one exists. */
export const techIconKey: Record<string, string> = {
  HTML: "html",
  CSS: "css",
  JavaScript: "javascript",
  React: "react",
  "Next.js": "nextjs",
  "Node.js": "nodejs",
  "Express.js": "express",
  "Electron.js": "electron",
  MongoDB: "mongodb",
  MySQL: "mysql",
};

type IconProps = {
  name: string;
  size?: number;
  className?: string;
  title?: string;
};

export function Icon({ name, size = 20, className, title }: IconProps) {
  const Cmp = icons[name] ?? LuSparkles;
  return (
    <Cmp
      size={size}
      className={className}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      role={title ? "img" : undefined}
    />
  );
}
