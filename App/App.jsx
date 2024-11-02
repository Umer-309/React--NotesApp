import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText, setTempNoteText] = React.useState("")
    /**
     * Challenge:
     * 3. Create a useEffect that, if there's a `currentNote`, sets
     *    the `tempNoteText` to `currentNote.body`. (This copies the
     *    current note's text into the `tempNoteText` field so whenever 
     *    the user changes the currentNote, the editor can display the 
     *    correct text.
     * 4. TBA
     */


    // const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

    // const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

    // React.useEffect(() => {
    //     const unsubscribe = onSnapshot(notesCollection, snapshot => {
    //         const newArr = snapshot.docs.map(doc => ({
    //             ...doc.data(),
    //             id: doc.id
    //         }))
    //         setNotes(newArr)
    //     })
    //     return unsubscribe
    // }, [])

    // React.useEffect(() => {
    //     if (!currentNoteId) {
    //         setCurrentNoteId(notes[0]?.id)
    //     }
    // }, [notes])

    // React.useEffect(() => {
    //     if (currentNote) {
    //         setTempNoteText(currentNote.body)
    //     }
    // }, [currentNote])

    // React.useEffect(() => {
    //     const timeId = setTimeout(() => {
    //         if(tempNoteText !== currentNote.body){
    //             updateNote(tempNoteText)
    //         } 
    //     }, 500);
    //     return () => clearTimeout(timeId)
    // }, [tempNoteText])



    async function createNewNote() {
        console.log('Hello World')
        // const newNote = {
        //     body: "# Type your markdown note's title here",
        //     createdAt: Date.now(),
        //     updatedAt: Date.now()
        // }
        // const newNotesRef = await addDoc(notesCollection, newNote)
        // setCurrentNoteId(newNotesRef.id)
    }

    // function updateNote(text) {
    //     const docRef = doc(db, "notes", currentNoteId)
    //     setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
    // }

    // async function deleteNote(noteId) {
    //     const docRef = doc(db, "notes", noteId)
    //     await deleteDoc(docRef)
    // }


    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        <Editor
                            tempNoteText={tempNoteText}
                            setTempNoteText={setTempNoteText}
                        />
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>
            }
        </main>
    )
}
