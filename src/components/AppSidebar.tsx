"use client";

import {
  LayoutDashboard,
  Beef,
  Users,
  UserCheck,
  Wallet,
  Ticket,
  Truck,
  FileText,
  Tag,
  LogOut,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, type RolePanitia } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems: {
  title: string;
  url: string;
  icon: any;
  allowedRoles?: RolePanitia[];
}[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Hewan Qurban", url: "/hewan", icon: Beef },
  { title: "Shohibul Qurban", url: "/shohibul", icon: Users },
  {
    title: "Panitia",
    url: "/panitia",
    icon: UserCheck,
    allowedRoles: ["super_admin"],
  },
  {
    title: "Keuangan",
    url: "/keuangan",
    icon: Wallet,
    allowedRoles: ["super_admin", "admin_keuangan"],
  },
  {
    title: "Mustahiq & Kupon",
    url: "/mustahiq",
    icon: Ticket,
    allowedRoles: ["super_admin", "admin_kupon"],
  },
  {
    title: "Distribusi",
    url: "/distribusi",
    icon: Truck,
    allowedRoles: ["super_admin", "admin_kupon", "admin_hewan"],
  },
  {
    title: "Laporan",
    url: "/laporan",
    icon: FileText,
    allowedRoles: ["super_admin", "admin_keuangan"],
  },
  {
    title: "Cetak Label",
    url: "/cetak-label",
    icon: Tag,
    allowedRoles: ["super_admin", "admin_pendaftaran", "admin_kupon"],
  },
  {
    title: "Cetak Dokumen Hewan",
    url: "/cetak-dokumen",
    icon: ClipboardList,
    allowedRoles: [
      "super_admin",
      "admin_pendaftaran",
      "admin_hewan",
      "admin_kupon",
    ],
  },
];

const formatRole = (role: string) =>
  role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { signOut, hasRole, role, panitiaName } = useAuth();
  const pathname = usePathname();

  const visibleItems = menuItems.filter(
    (item) => !item.allowedRoles || hasRole(item.allowedRoles)
  );

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-sidebar-primary-foreground text-lg">🕌</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-sidebar-foreground truncate">
                Qurban Manager
              </h2>
              <p className="text-xs text-sidebar-foreground/60">1447H</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => {
                const isActive =
                  item.url === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "hover:bg-sidebar-accent text-sidebar-foreground flex items-center gap-2 px-2 py-2 rounded-md transition-colors",
                          isActive &&
                            "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar p-3 space-y-2">
        {panitiaName && !collapsed && (
          <div className="px-2 text-xs text-sidebar-foreground/70">
            <p className="font-medium text-sidebar-foreground truncate">
              {panitiaName}
            </p>
            {role && <p className="truncate">{formatRole(role)}</p>}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className={cn(
            "w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span className="ml-2">Keluar</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
