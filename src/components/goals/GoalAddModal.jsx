import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import useGoalStore from "@/stores/goalStore";
import toast from "react-hot-toast";

export default function AddGoalModal({ isOpen, onClose }) {
  const { createGoal, loading } = useGoalStore();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    type: "Automatic",
    metric: "",
    target_value: "",
    start_value: "",
    start_date: "",
    end_date: "",
    frequency: "",
    reminders_enabled: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.target_value || parseFloat(formData.target_value) <= 0) {
      newErrors.target_value = "Target value must be greater than 0";
    }

    if (!formData.start_date) {
      newErrors.start_date = "Start date is required";
    }

    if (!formData.end_date) {
      newErrors.end_date = "End date is required";
    }

    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      if (end <= start) {
        newErrors.end_date = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      // Prepare data for API (convert to match backend expectations)
      const goalData = {
        title: formData.title,
        category: formData.category,
        description: formData.description || null,
        type: formData.type,
        metric: formData.metric || null,
        target_value: parseFloat(formData.target_value),
        start_value: formData.start_value
          ? parseFloat(formData.start_value)
          : 0,
        start_date: formData.start_date,
        end_date: formData.end_date,
        frequency: formData.frequency || null,
        reminders_enabled: formData.reminders_enabled,
      };

      await createGoal(goalData);

      toast.success("Goal created successfully!");

      // Reset form
      setFormData({
        title: "",
        category: "",
        description: "",
        type: "Automatic",
        metric: "",
        target_value: "",
        start_value: "",
        start_date: "",
        end_date: "",
        frequency: "",
        reminders_enabled: false,
      });
      setErrors({});

      onClose();
    } catch (error) {
      // Handle validation errors from backend
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error("Validation failed. Please check the form.");
      } else {
        toast.error(error.response?.data?.message || "Failed to create goal");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10'>
          <h1 className='text-2xl text-gray-800 font-semibold'>Add Goal</h1>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition'
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Goal Title */}
          <div>
            <input
              type='text'
              name='title'
              placeholder='Goal Title'
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border placeholder-gray-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
            />
            {errors.title && (
              <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
            )}
          </div>

          {/* Goal Category */}
          <div>
            <select
              name='category'
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
            >
              <option value=''>Goal Category</option>
              <option value='Health'>Health</option>
              <option value='Finance'>Finance</option>
              <option value='Education'>Education</option>
              <option value='Career'>Career</option>
              <option value='Personal'>Personal</option>
            </select>
            {errors.category && (
              <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <textarea
            name='description'
            placeholder='Description (Optional)'
            value={formData.description}
            onChange={handleChange}
            rows='4'
            className='w-full px-4 py-3 border border-gray-300 placeholder-gray-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
            disabled={loading}
          />

          {/* Goal Type */}
          <div>
            <label className='block text-gray-700 font-medium mb-3'>
              Goal Type
            </label>
            <div className='space-y-2'>
              {["Automatic", "Manual", "Semi-Automatic"].map((type) => (
                <label key={type} className='flex items-center cursor-pointer'>
                  <input
                    type='radio'
                    name='type'
                    value={type}
                    checked={formData.type === type}
                    onChange={handleChange}
                    className='w-4 h-4 text-blue-500'
                    disabled={loading}
                  />
                  <span className='ml-3 text-gray-700'>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Progress Metric */}
          <input
            type='text'
            name='metric'
            placeholder='Progress Metric (e.g., kg, hours, books)'
            value={formData.metric}
            onChange={handleChange}
            className='w-full px-4 py-3 border border-gray-300 placeholder-gray-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={loading}
          />

          {/* Target Value & Start Value */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <input
                type='number'
                name='target_value'
                placeholder='Target Value'
                value={formData.target_value}
                onChange={handleChange}
                step='0.01'
                min='0.01'
                className={`w-full px-4 py-3 border placeholder-gray-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.target_value ? "border-red-500" : "border-gray-300"
                }`}
                disabled={loading}
              />
              {errors.target_value && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.target_value}
                </p>
              )}
            </div>
            <input
              type='number'
              name='start_value'
              placeholder='Start Value (optional)'
              value={formData.start_value}
              onChange={handleChange}
              step='0.01'
              min='0'
              className='px-4 py-3 border border-gray-300 placeholder-gray-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={loading}
            />
          </div>

          {/* Start Date & End Date */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <input
                type='date'
                name='start_date'
                value={formData.start_date}
                onChange={handleChange}
                className={`w-full px-4 py-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.start_date ? "border-red-500" : "border-gray-300"
                }`}
                disabled={loading}
              />
              {errors.start_date && (
                <p className='text-red-500 text-sm mt-1'>{errors.start_date}</p>
              )}
            </div>
            <div>
              <input
                type='date'
                name='end_date'
                value={formData.end_date}
                onChange={handleChange}
                className={`w-full px-4 py-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.end_date ? "border-red-500" : "border-gray-300"
                }`}
                disabled={loading}
              />
              {errors.end_date && (
                <p className='text-red-500 text-sm mt-1'>{errors.end_date}</p>
              )}
            </div>
          </div>

          {/* Frequency */}
          <select
            name='frequency'
            value={formData.frequency}
            onChange={handleChange}
            className='w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer'
            disabled={loading}
          >
            <option value=''>Frequency (optional)</option>
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
            <option value='Yearly'>Yearly</option>
          </select>

          {/* Reminders Toggle */}
          <div className='flex items-center justify-between'>
            <label className='text-gray-700 font-medium'>
              Reminders / Notifications
            </label>
            <button
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  reminders_enabled: !prev.reminders_enabled,
                }))
              }
              disabled={loading}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                formData.reminders_enabled ? "bg-blue-500" : "bg-gray-300"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  formData.reminders_enabled ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className='p-6 border-t sticky bottom-0 bg-white'>
          <button
            onClick={handleSave}
            disabled={loading}
            className='w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          >
            {loading ? (
              <>
                <Loader2 className='animate-spin mr-2' size={20} />
                Creating...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
