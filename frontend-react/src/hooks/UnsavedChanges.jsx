import React, { useEffect, useState } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";

export default function UnsavedChanges() {
  const [isChanges, setChanges] = useState(false);

  // Warn on browser refresh / close
  useEffect(() => {
    const beforeUnload = (e) => {
      if (isChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [isChanges]);

  // In-app navigation
  function Prompt() {
    const navigator = React.useContext(UNSAFE_NavigationContext).navigator;
    useEffect(() => {
      if (!isChanges) return;

      const push = navigator.push;
      navigator.push = (...args) => {
        if (window.confirm("There are unsaved changes. Do you want to leave?")) {
          navigator.push = push;
          push(...args);
        }
      };
      return () => {
        navigator.push = push;
      };
    }, [isChanges, navigator]);

    return null;
  }

  return { Prompt, setChanges };
}
