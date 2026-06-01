"use client";

export default function SplineCube({ className = "" }: { className?: string }) {
  return (
    <iframe
      src="https://my.spline.design/interactivecube-ZnBFZcYUN5fbEnzTejui3uRf/"
      frameBorder="0"
      className={className}
      title="Interactive 3D cube"
      allowFullScreen
    />
  );
}
