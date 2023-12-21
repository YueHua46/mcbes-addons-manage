import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { createContext } from "react";

interface DialogProviderProps {
  children?: React.ReactNode;
}

interface DialogProviderBaseState {
  title: string;
  content: string;
  confirm: () => void;
  isCancel?: boolean;
  cancel?: () => void;
  actionText?: string;
  cancelText?: string;
  isOpen?: boolean;
}

interface DialogProviderWithCancel {
  isCancel: true;
  cancel: () => void;
}

interface DialogProviderWithoutCancel {
  isCancel: false;
}

export type DialogProviderState = DialogProviderBaseState &
  (DialogProviderWithCancel | DialogProviderWithoutCancel);

const initialState: DialogProviderState = {
  title: "",
  content: "",
  confirm: () => {},
  isCancel: false,
  cancel: () => {},
  actionText: "取消",
  cancelText: "确认",
  isOpen: false,
};

interface DialogProviderContextType {
  open: (dialogState: DialogProviderState) => void;
  close: () => void;
}

export const DialogProviderContext = createContext<DialogProviderContextType>({
  open: () => {},
  close: () => {},
});

export function DialogProvider({ children }: DialogProviderProps) {
  const [state, setState] = React.useState<DialogProviderState>(initialState);

  const value = {
    open: (dialogState: DialogProviderState) => {
      setState({ ...dialogState });
      setState((pre) => ({ ...pre, isOpen: true }));
    },
    close: () => {
      setState({ ...initialState });
      setState((pre) => ({ ...pre, isOpen: false }));
    },
  };

  return (
    <div className="w-full h-full">
      <DialogProviderContext.Provider value={value}>
        {children}
      </DialogProviderContext.Provider>
      <AlertDialog open={state.isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{state.title}</AlertDialogTitle>
            <AlertDialogDescription>{state.content}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {state.isCancel ? (
              <AlertDialogCancel onClick={() => state.cancel()}>
                {state.cancelText}
              </AlertDialogCancel>
            ) : null}

            <AlertDialogAction onClick={() => state.confirm()}>
              {state.actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
