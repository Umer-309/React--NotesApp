import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';

export default function App() {
	const [notes, setNotes] = React.useState([]);
	const [currentNoteId, setCurrentNoteId] = React.useState('');
	const [tempNoteText, setTempNoteText] = React.useState('');

	const currentNote =
		notes.find((note) => note._id === currentNoteId) || notes[0];

	const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

	React.useEffect(() => {
		fetch('http://localhost:3001/notes')
			.then((res) => res.json())
			.then((data) => setNotes(data));
		return () => { };
	}, []);

	React.useEffect(() => {
		if (!currentNoteId) {
			setCurrentNoteId(notes[0]?._id);
		}
	}, [notes]);

	React.useEffect(() => {
		if (currentNote) {
			setTempNoteText(currentNote.body);
		}
	}, [currentNote]);

	React.useEffect(() => {
		const timeId = setTimeout(() => {
			if (tempNoteText !== currentNote.body) {
				updateNote(tempNoteText);
			}
		}, 500);
		return () => clearTimeout(timeId);
	}, [tempNoteText]);

	const createNewNote = async () => {
		await fetch('http://localhost:3001/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				body: "# Type your markdown note's title here",
				createdAt: Date.now(),
				updatedAt: Date.now(),
			}),
		})
			.then((data) => data.json())
			.then((newNote) => {
				setNotes(prevNotes => [newNote, ...prevNotes]);
				setCurrentNoteId(newNote._id);
		});
	};

	const updateNote = async (text) => {
		const updatedAt = Date.now();
		await fetch('http://localhost:3001/notes', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: currentNoteId,
				body: text,
				updatedAt,
			}),
		})
			.then((res) => res.json())
			.then(() => setNotes(prevNotes => prevNotes.map(note => note._id === currentNoteId ? { ...note, body: text, updatedAt } : note)))
			.catch((err) => console.error(err));
	};

	const deleteNote = async (noteId) => {
		await fetch('http://localhost:3001/notes', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: noteId,
			}),
		})
			.then((res) => {
				if (res.ok) {
					setNotes(prevNotes => prevNotes.filter((note) => note._id !== noteId));
					setCurrentNoteId(notes[0]?._id);
				}
			})
			.catch((err) => console.error(err));
	};

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
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
			) : (
				<div className="no-notes">
					<h1>You have no notes</h1>
					<button className="first-note" onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
