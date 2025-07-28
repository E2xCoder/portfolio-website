import { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="text-xl md:text-2xl font-semibold text-[var(--color-accent-blue)]">
      {displayed}
      {displayed.length < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}