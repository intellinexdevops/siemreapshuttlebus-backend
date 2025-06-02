import * as React from "react"
import {
    Bus,
    Clock3Icon,
    Command,
    CreditCard,
    LayoutDashboard,
    LifeBuoy,
    // Map,
    Notebook,
    // PieChart,
    Send,
    TicketIcon,
    // Settings2,
    UserCircle,
} from "lucide-react"

import { NavMain } from "@/components/material/NavMain"
// import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/material/NavUser"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavContent } from "./NavContent"
import { Link } from "react-router"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/sr-shuttlebus",
            icon: LayoutDashboard,
            isActive: true
        },
        {
            title: "Booking",
            url: "booking",
            icon: Notebook,
        },
        {
            title: "User",
            url: "user",
            icon: UserCircle,
        },
        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings2,
        //     items: [
        //         {
        //             title: "General",
        //             url: "#",
        //         },
        //         {
        //             title: "Team",
        //             url: "#",
        //         },
        //         {
        //             title: "Billing",
        //             url: "#",
        //         },
        //         {
        //             title: "Limits",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    content: [
        {
            name: "Transportation",
            url: "transportation",
            icon: Bus,
        },
        {
            name: "Ticket",
            url: "ticket",
            icon: TicketIcon
        },
        {
            name: "Departure / Return Time",
            url: "timeslot",
            icon: Clock3Icon,
        },
        {
            name: "Payment",
            url: "payment",
            icon: CreditCard,
        },
        {
            name: "Support",
            url: "support",
            icon: LifeBuoy
        }
    ],
    pages: [

    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">SH.SHUTTLEBUS</span>
                                    <span className="truncate text-xs">Admin Panel</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavContent projects={data.content} />
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
