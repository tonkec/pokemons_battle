import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { ToastStyled } from './Toast';

export type toastType =
  | 'info'
  | 'warning'
  | 'success'
  | 'error'
  | 'loading'
  | undefined;

const Toast = ({ message, type }: { message: string; type: toastType }) => {
  return (
    <ToastStyled>
      <Alert status={type}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </ToastStyled>
  );
};

export default Toast;
