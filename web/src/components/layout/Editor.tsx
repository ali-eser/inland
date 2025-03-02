import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Note } from "@/types";

const extensions = [StarterKit]

const Editor = ({ note }: { note: Note | Record<string, never> }) => {

  const editor = useEditor({
    extensions,
    content: note.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.content)
    }
  }, [editor, note]);

  return (
      <div style={{
        display: 'flex',
        padding: '2rem',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <p
          style={{ fontSize: "0.77em", marginTop: -15, marginBottom: 5 }}
          className="text-muted-foreground font-semibold"
        >
          {note.updatedAt}
        </p>
        <EditorContent spellCheck="false" className="editor-content" editor={editor} />
      </div>
  )
};

export default Editor;
