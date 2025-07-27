import React from "react";

function DynamicInput({
  error,          
  touched,        
  ...inputProps   
}) {
  return (
    <>
      <input {...inputProps} />
       <div className='text-(--color-error) mt-1 text-[10px] lg:text-[12px] font-normal  h-7'>
        {touched && error}
      </div>
    </>
  );
}

export default DynamicInput;
