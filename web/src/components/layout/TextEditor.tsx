import { useEffect, useRef } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import { Note } from "@/types";

const extensions = [
  StarterKit,
  Typography
];

const TextEditor = ({
  note,
  handleNotePut
}: {
  note: Note | Record<string, never>,
  handleNotePut: (updatedNote: Note) => void }) => {

  const currentNoteIdRef = useRef<number | null>(null);
  const editor = useEditor({
    extensions,
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      }
    }
  });

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.content || '', false);
      currentNoteIdRef.current = note.id;
    }
  }, [editor, note]);

  useEffect(() => {
    if (editor) {
      editor.on('update', ({ editor }: { editor: Editor }) => {
        const now = new Date;
        const updatedNote: Note = {
          id: note.id,
          createdAt: note.createdAt,
          userId: note.userId,
          updatedAt: now.toISOString(),
          content: editor.getHTML()
        };

        handleNotePut(updatedNote);
      });

      return () => {
        editor.off('update');
      };
    }
  }, [editor, note, handleNotePut]);

  if (!editor) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      paddingLeft: '4rem',
      paddingRight: '4rem',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <p
        style={{ fontSize: "0.77em" }}
        className="text-muted-foreground font-semibold"
      >
        {note.updatedAt}
      </p>
      <EditorContent autoFocus spellCheck="false" className="editor-content" style={{ wordBreak: "break-word" }} editor={editor} />
    </div>
  )
};

export default TextEditor;
