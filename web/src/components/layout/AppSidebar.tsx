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
import { LucideFilePlus2, LucideSave, Trash2 } from "lucide-react"; 
import { ModeToggle } from "../mode-toggle";
import { parseTitle } from "@/utils/utils";
import { Note } from "@/types";

const AppSidebar = ({
  loggedUser,
  notes,
  isLoading,
  handleLogout,
  handleSelectedNote,
  handleCreateNote,
  handleNoteDelete
}: {
  loggedUser: string | null,
  notes: Note[],
  isLoading: boolean,
  handleLogout: () => void,
  handleSelectedNote: (n: Note) => void,
  handleCreateNote: () => void,
  handleNoteDelete: () => void
}) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "0.5rem", marginRight: "0.5rem",  marginBottom: "-16px" }}>
          <SidebarHeader style={{ fontFamily: "sacramento", fontSize: "2.3em" }}>inland.</SidebarHeader>
          <div style={{ display: "flex", marginBottom: 7 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCreateNote()}
            ><LucideFilePlus2 className="h-[1.2rem] w-[1.2rem]"/></Button>
            <Button variant="ghost" size="sm"><LucideSave className="h-[1.2rem] w-[1.2rem]" /></Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNoteDelete()}
            >
              <Trash2  />
            </Button>
          </div>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>RECENTS</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {notes.length > 0 ? (notes.map(n => (
                  <SidebarMenuItem key={n.id}>
                    <SidebarMenuButton asChild
                      style={{ paddingTop: 25, paddingBottom: 25 }}
                      onClick={() => {
                        handleSelectedNote(n);
                      }}
                    >
                      <a href={"#"}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span>{parseTitle(n.content)}</span>
                          <span style={{ fontSize: "0.67em" }}>{n.updatedAt}</span>
                        </div>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))) : isLoading ? (
                  <SidebarMenuItem>
                    <SidebarMenuSubButton>Loading</SidebarMenuSubButton>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuSubButton>You do not have any saved notes</SidebarMenuSubButton>
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
