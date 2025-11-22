"use client";

import React, { useState, useEffect } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import AddGoalModal from "./GoalAddModal";
import useGoalStore from "@/stores/goalStore";
import toast from "react-hot-toast";

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    goals,
    statistics,
    upcomingDeadlines,
    loading,
    fetchGoals,
    fetchUpcomingDeadlines,
  } = useGoalStore();

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchGoals();
        await fetchUpcomingDeadlines();
      } catch (error) {
        toast.error("Failed to load goals data");
      }
    };

    loadData();
  }, [fetchGoals, fetchUpcomingDeadlines]);

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  // Get statistics with fallbacks
  const totalGoals = statistics?.total_goals || 0;
  const completedGoals = statistics?.completed_goals || 0;
  const inProgressGoals = statistics?.ongoing_goals || 0;
  const overallProgress = statistics?.overall_progress || 0;

  // Loading state
  if (loading && goals.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-12 h-12 animate-spin text-gray-800 mx-auto mb-4' />
          <p className='text-gray-600'>Loading goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Add Goal Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className='mb-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
        >
          <Plus className='w-5 h-5' />
          ADD GOAL
        </button>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='bg-white border-2 border-gray-300 rounded-lg p-6 text-center'>
            <div className='text-sm font-medium text-gray-700 mb-2'>
              TOTAL GOALS
            </div>
            <div className='text-5xl font-bold text-gray-900'>{totalGoals}</div>
          </div>

          <div className='bg-white border-2 border-gray-300 rounded-lg p-6 text-center'>
            <div className='text-sm font-medium text-gray-700 mb-2'>
              GOALS COMPLETED
            </div>
            <div className='text-5xl font-bold text-gray-900'>
              {completedGoals}/{totalGoals}
            </div>
          </div>

          <div className='bg-white border-2 border-gray-300 rounded-lg p-6 text-center'>
            <div className='text-sm font-medium text-gray-700 mb-2'>
              GOALS IN PROGRESS
            </div>
            <div className='text-5xl font-bold text-gray-900'>
              {inProgressGoals}
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className='bg-white border-2 border-gray-300 rounded-lg p-6 mb-6'>
          <div className='text-center text-lg font-medium text-gray-900 mb-4'>
            PROGRESS
          </div>
          <div className='relative h-8 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='absolute top-0 left-0 h-full bg-gray-500 transition-all duration-300'
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className='text-center mt-2 text-sm text-gray-600'>
            {overallProgress.toFixed(1)}%
          </div>
        </div>

        {/* Goal Cards */}
        {goals.length === 0 ? (
          <div className='bg-white border-2 border-gray-300 rounded-lg p-12 text-center mb-6'>
            <p className='text-gray-500 text-lg mb-4'>No goals yet</p>
            <p className='text-gray-400 mb-6'>
              Click "ADD GOAL" to create your first goal
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {goals.map((goal) => {
              const progress = calculateProgress(
                goal.current_value,
                goal.target_value
              );
              const isCompleted = goal.status === "completed";

              return (
                <div
                  key={goal.id}
                  className='bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow'
                >
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                      {goal.title}
                    </h3>
                    <span className='text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full'>
                      {goal.category}
                    </span>
                  </div>

                  <div className='text-2xl font-bold text-gray-900 mb-2'>
                    {goal.current_value.toLocaleString()}
                    {goal.metric && ` ${goal.metric}`} /{" "}
                    {goal.target_value.toLocaleString()}
                    {goal.metric && ` ${goal.metric}`}
                  </div>

                  {/* Progress Bar */}
                  <div className='relative h-8 bg-gray-200 rounded-full overflow-hidden mb-4'>
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                        isCompleted ? "bg-green-500" : "bg-gray-500"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                    <div className='absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700'>
                      {progress.toFixed(1)}%
                    </div>
                  </div>

                  {/* Status */}
                  <div className='flex justify-between items-center'>
                    <div className='text-sm font-medium text-gray-700 capitalize'>
                      {goal.type}
                    </div>

                    {/* Completed Badge */}
                    {isCompleted ? (
                      <div className='flex items-center gap-2 text-green-600'>
                        <div className='w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center'>
                          <Check className='w-4 h-4' />
                        </div>
                        <span className='font-medium'>Completed</span>
                      </div>
                    ) : goal.status === "ongoing" ? (
                      <div className='text-gray-700 font-medium'>Ongoing</div>
                    ) : (
                      <div className='text-yellow-600 font-medium capitalize'>
                        {goal.status}
                      </div>
                    )}
                  </div>

                  {/* Deadline */}
                  <div className='mt-3 pt-3 border-t border-gray-200'>
                    <div className='text-sm text-gray-600'>
                      Deadline:{" "}
                      <span className='font-medium'>{goal.deadline}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upcoming Deadlines */}
        <div className='bg-white border-2 border-gray-300 rounded-lg p-6'>
          <div className='text-center text-lg font-medium text-gray-900 mb-6'>
            UPCOMING DEADLINES
          </div>

          {upcomingDeadlines.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              No upcoming deadlines
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b-2 border-gray-300'>
                    <th className='text-left py-4 px-4 font-medium text-gray-900'>
                      DEADLINE
                    </th>
                    <th className='text-left py-4 px-4 font-medium text-gray-900'>
                      GOAL
                    </th>
                    <th className='text-left py-4 px-4 font-medium text-gray-900'>
                      DAYS LEFT
                    </th>
                    <th className='text-left py-4 px-4 font-medium text-gray-900'>
                      PROGRESS
                    </th>
                    <th className='text-left py-4 px-4 font-medium text-gray-900'>
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingDeadlines.map((item) => {
                    const daysLeft = item.days_remaining;
                    const isUrgent = daysLeft <= 7 && daysLeft >= 0;
                    const isOverdue = daysLeft < 0;

                    return (
                      <tr
                        key={item.id}
                        className='border-b border-gray-200 hover:bg-gray-50'
                      >
                        <td className='py-4 px-4'>
                          <span className='font-medium text-gray-900'>
                            {item.deadline}
                          </span>
                        </td>
                        <td className='py-4 px-4'>
                          <span className='text-gray-700'>{item.title}</span>
                        </td>
                        <td className='py-4 px-4'>
                          <span
                            className={`font-medium ${
                              isOverdue
                                ? "text-red-600"
                                : isUrgent
                                ? "text-orange-600"
                                : "text-gray-700"
                            }`}
                          >
                            {isOverdue
                              ? `${Math.abs(daysLeft)} days overdue`
                              : `${daysLeft} days`}
                          </span>
                        </td>
                        <td className='py-4 px-4'>
                          <div className='flex items-center gap-2'>
                            <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[100px]'>
                              <div
                                className='h-full bg-gray-500 transition-all'
                                style={{
                                  width: `${item.progress_percentage}%`,
                                }}
                              />
                            </div>
                            <span className='text-sm text-gray-600'>
                              {item.progress_percentage.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className='py-4 px-4'>
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                              item.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : item.status === "ongoing"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.status === "completed" && (
                              <Check className='w-3 h-3' />
                            )}
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
