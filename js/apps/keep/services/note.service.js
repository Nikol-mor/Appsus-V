import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

let gNotes;
let gPinnedNotes;
const IMG_URL='https://source.unsplash.com/random/200x200?sig=incrementingIdentifier'
const createNotes = () => {
  let notes = storageService.loadFromStorage("NotesDB");
  if (!notes || !notes.length) {
    notes = [
      {
        id: "n101",
        isPinned: true,
        info: {
          img: "https://images.pexels.com/photos/1170659/pexels-photo-1170659.jpeg?cs=srgb&dl=pexels-gagan-kaur-1170659.jpg&fm=jpg",
          video: null,
          title: "Good Morning Coding Academy!",
          txt: null,
          todos: [],
        },
        backgroundColor: "#blue",
      },
      {
        id: "n102",
        info: {
          img: "https://media4.giphy.com/media/K3Sbp8fOgKye4/giphy.gif?cid=ecf05e476f0pbit43dyoqexjna7tliouf4sm5zxzkfygniqj&rid=giphy.gif&ct=g",
          video: null,
          title: "YESSS!",
          txt: "It's finally over!",
          todos: [],
        },
        backgroundColor: "#pink",
      },
      {
        id: "n103",
        info: {
          img: "https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?cs=srgb&dl=pexels-ylanite-koppens-776656.jpg&fm=jpg",
          video: null,
          title: "To Do:",
          txt: null,
          todos: [
            {
              id: utilService.makeId(),
              txt: "Get some plants",
              doneAt: Date.now(),
            },
            { id: utilService.makeId(), txt: "Keep them alive", doneAt: null },
          ],
        },
        backgroundColor: "#red",
      },
      {
        id: "n104",
        info: {
          img: "https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?cs=srgb&dl=pexels-victor-freitas-847483.jpg&fm=jpg",
          video: null,
          title: "Remember that feeling?",
          txt: "Yeah me neither...",
          todos: [
            { id: utilService.makeId(), txt: "Do homework", doneAt: null },
            {
              id: utilService.makeId(),
              txt: "Stay focused on the goal",
              doneAt: null,
            },
          ],
        },
        backgroundColor: "#green",
      },
    ];
  }
  gNotes = notes.filter((note) => !note.isPinned);
  saveNotesToStorage();
  let pinnedNotes = storageService.loadFromStorage("PinnedNotesDB");
  if (!pinnedNotes || !pinnedNotes.length) {
    gPinnedNotes = notes.filter((note) => note.isPinned);
    savePinnedNotesToStorage();
  }
};

const getPinnedNotes = () => {
  let pinnedNotes = storageService.loadFromStorage("PinnedNotesDB");
  if (!pinnedNotes || !pinnedNotes.length) {
    pinnedNotes = [];
    const pinnedNotesIds = gNotes
      .filter((note) => note.isPinned)
      .map((note) => note.id);
    pinnedNotesIds.forEach((id) => {
      const idx = gNotes.findIndex((note) => note.id === id);
      const currNote = gNotes[idx];
      pinnedNotes.push(currNote);
      gNotes.splice(idx, 1);
    });
  }
  gPinnedNotes = pinnedNotes;
  savePinnedNotesToStorage();
  return Promise.resolve(gPinnedNotes);
};

const query = (filterBy) => {
  if (!filterBy) return Promise.resolve(gNotes);
  if (filterBy.type) {
    const notesToShow = gNotes.filter((note) => {
      if (filterBy.type === "todos") return note.info.todos.length;
      return note.info[filterBy.type];
    });

    return Promise.resolve(notesToShow);
  } else if (filterBy.txt) {
    const searchStr = filterBy.txt;
    const notesToShow = gNotes.filter((note) => {
      if (note.info.txt) return note.info.txt.toLowerCase().includes(searchStr);
      if (note.info.title)
        return note.info.title.toLowerCase().includes(searchStr);
      if (note.info.todos)
        return note.info.todos.some((todo) => todo.includes(searchStr));
    });
    return Promise.resolve(notesToShow);
  }
  return Promise.resolve(gNotes);
};

const markUnmark = (note, todoId) => {
  if (!note) return;
  let currNote;
  let todo;
  let idx = gNotes.findIndex((n) => note.id === n.id);
  if (idx >= 0) {
    currNote = gNotes[idx];
    todo = currNote.info.todos.find((todo) => todo.id === todoId);
  } else {
    idx = gPinnedNotes.findIndex((n) => note.id === n.id);
    currNote = gPinnedNotes[idx];
    todo = currNote.info.todos.find((todo) => todo.id === todoId);
  }
  if (todo.doneAt) {
    todo.doneAt = null;
  } else {
    todo.doneAt = Date.now();
  }
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve(currNote);
};

