export const getErrorMessage = (error: unknown, fallback: string): string => {
  return error instanceof Error ? error.message : fallback;
};

export const handleStoreError = (
  set: (state: { error: string; isLoading: boolean }) => void,
  error: unknown,
  fallbackMessage: string
) => {
  set({
    error: getErrorMessage(error, fallbackMessage),
    isLoading: false,
  });
};
