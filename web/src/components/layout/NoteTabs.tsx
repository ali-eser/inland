import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Note } from "@/types";

const NoteTabs = ({ activeNotes, handleSelectedNote, activeTab }: { activeNotes: Note[], handleSelectedNote: (n: Note) => void, activeTab: string }) => {

  return (
    <Tabs
      value={activeTab}
      className="relative mr-auto w-full pt-0"
    >
    <TabsList style={{ overflowY: 'hidden' }} className="w-full justify-start rounded-none border-b bg-sidebar p-0 text-primary">
      {activeNotes.length > 0 ? (
        activeNotes.map((n: Note) => (
          <TabsTrigger
            value={n.id.toString()}
            key={n.id}
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            onClick={() => handleSelectedNote(n)}
          >
            {n.content.length > 17 ? (
              n.content.slice(0,17) + "..."
            ): (
              n.content
            )}
          </TabsTrigger>
        ))
      ): (
        <div>
                  <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        <TabsTrigger
          value="defaultnewtab"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          New tab
        </TabsTrigger>
        
        </div>

      )}
    </TabsList>
  </Tabs>
  );
}

export default NoteTabs;
