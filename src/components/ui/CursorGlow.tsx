import { useMousePosition } from '../../hooks/useMousePosition';

export const CursorGlow = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`
      }}
    />
  );
};
