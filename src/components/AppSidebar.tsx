import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarItem } from "@/types";
import { Star, PersonStanding } from "lucide-react";
import { useNavigate } from "react-router";

const sidebarItem: SidebarItem = {
  contents: [
    {
      icon: <Star />,
      text: "Levels",
      url: "/dashboard/levels",
    },
  ],
  accounts: [
    {
      icon: <PersonStanding />,
      text: "Admins",
      url: "/dashboard/admins",
    },
  ],
};

export function AppSidebar() {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItem.contents.map((content) => (
                <SidebarMenuItem key={content.text}>
                  <SidebarMenuButton onClick={() => navigate(content.url)}>
                    {content.icon}
                    <span>{content.text}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Accounts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItem.accounts.map((content) => (
                <SidebarMenuItem key={content.text}>
                  <SidebarMenuButton onClick={() => navigate(content.url)}>
                    {content.icon}
                    <span>{content.text}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
