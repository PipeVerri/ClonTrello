import type React from "react";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  onRelease: () => void;
}

export default function MouseFollower({ children, onRelease }: Props) {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 80, y: e.clientY - 20 }); // Offset arbitrario por ahora
    };

    // Los agrego a los eventListener aca asi no se ejecutan antes que el componente termine de montar
    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseup", onRelease);

    return () => {
      // Cleanup para que una vez haga unmount, no se sigan disparando eventos
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseup", onRelease);
    };
  }, [onRelease]);

  return (
    <div style={{ position: "absolute", left: position.x, top: position.y, pointerEvents: "none" }}>
      {children}
    </div>
  );
}
