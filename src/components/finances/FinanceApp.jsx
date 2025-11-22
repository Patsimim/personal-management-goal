"use client";

import React, { useState } from "react";
import { Modal, FormInput, ModalActions } from "./FinanceModal";

export default function PersonalFinanceDashboard() {
  const [income, setIncome] = useState([
    { type: "Salary", amount: 40000 },
    { type: "Freelance", amount: 30000 },
    { type: "Business", amount: 15000 },
    { type: "Other", amount: 5000 },
  ]);

  const [expenses, setExpenses] = useState({
    fixed: 8000,
    variable: 7000,
  });

  const [goals, setGoals] = useState([
    {
      name: "Emergency Fund",
      target: 50000,
      saved: 16000,
      deadline: "May 2024",
    },
  ]);

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const [newIncome, setNewIncome] = useState({ type: "Salary", amount: "" });
  const [newExpense, setNewExpense] = useState({ type: "fixed", amount: "" });
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: "",
  });

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.fixed + expenses.variable;
  const savings = 8000;
  const availableBalance = totalIncome - totalExpenses;

  const handleAddIncome = () => {
    if (newIncome.amount && parseFloat(newIncome.amount) > 0) {
      const existingIndex = income.findIndex(
        (item) => item.type === newIncome.type
      );
      if (existingIndex >= 0) {
        const updated = [...income];
        updated[existingIndex].amount += parseFloat(newIncome.amount);
        setIncome(updated);
      } else {
        setIncome([
          ...income,
          { type: newIncome.type, amount: parseFloat(newIncome.amount) },
        ]);
      }
      setNewIncome({ type: "Salary", amount: "" });
      setShowIncomeModal(false);
    }
  };

  const handleAddExpense = () => {
    if (newExpense.amount && parseFloat(newExpense.amount) > 0) {
      setExpenses({
        ...expenses,
        [newExpense.type]:
          expenses[newExpense.type] + parseFloat(newExpense.amount),
      });
      setNewExpense({ type: "fixed", amount: "" });
      setShowExpenseModal(false);
    }
  };

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target && parseFloat(newGoal.target) > 0) {
      setGoals([
        ...goals,
        {
          name: newGoal.name,
          target: parseFloat(newGoal.target),
          saved: parseFloat(newGoal.saved) || 0,
          deadline: newGoal.deadline,
        },
      ]);
      setNewGoal({ name: "", target: "", saved: "", deadline: "" });
      setShowGoalModal(false);
    }
  };

  const needs = totalIncome * 0.5;
  const wants = totalIncome * 0.3;
  const savingsTarget = totalIncome * 0.2;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Total Available Balance */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>
              Total Available Balance
            </h2>
            <div className='text-5xl font-bold text-gray-900 mb-8'>
              ₱{availableBalance.toLocaleString()}
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <div className='text-sm text-gray-600 mb-1'>Income</div>
                <div className='text-sm text-gray-500'>(this month)</div>
                <div className='text-2xl font-semibold text-gray-900 mt-2'>
                  ₱{totalIncome.toLocaleString()}
                </div>
              </div>
              <div>
                <div className='text-sm text-gray-600 mb-1'>Expenses</div>
                <div className='text-sm text-gray-500'>(this month)</div>
                <div className='text-2xl font-semibold text-gray-900 mt-2'>
                  ₱{totalExpenses.toLocaleString()}
                </div>
              </div>
              <div>
                <div className='text-sm text-gray-600 mb-1'>Savings</div>
                <div className='text-sm text-gray-500'>(this month)</div>
                <div className='text-2xl font-semibold text-gray-900 mt-2'>
                  ₱{savings.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Budgeting System */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>
              Budgeting System
            </h2>
            <div className='flex gap-4 mb-8'>
              <button className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium'>
                <div className='w-5 h-5 rounded-full bg-white flex items-center justify-center'>
                  <svg
                    className='w-3 h-3 text-blue-600'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                50-30-20
              </button>
              <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200'>
                <div className='w-5 h-5 rounded-full border-2 border-gray-400'></div>
                Zero-based
              </button>
              <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200'>
                Custom
              </button>
            </div>
            <div className='space-y-6'>
              <div>
                <div className='flex justify-between mb-2'>
                  <span className='font-semibold text-gray-700'>Needs</span>
                  <span className='font-semibold text-gray-900'>
                    ₱{needs.toLocaleString()}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-3'>
                  <div
                    className='bg-blue-600 h-3 rounded-full'
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className='flex justify-between mb-2'>
                  <span className='font-semibold text-gray-700'>Wants</span>
                  <span className='font-semibold text-gray-900'>
                    ₱{wants.toLocaleString()}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-3'>
                  <div
                    className='bg-blue-600 h-3 rounded-full'
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className='flex justify-between mb-2'>
                  <span className='font-semibold text-gray-700'>Savings</span>
                  <span className='font-semibold text-gray-900'>
                    ₱{savingsTarget.toLocaleString()}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-3'>
                  <div
                    className='bg-blue-600 h-3 rounded-full'
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
              <p className='text-sm text-gray-700'>
                Based on your income, you will save:{" "}
                <span className='font-semibold'>
                  ₱{savingsTarget.toLocaleString()}
                </span>{" "}
                per month
              </p>
              <p className='text-sm text-gray-700 mt-2'>
                At this rate, you can reach your goal in{" "}
                <span className='font-semibold'>4 months</span>
              </p>
            </div>
          </div>

          {/* Income Tracking */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Income Tracking
              </h2>
              <button
                onClick={() => setShowIncomeModal(true)}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition'
              >
                + Add Income
              </button>
            </div>
            <div className='flex items-end justify-between h-64 mb-6'>
              {income.map((item, index) => (
                <div key={index} className='flex flex-col items-center w-1/5'>
                  <div
                    className='w-full bg-blue-500 rounded-t-lg'
                    style={{ height: `${(item.amount / totalIncome) * 100}%` }}
                  ></div>
                  <span className='text-xs text-gray-600 mt-2'>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
            <div className='space-y-3'>
              {income.map((item, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-4 h-4 rounded-full bg-blue-${
                        600 - index * 100
                      }`}
                    ></div>
                    <span className='text-gray-700'>{item.type}</span>
                  </div>
                  <span className='font-semibold text-gray-900'>
                    ₱{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Tracking */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Expense Tracking
              </h2>
              <button
                onClick={() => setShowExpenseModal(true)}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition'
              >
                + Add Expense
              </button>
            </div>
            <div className='flex items-center justify-between mb-8'>
              <div className='relative w-48 h-48'>
                <svg viewBox='0 0 100 100' className='transform -rotate-90'>
                  <circle
                    cx='50'
                    cy='50'
                    r='40'
                    fill='none'
                    stroke='#93C5FD'
                    strokeWidth='20'
                  />
                  <circle
                    cx='50'
                    cy='50'
                    r='40'
                    fill='none'
                    stroke='#3B82F6'
                    strokeWidth='20'
                    strokeDasharray={`${
                      (expenses.fixed / totalExpenses) * 251
                    } 251`}
                  />
                </svg>
              </div>
              <div className='space-y-6'>
                <div>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-4 h-4 rounded-full bg-blue-600'></div>
                    <span className='text-gray-700 font-medium'>Fixed</span>
                  </div>
                  <div className='text-2xl font-semibold text-gray-900'>
                    ₱{expenses.fixed.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-4 h-4 rounded-full bg-blue-300'></div>
                    <span className='text-gray-700 font-medium'>Variable</span>
                  </div>
                  <div className='text-2xl font-semibold text-gray-900'>
                    ₱{expenses.variable.toLocaleString()}
                  </div>
                </div>
                <div className='pt-4 border-t border-gray-200'>
                  <div className='text-3xl font-bold text-gray-900'>
                    ₱{totalExpenses.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Goals */}
          <div className='bg-white rounded-2xl shadow-lg p-8 lg:col-span-2'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Financial Goals
              </h2>
              <button
                onClick={() => setShowGoalModal(true)}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition'
              >
                + Add Goal
              </button>
            </div>
            <div className='space-y-6'>
              {goals.map((goal, index) => (
                <div
                  key={index}
                  className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6'
                >
                  <div className='flex justify-between items-start mb-6'>
                    <div>
                      <h3 className='text-xl font-semibold text-gray-800 mb-1'>
                        {goal.name}
                      </h3>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <span>Goal</span>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-4'>
                    <div>
                      <div className='text-sm text-gray-600 mb-1'>
                        Goal Amount
                      </div>
                      <div className='text-3xl font-bold text-gray-900'>
                        ₱{goal.target.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-600 mb-1'>
                        Saved So Far
                      </div>
                      <div className='text-3xl font-bold text-blue-600'>
                        ₱{goal.saved.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-600 mb-1'>
                        Estimated Completion
                      </div>
                      <div className='text-3xl font-bold text-gray-900'>
                        {goal.deadline}
                      </div>
                    </div>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-4'>
                    <div
                      className='bg-blue-600 h-4 rounded-full transition-all duration-500'
                      style={{ width: `${(goal.saved / goal.target) * 100}%` }}
                    ></div>
                  </div>
                  <div className='mt-2 text-right text-sm text-gray-600'>
                    {Math.round((goal.saved / goal.target) * 100)}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Income Modal */}
      <Modal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        title='Add Income'
      >
        <div className='space-y-4'>
          <FormInput
            label='Income Type'
            type='select'
            value={newIncome.type}
            onChange={(e) =>
              setNewIncome({ ...newIncome, type: e.target.value })
            }
            options={["Salary", "Freelance", "Business", "Other"]}
          />
          <FormInput
            label='Amount (₱)'
            type='number'
            value={newIncome.amount}
            onChange={(e) =>
              setNewIncome({ ...newIncome, amount: e.target.value })
            }
            placeholder='Enter amount'
          />
        </div>
        <ModalActions
          onConfirm={handleAddIncome}
          onCancel={() => setShowIncomeModal(false)}
          confirmText='Add Income'
        />
      </Modal>

      {/* Expense Modal */}
      <Modal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        title='Add Expense'
      >
        <div className='space-y-4'>
          <FormInput
            label='Expense Type'
            type='select'
            value={newExpense.type}
            onChange={(e) =>
              setNewExpense({ ...newExpense, type: e.target.value })
            }
            options={[
              { value: "fixed", label: "Fixed" },
              { value: "variable", label: "Variable" },
            ]}
          />
          <FormInput
            label='Amount (₱)'
            type='number'
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
            placeholder='Enter amount'
          />
        </div>
        <ModalActions
          onConfirm={handleAddExpense}
          onCancel={() => setShowExpenseModal(false)}
          confirmText='Add Expense'
        />
      </Modal>

      {/* Goal Modal */}
      <Modal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        title='Add Financial Goal'
      >
        <div className='space-y-4'>
          <FormInput
            label='Goal Name'
            type='text'
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            placeholder='e.g., Emergency Fund'
          />
          <FormInput
            label='Target Amount (₱)'
            type='number'
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            placeholder='Enter target amount'
          />
          <FormInput
            label='Already Saved (₱)'
            type='number'
            value={newGoal.saved}
            onChange={(e) => setNewGoal({ ...newGoal, saved: e.target.value })}
            placeholder='Enter amount saved'
          />
          <FormInput
            label='Target Date'
            type='text'
            value={newGoal.deadline}
            onChange={(e) =>
              setNewGoal({ ...newGoal, deadline: e.target.value })
            }
            placeholder='e.g., May 2024'
          />
        </div>
        <ModalActions
          onConfirm={handleAddGoal}
          onCancel={() => setShowGoalModal(false)}
          confirmText='Add Goal'
        />
      </Modal>
    </div>
  );
}
