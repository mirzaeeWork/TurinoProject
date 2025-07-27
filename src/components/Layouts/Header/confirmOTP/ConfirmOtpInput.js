import { createRef, useEffect, useRef } from "react";

function AuthConfirmCodeInput({ mobile, timer, setUserCode }) {
  const inputRefs = useRef(Array.from({ length: 6 }, () => createRef()));

  useEffect(() => {
    if (mobile !== "" && timer === 120) {
      inputRefs.current.forEach(ref => {
        if (ref.current) ref.current.value = "";
      });
      setUserCode("");
    }
  }, [mobile, timer]);

  const handleInputChange = (index, inputValue) => {
    const onlyDigits = inputValue.replace(/\D/g, "");

    if (
      onlyDigits.length === 1 &&
      index < inputRefs.current.length - 1 &&
      inputRefs.current[index + 1].current
    ) {
      inputRefs.current[index + 1].current.focus();
    }

    const values = inputRefs.current.map(ref => ref.current?.value || "");
    setUserCode(values.join(""));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0) {
      if (!inputRefs.current[index].current.value) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const pasteArray = paste.split("");

    pasteArray.forEach((char, idx) => {
      if (inputRefs.current[idx]?.current) {
        inputRefs.current[idx].current.value = char;
      }
    });

    const values = inputRefs.current.map((ref) => ref.current?.value || "");
    setUserCode(values.join(""));

    // تمرکز روی اولین خانه خالی بعد از paste
    const firstEmpty = pasteArray.length;
    if (firstEmpty < inputRefs.current.length) {
      inputRefs.current[firstEmpty]?.current?.focus();
    }
  };

  return (
    <div
      dir="ltr"
      className="flex items-center justify-center gap-x-3 sm:gap-x-4 w-full"
    >
      {inputRefs.current.map((ref, index) => (
        <input
          key={index}
          ref={ref}
          type="text"
          maxLength={1}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="rounded-[6px] bg-white border border-(--color-border) 
                 w-[20%] h-[40px] sm:w-[50px] sm:h-[53px] outline-none text-center"
        />
      ))}
    </div>
  );
};

export default AuthConfirmCodeInput;
