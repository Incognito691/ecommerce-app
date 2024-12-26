import React from "react";

const useScrollLock = (isLocked: boolean) => {
  React.useEffect(() => {
    if (isLocked) document.body.style.overflow = "hidden";
    else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);
};

export { useScrollLock };
