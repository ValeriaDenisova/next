export type MenuItem = {
  title: string;
  href: string;
};

export const MENU_CONFIG: MenuItem[] = [
  { title: "Recipes", href: "/" },
  { title: "Meals Categories", href: "/categories" },
  { title: "Diets", href: "/diets" },
  { title: "National Cuisines", href: "/cuisines" },
  // { title: "Menu Items", href: "/" },
  // { title: "Meal Planning", href: "/" },
];
