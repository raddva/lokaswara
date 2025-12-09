import {
  BookA,
  Home,
  Image,
  Inbox,
  LayoutDashboard,
  Newspaper,
  Utensils,
  Video,
  ListTree,
  MessageSquare,
} from "lucide-react";

export const SIDEBAR_MENU_LIST = {
  admin: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Content",
      url: "/admin/content",
      icon: Newspaper,
    },
    {
      title: "Content Categories",
      url: "/admin/categories",
      icon: ListTree,
    },
    {
      title: "Videos",
      url: "/admin/videos",
      icon: Video,
    },
    {
      title: "Images",
      url: "/admin/images",
      icon: Image,
    },
    {
      title: "Foods",
      url: "/admin/foods",
      icon: Utensils,
    },
    {
      title: "Dictionary",
      url: "/admin/dictionary",
      icon: BookA,
    },
    {
      title: "Requests",
      url: "/admin/content-request",
      icon: Inbox,
    },
    {
      title: "Feedbacks",
      url: "/admin/feedbacks",
      icon: MessageSquare,
    },
  ],
  user: [
    {
      title: "Dashboard",
      url: "",
      icon: Home,
    },
    {
      title: "Content",
      url: "/content",
      icon: Newspaper,
    },
    {
      title: "Videos",
      url: "/videos",
      icon: Video,
    },
    {
      title: "Images",
      url: "/images",
      icon: Image,
    },
    {
      title: "Foods",
      url: "/foods",
      icon: Utensils,
    },
    {
      title: "Dictionary",
      url: "/dictionary",
      icon: BookA,
    },
    {
      title: "Submit Request",
      url: "/content-request",
      icon: Inbox,
    },
  ],
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;
