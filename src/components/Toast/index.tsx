import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export type toastType =
  | 'info'
  | 'warning'
  | 'success'
  | 'error'
  | 'loading'
  | undefined;

const Toast = ({ message, type }: { message: string; type: toastType }) => {
  return (
    <Alert status={type}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default Toast;
