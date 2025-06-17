const notes = JSON.parse(localStorage.getItem('notes') || '{}');


document.addEventListener('DOMContentLoaded', () => {
    Object.entries(notes).forEach(([id, note]) => drawNote(note, id));
});

/**
 * This function stores a new note in localStorage and draws it on the page.
 */
function addNote() {
    const id = `note_${Date.now()}`;
    const note = { title: '', note: '' };
    notes[id] = note;
    localStorage.setItem('notes', JSON.stringify(notes));
    drawNote(note, id);
}

/**
 * This function draws a note on the page.
 * @param {{title: string, note: string}} note The note object containing title and content.
 * @param {string} id The unique identifier for the note.
 */
function drawNote(note, id) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.className = 'note';
    const form = document.createElement('form');
    form.id = id;
    form.action = '';
    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-symbols-outlined';
    deleteIcon.textContent = 'delete';
    removeButton.addEventListener('click', e => {
        e.preventDefault();
        delete notes[id];
        localStorage.setItem('notes', JSON.stringify(notes));
        section.remove();
    });
    removeButton.appendChild(deleteIcon);
    form.appendChild(removeButton);
    const titleInput = Object.assign(document.createElement('input'), {
        type: 'text',
        className: 'note-title',
        placeholder: 'Add a title',
        value: note.title || ''
    });
    titleInput.setAttribute('aria-label', 'Note Title');
    titleInput.addEventListener('input', e => {
        if (e.target.value) {
            note.title = e.target.value;
            updateLocalStorage(note, id);
        }
    });
    form.appendChild(titleInput);
    const contentTextarea = Object.assign(document.createElement('textarea'), {
        className: 'note-content',
        name: 'note-content',
        placeholder: 'Note something here...',
        value: note.note || ''
    });
    contentTextarea.setAttribute('aria-label', 'Note Content');
    contentTextarea.addEventListener('input', e => {
        note.note = e.target.value;
        updateLocalStorage(note, id);
    });
    form.appendChild(contentTextarea);
    section.appendChild(form);
    main.appendChild(section);
}

function updateLocalStorage(note, id) {
    notes[id] = note;
    localStorage.setItem('notes', JSON.stringify(notes));
}
