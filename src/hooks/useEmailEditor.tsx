import { useRef, useState } from "react"
import { TType, applyStyle } from "../components/email-editor/apply-style"
import { EraserIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

export const useEditor = () => {
    const [text, setText] = useState('Enter the text')
    const [selectionStart, setSelectionStart] = useState(0)
    const [selectionEnd, setSelectionEnd] = useState(0)
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    const BUTTONS = [
        {
          id: 1,
          icon: <EraserIcon />,
          size: 16,
          click: () => setText('')
        },
        {
          id: 2,
          icon: <BoldIcon />,
          size: 16,
          click: () => applyFormat('bold')
        },
        {
          id: 3,
          icon: <ItalicIcon />,
          size: 16,
          click: () => applyFormat('italic')
        },
        {
          id: 4,
          icon: <UnderlineIcon />,
          size: 16,
          click: () => applyFormat('underline')
        }
      ]

    const updateSelection = () => {
      if (!textRef.current) return
      setSelectionStart(textRef.current.selectionStart)
      setSelectionEnd(textRef.current.selectionEnd)
    }
  
    const applyFormat = (type: TType) => {
      
      const selectedText = text.substring(selectionStart, selectionEnd); //Picked fragment
  
      if (!selectedText) return
  
      const before = text.substring(0, selectionStart)// Text before picked fragment
      const after = text.substring(selectionEnd)// Text after picked fragment
      setText(before + applyStyle(type, selectedText) + after)
    }

    return {text, textRef, BUTTONS, applyFormat, updateSelection, setText}
}