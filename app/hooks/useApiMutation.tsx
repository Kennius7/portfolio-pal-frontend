import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// interface ApiError {
//   message: string;
// }

interface MutationOptions<TData, TVariables> {
  mutationKey: string[];
  mutationFn: (variables: TVariables) => Promise<TData>;
  successMessage: string;
  invalidateKeys?: string[][];
  onSuccessCallback?: () => void;
}

export const useApiMutation = <TData, TVariables>({
  mutationKey,
  mutationFn,
  successMessage,
  invalidateKeys = [],
  onSuccessCallback,
}: MutationOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      toast.success(successMessage);

      invalidateKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      onSuccessCallback?.();
    },
    onError: (error) => {
      // const apiError = error as ApiError;
      const message =
        error instanceof Error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || error.message
          : "Something went wrong. Please try again.";

      // toast.error(apiError?.message || "An unknown error occurred");
      toast.error(message);
    },
  });
};
