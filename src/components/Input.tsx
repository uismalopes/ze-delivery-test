import React from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isInvalid?: Boolean;
}

const Input = React.forwardRef<HTMLInputElement, IProps>(
  ({ isInvalid = false, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={`form-control ${isInvalid ? "invalid" : ""}`.trim()}
      />
    );
  }
);

export default Input;
