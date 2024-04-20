import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  const handler = () => {
    console.log("hey");
  };
  if (!onClick)
    return (
      <button onClick={handler} data-testid="button-test">
        {children}
      </button>
    );
  return (
    <button onClick={onClick} data-testid="button-test">
      {children}
    </button>
  );
};
