import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react"
import { useDispatch } from "react-redux";
import { setNotes } from "@/reducers/noteReducer";
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import { Note } from "@/types";

const extensions = [StarterKit, Typography]

const Editor = ({ note, noteState, handleNotePut }: { note: Note, noteState: Note[], handleNotePut: (n: Note) => void }) => {
  const dispatch = useDispatch();

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
      editor.commands.setContent(note.content);
    }
  }, [editor, note]);

  useEffect(() => {
    if (editor) {
      editor.on('update', ({ editor }) => {
        const now = new Date;
        const updatedNote: Note = {
          ...note,
          updatedAt: now.toISOString(),
          content: editor.getHTML()
        };

        const updatedNoteState: Note[] = noteState.map((existingNote) =>
          existingNote.id === note.id ? updatedNote : existingNote
        );
        console.log(noteState)
        dispatch(setNotes(updatedNoteState));
        handleNotePut(updatedNote);
      });

      return () => {
        editor.off('update');
      };
    }
  }, [editor, note, handleNotePut, dispatch, noteState]);

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
      <EditorContent spellCheck="false" className="editor-content" style={{ wordBreak: "break-word" }} editor={editor} />
    </div>
  )
};

export default Editor;
