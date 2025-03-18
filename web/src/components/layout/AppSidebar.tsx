import {
  Avatar,
  AvatarFallback 
} from "@/components/ui/avatar"
import { Button } from "../ui/button"; 
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
import { LucideFilePlus2, LucideSave } from "lucide-react"; 
import { ModeToggle } from "../mode-toggle";
import { getTextFromHtml, formatDate } from "@/utils/utils";
import { Note } from "@/types";

const AppSidebar = ({ loggedUser, notes, handleLogout, handleSelectedNote }: { loggedUser: string | null, notes: Note[], handleLogout: () => void, handleSelectedNote: (n: Note) => void }) => {
  const formattedNotes = notes.map(n => {
    return {...n, updatedAt: formatDate(n.updatedAt), createdAt: formatDate(n.createdAt)}
  });

  return (
    <SidebarProvider>
      <Sidebar>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "0.5rem", marginRight: "0.5rem",  marginBottom: "-16px" }}>
          <SidebarHeader style={{ fontFamily: "sacramento", fontSize: "2.3em" }}>inland.</SidebarHeader>
          <div style={{ display: "flex", marginBottom: 7 }}>
            <Button variant="ghost" size="sm"><LucideFilePlus2 className="h-[1.2rem] w-[1.2rem]"/></Button>
            <Button variant="ghost" size="sm"><LucideSave className="h-[1.2rem] w-[1.2rem]" /></Button>
          </div>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>RECENT</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {formattedNotes.length > 0 ? ( formattedNotes.map(n => (
                  <SidebarMenuItem key={n.id}>
                    <SidebarMenuButton asChild
                      style={{ paddingTop: 25, paddingBottom: 25 }}
                      onClick={() => {
                        handleSelectedNote(n);
                      }}
                    >
                      <a href={"#"}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {getTextFromHtml(n.content).length > 27 ? (
                            <span>{getTextFromHtml(n.content).slice(0, 27) + "..."}</span>
                          ): (
                            <span>{getTextFromHtml(n.content)}</span>
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
          <SidebarFooter style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
            <ModeToggle />
          </SidebarFooter>
        )}
      </Sidebar>
    </SidebarProvider>
  )
}

export default AppSidebar;
