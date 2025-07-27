import { useEffect } from "react";

export default function useOutsideClick(refs = [], handler) {
  useEffect(() => {
    const listener = (event) => {
      const clickedInsideAny = refs.some(ref => ref.current?.contains(event.target));
      if (!clickedInsideAny) {
        handler(); 
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [refs, handler]);
}
