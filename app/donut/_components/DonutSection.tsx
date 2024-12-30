"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DonutItem from "./DonutItem";
import Leaf from "./Leaf";
import Circle from "./Circle";

interface Refs {
  blueBerryText: HTMLHeadingElement | null;
  appleGreenText: HTMLHeadingElement | null;
  greenApple: HTMLImageElement | null;
  caramel: HTMLImageElement | null;
  caramelText: HTMLHeadingElement | null;
  greenCircle: HTMLDivElement | null;
  caramelCircle: HTMLDivElement | null;
  leaves: (HTMLImageElement | null)[];
  blueBerryDonut: HTMLImageElement | null;
}

const DonutSection: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const refs = useRef<Refs>({
    blueBerryText: null,
    appleGreenText: null,
    greenApple: null,
    caramel: null,
    caramelText: null,
    greenCircle: null,
    caramelCircle: null,
    leaves: [null, null, null, null],
    blueBerryDonut: null,
  });
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const animations: Record<number, () => gsap.core.Timeline> = {
    1: () =>
      gsap
        .timeline()
        .to(refs.current.blueBerryText ?? {}, { y: 500 }, "a")
        .to(
          refs.current.blueBerryDonut ?? {},
          { y: -420, rotate: 180, scale: 0.5 },
          "a"
        )
        .to(refs.current.greenApple ?? {}, { scale: 1, top: "50%", rotate: 0 }, "a")
        .to(
          refs.current.greenCircle ?? {},
          { scale: 20, duration: 1, ease: "power1.inOut" },
          "a"
        )
        .to(refs.current.appleGreenText ?? {}, { scale: 1, top: "26%" }, "a")
        .to(refs.current.leaves ?? [], { rotate: 180, stagger: 0.1 }, "a")
        .to(refs.current.caramel ?? {}, { top: "107%" }, "a"),
    2: () =>
      gsap
        .timeline()
        .to(refs.current.greenApple ?? {}, { y: -420, rotate: 180, scale: 0.6 }, "b")
        .to(refs.current.caramel ?? {}, { scale: 1, top: "50%", rotate: 0 }, "b")
        .to(refs.current.appleGreenText ?? {}, { y: 500 }, "b")
        .to(refs.current.caramelCircle ?? {}, { scale: 20, duration: 1 }, "b")
        .to(refs.current.caramelText ?? {}, { scale: 1, top: "26%" }, "b")
        .to(refs.current.leaves ?? [], { rotate: 0, stagger: 0.1 }, "b"),
  };

  const handleNext = () => {
    if (timeline.current) timeline.current.kill();
    if (animations[step]) {
      timeline.current = animations[step]();
    }
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const handlePrev = () => {
    if (timeline.current) timeline.current.reverse();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-tl from-[#e0b8ff] to-[#744eb2] overflow-hidden">
      <div className="w-full h-full relative">
        <Circle
          className="bg-gradient-to-tl from-[#e0ffb8] to-[#7ab24e]"
          ref={(el) => {
            refs.current.greenCircle = el;
          }}
        />
        <Circle
          className="bg-gradient-to-tl from-[#ffe3bb] to-[#d68042]"
          ref={(el) => {
            refs.current.caramelCircle = el;
          }}
        />

        <h1
          ref={(el) => {
            refs.current.blueBerryText = el;
          }}
          className="text-[16vw] w-full uppercase text-center font-anton absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        >
          Blue berry
        </h1>
        <h2
          ref={(el) => {
            refs.current.appleGreenText = el;
          }}
          className="text-[16vw] w-full uppercase text-center font-anton absolute scale-0 left-1/2 -translate-x-1/2 -top-64"
        >
          Green apple
        </h2>
        <h3
          ref={(el) => {
            refs.current.caramelText = el;
          }}
          className="text-[16vw] w-full uppercase text-center font-anton absolute scale-0 left-1/2 -translate-x-1/2 -top-64"
        >
          Caramel
        </h3>

        <DonutItem
          ref={(el) => {
            refs.current.blueBerryDonut = el;
          }}
          src="/images/donut.png"
          alt="blueberry"
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        />
        <DonutItem
          ref={(el) => {
            refs.current.greenApple = el;
          }}
          src="/images/green-apple.png"
          alt="green-apple"
          className="absolute top-[105%] scale-[0.4] size-[40vw] rotate-180 -translate-y-1/2 left-1/2 -translate-x-1/2"
        />
        <DonutItem
          ref={(el) => {
            refs.current.caramel = el;
          }}
          src="/images/caramel.png"
          alt="caramel"
          className="absolute top-[120%] scale-[0.4] size-[40vw] rotate-180 -translate-y-1/2 left-1/2 -translate-x-1/2"
        />

        {["leaf1.png", "leaf2.png", "leaf2.png", "leaf1.png"].map((leaf, i) => (
          <Leaf
            key={i}
            src={`/images/${leaf}`}
            className={`absolute ${
              i % 2 === 0 ? "left-[15%]" : "right-[15%]"
            } ${i < 2 ? "top-[5%]" : "bottom-[5%]"}`}
            ref={(el) => {
              refs.current.leaves[i] = el;
            }}
          />
        ))}

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full flex justify-between p-2">
          <ChevronLeft
            onClick={handlePrev}
            className="size-12 cursor-pointer hover:opacity-80"
          />
          <ChevronRight
            onClick={handleNext}
            className="size-12 cursor-pointer hover:opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default DonutSection;
