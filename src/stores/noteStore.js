import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const useNotesStore = create((set, get) => ({
  noteText: "",
  notes: [],
  isModalOpen: false,
  modalNoteText: "",
  editingNoteId: null,
  editingNoteContent: "",
  editingNoteTitle: "",

  setNoteText: (text) => set({ noteText: text }),
  setModalNoteText: (text) => set({ modalNoteText: text }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setEditingNote: (id, title, content) =>
    set({
      editingNoteId: id,
      editingNoteTitle: title || "",
      editingNoteContent: content,
    }),
  clearEditingNote: () =>
    set({
      editingNoteId: null,
      editingNoteTitle: "",
      editingNoteContent: "",
    }),

  // Fetch all notes
  fetchNotes: async () => {
    try {
      const response = await axios.get(`${API_URL}notes`);
      set({ notes: response.data });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },

  // Add note (inline input)
  addNote: async () => {
    const { noteText, notes } = get();
    if (!noteText.trim()) return;

    try {
      const response = await axios.post(`${API_URL}notes`, {
        content: noteText,
      });

      set({
        notes: [...notes, response.data],
        noteText: "",
      });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  },

  // Add note (modal)
  addModalNote: async () => {
    const { modalNoteText, notes } = get();
    if (!modalNoteText.trim()) return;

    try {
      const response = await axios.post(`${API_URL}notes`, {
        content: modalNoteText,
      });

      set({
        notes: [...notes, response.data],
        modalNoteText: "",
        isModalOpen: false,
      });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  },

  // Update note
  updateNote: async (id, title, content) => {
    try {
      const response = await axios.put(`${API_URL}notes/${id}`, {
        title,
        content,
      });

      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? response.data : note
        ),
      }));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  },

  // Delete note
  deleteNote: async (id) => {
    try {
      await axios.delete(`${API_URL}notes/${id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  },
}));
