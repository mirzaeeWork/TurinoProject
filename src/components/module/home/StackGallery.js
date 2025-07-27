import Image from "next/image";
import { useState } from "react";
import { toPersianDigits } from "@/utils/formatDate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const images = [
  "/images/home/whyTour/1.webp",
  "/images/home/whyTour/2.webp",
  "/images/home/whyTour/3.webp",
  "/images/home/whyTour/4.webp",
];

function StackGallery() {
  const [index, setIndex] = useState(0);

  const rotate = (dir) => {
    if (dir === "next" && index < images.length - 1) {
      setIndex(index + 1);
    } else if (dir === "prev" && index > 0) {
      setIndex(index - 1);
    }
  };

  const getRelativeIndex = (i) => i - index;

  return (
    <div className="stack-gallery">
      <div className="stack-wrapper">
        {images.map((img, i) => {
          const rel = getRelativeIndex(i);
          const clampedRel = Math.max(Math.min(rel, 3), -3);

          const scale = 1 - Math.abs(clampedRel) * 0.15;
          const shift = `var(--shift)`;
          const zIndex = images.length - Math.abs(clampedRel);

          const style = {
            transform: `
             translateX(-50%) 
              translateY(${Math.abs(clampedRel) * 5}px)
             scale(${scale})
            `,
            left: `calc(50% - (${shift} * ${clampedRel}))`,
            zIndex,
          };

          return (
            <div key={img} className="stack-card overflow-hidden" style={style}>
              <Image
                src={img}
                alt=""
                className="w-full h-full"
                width={1000}
                height={1000}
              />
            </div>
          );
        })}
      </div>

      <div className="stack-buttons">
        <button
          onClick={() => rotate("next")}
          disabled={index === images.length - 1}
        >
          <FaArrowRight className="text-[#10411B]" />
        </button>

        <span className="text-(--color-text) text-[20px] lg:text-[24px] font-medium">
          {toPersianDigits(`${index + 1}/${images.length}`)}
        </span>

        <button onClick={() => rotate("prev")} disabled={index === 0}>
          <FaArrowLeft className="text-[#10411B]" />
        </button>
      </div>
    </div>
  );
}

export default StackGallery;
