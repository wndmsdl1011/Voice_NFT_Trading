import { useCallback } from "react";
import { showToast, TOAST_MESSAGES } from "../utils/toast";

/**
 * Custom hook for toast notifications
 * Provides easy access to toast functions and common messages
 */
export const useToast = () => {
  // Success toast
  const showSuccess = useCallback((message) => {
    showToast.success(message);
  }, []);

  // Error toast
  const showError = useCallback((message) => {
    showToast.error(message);
  }, []);

  // Warning toast
  const showWarning = useCallback((message) => {
    showToast.warning(message);
  }, []);

  // Info toast
  const showInfo = useCallback((message) => {
    showToast.info(message);
  }, []);

  // Loading toast
  const showLoading = useCallback((message) => {
    return showToast.loading(message);
  }, []);

  // Promise toast
  const showPromise = useCallback((promise, messages) => {
    return showToast.promise(promise, messages);
  }, []);

  // Custom toast
  const showCustom = useCallback((message, options) => {
    showToast.custom(message, options);
  }, []);

  // Dismiss functions
  const dismiss = useCallback(() => {
    showToast.dismiss();
  }, []);

  const dismissById = useCallback((id) => {
    showToast.dismissById(id);
  }, []);

  // Common action toasts
  const showLoginSuccess = useCallback(() => {
    showToast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
  }, []);

  const showLoginError = useCallback(() => {
    showToast.error(TOAST_MESSAGES.LOGIN_ERROR);
  }, []);

  const showLogoutSuccess = useCallback(() => {
    showToast.success(TOAST_MESSAGES.LOGOUT_SUCCESS);
  }, []);

  const showNFTCreated = useCallback(() => {
    showToast.success(TOAST_MESSAGES.NFT_CREATED);
  }, []);

  const showNFTCreateError = useCallback(() => {
    showToast.error(TOAST_MESSAGES.NFT_CREATE_ERROR);
  }, []);

  const showNFTPurchased = useCallback(() => {
    showToast.success(TOAST_MESSAGES.NFT_PURCHASED);
  }, []);

  const showNFTPurchaseError = useCallback(() => {
    showToast.error(TOAST_MESSAGES.NFT_PURCHASE_ERROR);
  }, []);

  const showTTSGenerated = useCallback(() => {
    showToast.success(TOAST_MESSAGES.TTS_GENERATED);
  }, []);

  const showTTSError = useCallback(() => {
    showToast.error(TOAST_MESSAGES.TTS_ERROR);
  }, []);

  const showSaveSuccess = useCallback(() => {
    showToast.success(TOAST_MESSAGES.SAVE_SUCCESS);
  }, []);

  const showSaveError = useCallback(() => {
    showToast.error(TOAST_MESSAGES.SAVE_ERROR);
  }, []);

  const showCopySuccess = useCallback(() => {
    showToast.success(TOAST_MESSAGES.COPY_SUCCESS);
  }, []);

  const showNetworkError = useCallback(() => {
    showToast.error(TOAST_MESSAGES.NETWORK_ERROR);
  }, []);

  const showUnexpectedError = useCallback(() => {
    showToast.error(TOAST_MESSAGES.UNEXPECTED_ERROR);
  }, []);

  return {
    // Basic toast functions
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showPromise,
    showCustom,
    dismiss,
    dismissById,

    // Common action toasts
    showLoginSuccess,
    showLoginError,
    showLogoutSuccess,
    showNFTCreated,
    showNFTCreateError,
    showNFTPurchased,
    showNFTPurchaseError,
    showTTSGenerated,
    showTTSError,
    showSaveSuccess,
    showSaveError,
    showCopySuccess,
    showNetworkError,
    showUnexpectedError,
  };
};

export default useToast;
