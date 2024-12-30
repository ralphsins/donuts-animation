import React, { forwardRef } from "react";

interface CircleProps {
  className: string;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({ className }, ref) => (
  <div ref={ref} className={`${className} absolute -top-32 size-40 rounded-full left-1/2 -translate-x-1/2 scale-0`} />
));

Circle.displayName = "Circle";

export default Circle;
