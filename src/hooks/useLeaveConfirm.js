import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

export const useLeaveConfirm = (when) => {
  const blocker = useBlocker(when);
  const [isOpen, setIsOpen] = useState(false);

  const confirm = () => {
    setIsOpen(false);
    blocker.proceed();
  };

  const cancel = () => {
    setIsOpen(false);
    blocker.reset();
  };

  useEffect(() => {
    if (blocker.state === "blocked") {
      setIsOpen(true);
    }
  }, [blocker.state]);

  return { isOpen, confirm, cancel };
};
