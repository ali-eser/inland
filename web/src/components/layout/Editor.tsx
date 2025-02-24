import { useEffect } from "react";
import { useEditor, FloatingMenu, BubbleMenu, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const extensions = [StarterKit]

const Editor = ({ content }: { content: string }) => {

  const editor = useEditor({
    extensions,
    content,
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [editor, content]);

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  )
};

export default Editor;
