import toast from "react-hot-toast";

// Toast utility functions with predefined styles and messages
export const showToast = {
  // Success messages
  success: (message) =>
    toast.success(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
        fontWeight: "500",
      },
    }),

  // Error messages
  error: (message) =>
    toast.error(message, {
      duration: 8000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#fff",
        fontWeight: "500",
      },
    }),

  // Warning messages
  warning: (message) =>
    toast(message, {
      duration: 4000,
      position: "top-right",
      icon: "⚠️",
      style: {
        background: "#F59E0B",
        color: "#fff",
        fontWeight: "500",
      },
    }),

  // Info messages
  info: (message) =>
    toast(message, {
      duration: 4000,
      position: "top-right",
      icon: "ℹ️",
      style: {
        background: "#3B82F6",
        color: "#fff",
        fontWeight: "500",
      },
    }),

  // Loading messages
  loading: (message) =>
    toast.loading(message, {
      position: "top-right",
      style: {
        background: "#6B7280",
        color: "#fff",
        fontWeight: "500",
      },
    }),

  // Promise-based toast
  promise: (promise, messages) =>
    toast.promise(
      promise,
      {
        loading: messages.loading || "Loading...",
        success: messages.success || "Success!",
        error: messages.error || "Something went wrong!",
      },
      {
        position: "top-right",
        style: {
          fontWeight: "500",
        },
        success: {
          style: {
            background: "#10B981",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        },
      }
    ),

  // Custom toast with custom styling
  custom: (message, options = {}) =>
    toast(message, {
      duration: 4000,
      position: "top-right",
      ...options,
    }),

  // Dismiss all toasts
  dismiss: () => toast.dismiss(),

  // Dismiss specific toast
  dismissById: (id) => toast.dismiss(id),
};

// Predefined common messages
export const TOAST_MESSAGES = {
  // Auth messages
  LOGIN_SUCCESS: "Successfully logged in!",
  LOGIN_ERROR: "Login failed. Please try again.",
  LOGOUT_SUCCESS: "Successfully logged out!",

  // NFT messages
  NFT_CREATED: "NFT created successfully!",
  NFT_CREATE_ERROR: "Failed to create NFT. Please try again.",
  NFT_PURCHASED: "NFT purchased successfully!",
  NFT_PURCHASE_ERROR: "Failed to purchase NFT. Please try again.",

  // TTS messages
  TTS_GENERATED: "Audio generated successfully!",
  TTS_ERROR: "Failed to generate audio. Please try again.",

  // General messages
  SAVE_SUCCESS: "Changes saved successfully!",
  SAVE_ERROR: "Failed to save changes. Please try again.",
  COPY_SUCCESS: "Copied to clipboard!",
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again.",
};

export default showToast;
