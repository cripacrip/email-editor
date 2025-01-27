import styles from "./EmailEditor.module.scss";
import parse from 'html-react-parser'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "../../services/email.service";
import { useEditor } from "../../hooks/useEmailEditor";

export function EmailEditor() {

  const { BUTTONS, text, textRef, updateSelection, setText  } = useEditor()

  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationKey: ['create email'],
    mutationFn: () => emailService.sendEmail(text),
    onSuccess() {
      setText('')
      queryClient.refetchQueries({ queryKey: ['email list'] })
    }
  })

  return (
    <div>
      <h1>Email editor</h1>
      { text && 
        <div className={styles.preview}>{parse(text)}</div>
      }
      <div className={styles.card}>
        <textarea
          ref={textRef}
          spellCheck='false'
          className={styles.editor}
          onSelect={updateSelection}
          value={text}
          onChange={e => setText(e.target.value)}
        > 
          { text }
        </textarea>

        <div className={styles.actions}>
          <div className={styles.tools}>
            { BUTTONS.map(btn => 
              <button
                key={btn.id} 
                onClick={btn.click}
                data-size={btn.size}
              >
                {btn.icon}
              </button>) 
            }
          </div>
          <button disabled={isPending} onClick={() => mutate()}>Send now</button>
        </div>

      </div>
    </div>
  );
}