const addNote = (noteInfo, mail) => {
  if (mail && !noteInfo) {
    noteInfo = {
      img: null,
      video: null,
      title: mail.subject,
      txt: mail.body,
      color: "#ffffff",
    };
  }
  const newNote = {
    id: utilService.makeId(),
    isPinned: false,
    info: {
      img: noteInfo.img,
      video: noteInfo.video,
      title: noteInfo.title,
      txt: noteInfo.txt,
      todos: [...(noteInfo.todos || [])],
    },
    backgroundColor: noteInfo.color,
  };
  gNotes.unshift(newNote);
  saveNotesToStorage();
  return Promise.resolve();
};

const editNoteContent = (noteInfo, id) => {
  let note = gNotes.find((n) => n.id === id);
  if (!note) note = gPinnedNotes.find((n) => n.id === id);
  note.info = noteInfo;
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const removeNote = (noteId) => {
  let idx = gNotes.findIndex((note) => note.id === noteId);
  if (idx >= 0) {
    gNotes.splice(idx, 1);
    saveNotesToStorage();
    return Promise.resolve(gNotes);
  } else {
    idx = gPinnedNotes.findIndex((note) => note.id === noteId);
    gPinnedNotes.splice(idx, 1);
    savePinnedNotesToStorage();
    return Promise.resolve(gPinnedNotes);
  }
};

const changeColor = (noteId, color) => {
  const note =
    gNotes.find((note) => note.id === noteId) ||
    gPinnedNotes.find((note) => note.id === noteId);
  note.backgroundColor = color;
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const duplicateNote = (noteId) => {
  let note;
  let idx = gNotes.findIndex((note) => note.id === noteId);
  if (idx < 0) {
    idx = gPinnedNotes.findIndex((note) => note.id === noteId);
    note = gPinnedNotes[idx];
    const endOfArr = gPinnedNotes.splice(idx);
    gPinnedNotes.push({ ...note, id: utilService.makeId() });
    gPinnedNotes = [...gPinnedNotes, ...endOfArr];
    savePinnedNotesToStorage();
  } else {
    note = gNotes[idx];
    const endOfArr = gNotes.splice(idx);
    gNotes.push({ ...note, id: utilService.makeId() });
    gNotes = [...gNotes, ...endOfArr];
    saveNotesToStorage();
  }
  return Promise.resolve();
};

const pinUnpinNote = (note) => {
  if (note.isPinned) {
    const idx = gPinnedNotes.findIndex((n) => n.id === note.id);
    const currNote = gPinnedNotes[idx];
    currNote.isPinned = false;
    gPinnedNotes.splice(idx, 1);
    gNotes.unshift(currNote);
  } else {
    const idx = gNotes.findIndex((n) => n.id === note.id);
    const currNote = gNotes[idx];
    currNote.isPinned = true;
    gNotes.splice(idx, 1);
    gPinnedNotes.unshift(currNote);
  }
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const getNoteById = (noteId) => {
  let note = gNotes.find((note) => note.id === noteId);
  if (note) return Promise.resolve(note);
  else {
    note = gPinnedNotes.find((note) => note.id === noteId);
    return Promise.resolve(note);
  }
};

const getId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const addTodo = (noteId, todo) => {
  let note = gNotes.find((note) => note.id === noteId);
  if (!note) note = gPinnedNotes.find((note) => note.id === noteId);
  note.info.todos.push({ id: utilService.makeId(), txt: todo, doneAt: null });
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const addNewNoteTodo = (todo) =>
  Promise.resolve({ id: utilService.makeId(), txt: todo, doneAt: null });

const removeTodo = (noteId, todoId) => {
  let note = gNotes.find((note) => note.id === noteId);
  if (!note) note = gPinnedNotes.find((note) => note.id === noteId);
  const idx = note.info.todos.findIndex((t) => t.id !== todoId);
  note.info.todos.splice(idx, 1);
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const saveNotesToStorage = () => {
  storageService.saveToStorage("NotesDB", gNotes);
};

const savePinnedNotesToStorage = () => {
  storageService.saveToStorage("PinnedNotesDB", gPinnedNotes);
};

export const NoteService = {
  query,
  editNoteContent,
  removeNote,
  changeColor,
  duplicateNote,
  getPinnedNotes,
  pinUnpinNote,
  markUnmark,
  addNote,
  getNoteById,
  getId,
  addTodo,
  addNewNoteTodo,
  removeTodo,
  createNotes,
};
