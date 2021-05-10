import { useState, useEffect } from "react";

function useIsMobile() {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches]);

  return matches;
}

export default useIsMobile;
