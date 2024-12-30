import Image from "next/image";
import React, { forwardRef } from "react";

interface LeafProps {
  src: string;
  className: string;
}

const Leaf = forwardRef<HTMLImageElement, LeafProps>(({ src, className }, ref) => (
  <Image ref={ref} src={src} alt="leaf" width={150} height={224} className={className} />
));

Leaf.displayName = "Leaf";

export default Leaf;
