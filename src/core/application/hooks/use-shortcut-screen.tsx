import { useEffect } from "react";
import { useScreen } from "../providers/screen/screen-provider";

export function useShortcutScreen() {
  const { isFullScreen, exitFullScreen, fullScreen } = useScreen();

  useEffect(() => {
    let isTriggered = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTriggered && event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        isTriggered = true;

        if (isFullScreen) return exitFullScreen();
        return fullScreen();
      }

      if (event.key === "Escape" && isFullScreen) {
        event.preventDefault();
        exitFullScreen();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "s" || event.key === "Escape") {
        isTriggered = false;
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullScreen) {
        exitFullScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isFullScreen, exitFullScreen, fullScreen]);
}
