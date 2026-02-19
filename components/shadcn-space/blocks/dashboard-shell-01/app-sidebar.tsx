"use client";
import React from "react";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo/logo";
import { NavMain } from "@/components/shadcn-space/blocks/dashboard-shell-01/nav-main";
import { AlignStartVertical, BarChart3, CircleUserRound, ClipboardList, History, Languages, List, LucideIcon, Mail, Notebook, NotepadText, PlusCircle, Shield, Table, Ticket, UserPlus, Users, } from "lucide-react";
import { SiteHeader } from "@/components/shadcn-space/blocks/dashboard-shell-01/site-header";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css'
import Image from "next/image";
import logo from '@/public/DailyChronicle.svg'

export type NavItem = {
    label?: string;
    isSection?: boolean;
    title?: string;
    icon?: LucideIcon;
    href?: string;
    children?: NavItem[];
};

export const navData: NavItem[] = [
    // Dashboards Section
    { label: "Dashboards", isSection: true },
    { title: "Analytics", icon: BarChart3, href: "/dashboard" },

    { label: "Post", isSection: true },
    { title: "All Posts", icon: List, href: "#" },
    { title: "Create New", icon: PlusCircle, href: "#" },
    { title: "Categories", icon: List, href: "/dashboard/categories" },

    { label: "User Management", isSection: true },
    { title: "All Users", icon: Users, href: "#" },
    { title: "Staff (Editors)", icon: Shield, href: "#" },
    { title: "Role Requests", icon: UserPlus, href: "#" },

    { label: "Newsletter", isSection: true },
    { title: "Send Email", icon: Mail, href: "#" },
    { title: "Subscribers", icon: Users, href: "#" },
    { title: "History", icon: History, href: "#" },
];

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <Sidebar className="py-4 px-0 bg-background">
                <div className="flex flex-col gap-6 bg-background">
                    {/* ---------------- Header ---------------- */}
                    <SidebarHeader className="py-0 px-4">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Link href="/dashboard" className="w-full h-full">
                                    <Image src={logo} alt="Daily Chronicle" className="mx-auto" width={202} height={34} />
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>

                    {/* ---------------- Content ---------------- */}
                    <SidebarContent className="overflow-hidden gap-0 px-0">
                        <SimpleBar autoHide={true} className="h-[calc(100vh-61px)] border-b border-border">
                            <div className="px-4">
                                <NavMain items={navData} />
                            </div>
                        </SimpleBar>
                        {/* card */}
                        {/* <div className="pt-4 px-4">
                            <Card className="shadow-none ring-0 bg-blue-500/10 px-4 py-6">
                                <CardContent className="p-0 flex flex-col gap-3 items-center">
                                    <img
                                        src="https://images.shadcnspace.com/assets/backgrounds/download-img.png"
                                        alt="sidebar-img"
                                        width={74}
                                        height={74}
                                        className="h-20 w-20"
                                    />
                                    <div className="flex flex-col gap-4 items-center">
                                        <div>
                                            <p className="text-base font-semibold text-card-foreground text-center">
                                                Grab Pro Now
                                            </p>
                                            <p className="text-sm font-regular text-muted-foreground text-center">
                                                Customize your admin
                                            </p>
                                        </div>
                                        <Button className="w-fit px-4 py-2 shadow-none cursor-pointer rounded-xl bg-blue-500 font-medium hover:bg-blue-500/80">
                                            Get Premium
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div> */}
                    </SidebarContent>
                </div>
            </Sidebar>

            {/* ---------------- Main ---------------- */}
            <div className="flex flex-1 flex-col">
                <header className="sticky top-0 z-50 flex items-center border-b px-6 py-3 bg-background">
                    <SiteHeader />
                </header>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
};

export default AppSidebar;
