"use client";

interface ButtonProps {
  onClick?: () => void;
  primary?: boolean;
  label?: string;
  size?: string;
}

export const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button onClick={onClick} data-testid="button-test">
      {label}
    </button>
  );
};
