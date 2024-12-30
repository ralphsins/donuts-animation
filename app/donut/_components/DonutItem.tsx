import Image from "next/image";
import React, { forwardRef } from "react";

interface DonutItemProps {
  src: string;
  alt: string;
  className: string;
}

const DonutItem = forwardRef<HTMLImageElement, DonutItemProps>(({ src, alt, className }, ref) => (
  <Image ref={ref} src={src} alt={alt} width={700} height={700} className={className} />
));

DonutItem.displayName = "DonutItem";

export default DonutItem;
