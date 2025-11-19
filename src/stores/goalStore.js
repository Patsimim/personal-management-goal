import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useGoalStore = create((set, get) => ({
  // State
  goals: [],
  currentGoal: null,
  statistics: null,
  upcomingDeadlines: [],
  loading: false,
  error: null,

  // Fetch all goals with statistics
  fetchGoals: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/goals`);
      set({
        goals: response.data.data,
        statistics: response.data.statistics,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch goals",
        loading: false,
      });
      throw error;
    }
  },

  // Create new goal
  createGoal: async (goalData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/goals`, goalData);
      set((state) => ({
        goals: [...state.goals, response.data.data],
        loading: false,
      }));
      // Refresh statistics
      await get().fetchGoals();
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create goal",
        loading: false,
      });
      throw error;
    }
  },

  // Get single goal details
  fetchGoal: async (goalId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/goals/${goalId}`);
      set({
        currentGoal: response.data.data,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch goal",
        loading: false,
      });
      throw error;
    }
  },

  // Update goal
  updateGoal: async (goalId, goalData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/goals/${goalId}`, goalData);
      set((state) => ({
        goals: state.goals.map((goal) =>
          goal.id === goalId ? response.data.data : goal
        ),
        currentGoal:
          state.currentGoal?.id === goalId
            ? response.data.data
            : state.currentGoal,
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update goal",
        loading: false,
      });
      throw error;
    }
  },

  // Delete goal
  deleteGoal: async (goalId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/goals/${goalId}`);
      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== goalId),
        currentGoal:
          state.currentGoal?.id === goalId ? null : state.currentGoal,
        loading: false,
      }));
      // Refresh statistics
      await get().fetchGoals();
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete goal",
        loading: false,
      });
      throw error;
    }
  },

  // Update goal progress
  updateProgress: async (goalId, progressData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/goals/${goalId}/progress`,
        progressData
      );
      set((state) => ({
        goals: state.goals.map((goal) =>
          goal.id === goalId ? response.data.data.goal : goal
        ),
        currentGoal:
          state.currentGoal?.id === goalId
            ? response.data.data.goal
            : state.currentGoal,
        loading: false,
      }));
      // Refresh statistics after progress update
      await get().fetchGoals();
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update progress",
        loading: false,
      });
      throw error;
    }
  },

  // Fetch upcoming deadlines
  fetchUpcomingDeadlines: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/goals-upcoming-deadlines`);
      set({
        upcomingDeadlines: response.data.data,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch deadlines",
        loading: false,
      });
      throw error;
    }
  },

  // Fetch goals by category
  fetchGoalsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/goals-by-category/${category}`
      );
      set({
        goals: response.data.data,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch goals by category",
        loading: false,
      });
      throw error;
    }
  },

  // Fetch detailed statistics
  fetchStatistics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/goals-statistics`);
      set({
        statistics: response.data.statistics,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch statistics",
        loading: false,
      });
      throw error;
    }
  },

  // Clear current goal
  clearCurrentGoal: () => {
    set({ currentGoal: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  resetStore: () => {
    set({
      goals: [],
      currentGoal: null,
      statistics: null,
      upcomingDeadlines: [],
      loading: false,
      error: null,
    });
  },
}));

export default useGoalStore;
