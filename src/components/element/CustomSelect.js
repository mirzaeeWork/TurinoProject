import useOutsideClick from "@/hooks/useOutsideClick";
import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  onBlur, 
  placeholder = "انتخاب کنید",
}) {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [wasOpened, setWasOpened] = useState(false); 

  useOutsideClick([containerRef], () => {
    if (open && wasOpened) {
      onBlur?.();
    }
    setOpen(false);
    setWasOpened(false);
  });

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        className={`w-full border border-(--color-border) rounded-[5px] px-4 py-2 flex items-center justify-start 
                      text-[14px] sm:text-[16px]  focus:outline-none ${
                          selectedLabel === placeholder
                            ? "text-(--color-placeHolder)"
                            : "text-(--color-text)"
                        }`}
        onClick={() => {
          if (!open) setWasOpened(true); // فقط وقتی تازه باز میشه
          setOpen((prev) => !prev);
        }}
      >
        {selectedLabel}
        <span
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <IoIosArrowDown className="text-(--color-text)" />
        </span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-[5px] shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 text-right cursor-pointer text-[14px] sm:text-[16px] transition-colors duration-150 ${
                option.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-(--color-link) hover:text-white"
              }`}
              onClick={() => {
                if (option.disabled) return;
                onChange(option.value);
                setOpen(false);
                setWasOpened(false); 
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
