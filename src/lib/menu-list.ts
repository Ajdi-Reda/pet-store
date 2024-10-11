import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  ShoppingCart,
  ListOrdered,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/app/products",
          label: "Products",
          active: pathname.includes("/app/products"),
          icon: ShoppingCart,
          // submenus: [
          //   {
          //     href: "/posts",
          //     label: "All Posts"
          //   },
          //   {
          //     href: "/posts/new",
          //     label: "New Post"
          //   }
          // ]
        },
        {
          href: "/app/orders",
          label: "Orders",
          active: pathname.includes("/app/orders"),
          icon: ListOrdered,
        },
        // {
        //   href: "/tags",
        //   label: "Tags",
        //   active: pathname.includes("/tags"),
        //   icon: Tag,
        // },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
        },
      ],
    },
  ];
}
