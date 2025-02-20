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
  const formatDate = (dateString: string) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date(dateString);
    return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " at "  + date.getHours() + ":" + date.getMinutes()
  }

  const formattedNotes = notes.map(n => {
    return {...n, updatedAt: formatDate(n.updatedAt), createdAt: formatDate(n.createdAt)}
  });

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader style={{fontFamily: "instrument serif", fontSize: "2em", marginLeft: "0.5rem"}}>inland.</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {formattedNotes.length > 0 ? ( formattedNotes.map(n => (
                  <SidebarMenuItem key={n.id}>
                    <SidebarMenuButton asChild style={{ paddingTop: 25, paddingBottom: 25 }}>
                      <a href={""}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {n.content.length > 30 ? (
                            <span>{n.content.slice(0, 30) + "..."}</span>
                          ): (
                            <span>{n.content}</span>
                          )}
                          <span style={{ fontSize: "0.67em" }}>{n.updatedAt}</span>
                        </div>
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
