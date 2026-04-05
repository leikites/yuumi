export type NavItem = {
  label: string;
  href: string;
};

export const siteMeta = {
  name: "Yuumi",
  title: "Personal Website",
  tagline: "Designer, builder, and curious mind shaping thoughtful digital work.",
  intro: "A personal space for selected projects, experience, writing, and future experiments.",
  email: "hello@yuumi.dev",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
];
