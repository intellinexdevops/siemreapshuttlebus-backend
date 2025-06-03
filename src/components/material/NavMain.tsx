import { type LucideIcon } from "lucide-react"

import {
    Collapsible,
    // CollapsibleContent,
    // CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    // SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    // SidebarMenuSub,
    // SidebarMenuSubButton,
    // SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {

    const { pathname } = useLocation();
    const path = pathname.split('/');

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarMenu>

                {items.map((item) => {
                    const isActive = path[path.length - 1] === item.url;
                    console.log(item.url)
                    return (
                        <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={item.title} className={isActive ? 'hover:bg-neutral-900' : ''}>
                                    <Link to={item.url === 'dashboard' ? `/${item.url}` : item.url} className={`${isActive ? 'bg-neutral-800' : ''}`} >
                                        <item.icon className={isActive ? 'text-neutral-50' : 'text-neutral-500'} />
                                        <span className={isActive ? 'text-neutral-50' : 'text-neutral-500'} >{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                {/*item.items?.length ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight />
                                            <span className="sr-only">Toggle</span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : null*/}
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
