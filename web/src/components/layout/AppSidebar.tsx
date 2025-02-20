import {
  Avatar,
  AvatarFallback 
} from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
  SidebarMenuSubButton
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Note } from "@/types";

const AppSidebar = ({ loggedUser, notes, handleLogout }: { loggedUser: string | null, notes: Note[], handleLogout: () => void }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader style={{fontFamily: "instrument serif", fontSize: "2em"}}>inland.</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {notes.length > 0 ? ( notes.map(n => (
                  <SidebarMenuItem key={n.id}>
                    <SidebarMenuButton asChild>
                      <a href={""}>
                        <span>{n.content}</span>
                      </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                ))) : (
                  <SidebarMenuItem>
                    <SidebarMenuSubButton>You don't have anything to show!</SidebarMenuSubButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {loggedUser && (
          <SidebarFooter >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar>
                  <AvatarFallback>
                    {loggedUser[0].toUpperCase() + loggedUser[1].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p style={{ marginLeft: "10px" }}>{loggedUser}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
        )}
      </Sidebar>
    </SidebarProvider>
  )
}

export default AppSidebar;
