export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Horizon Flicks",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Watch List",
      href: "/docs",
    },
  ],
  navMenuItems: [
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
