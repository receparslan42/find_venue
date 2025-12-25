import React from "react";

const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  isFocused,
}) => {
  const inputRef = React.useRef(); // Create a ref for the input element for focusing

  // Effect to focus the input element when isFocused is true
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus(); // Focus the input element if isFocused is true
    }
  }, [isFocused]);

  return (
    <>
      {/* Label for the input field */}
      <label htmlFor={id}>{label}</label>&nbsp;
      {/* Input field with ref, id, type, defaultValue, and onChange handler */}
      <input
        id={id}
        ref={inputRef}
        type={type}
        defaultValue={value}
        onChange={onInputChange}
      />
    </>
  );
};

export default InputWithLabel;
