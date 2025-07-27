import React from "react";
import LoadingForButton from "./LoadingForButton";

function ButtonElement({
  type = "button",
  className = "",
  text,
  icon = "",
  isPending = false,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-1 transition-all duration-300 ease-in-out outline-none rounded-[5px] ${className}`}
      disabled={isPending}
      style={{
        opacity: isPending ? 0.7 : 1,
        cursor: isPending ? "not-allowed" : "pointer",
      }}
      {...rest}
    >
      {isPending ? (
        <LoadingForButton loading={isPending} />
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </button>
  );
}

export default ButtonElement;
