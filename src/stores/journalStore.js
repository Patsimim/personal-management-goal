import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useJournalStore = create((set, get) => ({
  // State
  entries: [],
  currentEntry: null,
  isLoading: false,
  error: null,

  // Modal State
  isModalOpen: false,
  modalMode: "create", // 'create' or 'edit'

  // Form State
  formData: {
    title: "",
    content: "",
    tags: [],
    mood: "",
    theme: null,
    selectedDate: new Date().getDate(),
  },

  // Modal Actions
  openModal: (mode = "create", entry = null) => {
    if (mode === "edit" && entry) {
      set({
        isModalOpen: true,
        modalMode: "edit",
        currentEntry: entry,
        formData: {
          title: entry.title || "",
          content: entry.content || "",
          tags: entry.tags || [],
          mood: entry.mood || "",
          theme: entry.theme || null,
          selectedDate: new Date(entry.entry_date).getDate(),
        },
      });
    } else {
      set({
        isModalOpen: true,
        modalMode: "create",
        currentEntry: null,
        formData: {
          title: "",
          content: "",
          tags: [],
          mood: "",
          theme: null,
          selectedDate: new Date().getDate(),
        },
      });
    }
  },

  closeModal: () => {
    set({
      isModalOpen: false,
      modalMode: "create",
      currentEntry: null,
      formData: {
        title: "",
        content: "",
        tags: [],
        mood: "",
        theme: null,
        selectedDate: new Date().getDate(),
      },
    });
  },

  updateFormData: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  resetFormData: () => {
    set({
      formData: {
        title: "",
        content: "",
        tags: [],
        mood: "",
        theme: null,
        selectedDate: new Date().getDate(),
      },
    });
  },

  // API Actions
  fetchEntries: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}journals`);
      set({ entries: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching entries:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  fetchEntry: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}journals/${id}`);
      set({ currentEntry: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching entry:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  createEntry: async (entryData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}journals`, entryData);
      set((state) => ({
        entries: [response.data, ...state.entries],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      console.error("Error creating entry:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  updateEntry: async (id, entryData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}journals/${id}`, entryData);
      set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id ? response.data : entry
        ),
        currentEntry:
          state.currentEntry?.id === id ? response.data : state.currentEntry,
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      console.error("Error updating entry:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  deleteEntry: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}journals/${id}`);
      set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
        currentEntry: state.currentEntry?.id === id ? null : state.currentEntry,
        isLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error deleting entry:", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  // Combined save action (handles both create and update)
  saveEntry: async (entryData) => {
    const { modalMode, currentEntry } = get();

    if (modalMode === "edit" && currentEntry) {
      const result = await get().updateEntry(currentEntry.id, entryData);
      if (result) {
        get().closeModal();
      }
      return result;
    } else {
      const result = await get().createEntry(entryData);
      if (result) {
        get().closeModal();
      }
      return result;
    }
  },

  setCurrentEntry: (entry) => set({ currentEntry: entry }),

  clearError: () => set({ error: null }),

  clearCurrentEntry: () => set({ currentEntry: null }),
}));

export default useJournalStore;
