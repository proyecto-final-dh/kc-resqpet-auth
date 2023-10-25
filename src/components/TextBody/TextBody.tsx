import cn from "classnames";

type TextBodyProps = {
  children: React.ReactNode;
  size: "m" | "s";
  weight: "regular" | "medium" | "bold";
  className?: string;
};

const TextBody = ({ children, size, weight, className }: TextBodyProps) => {
  const sizeClass = {
    m: "text-body-m",
    s: "text-body-s",
  }[size];

  const weightClass = {
    regular: "font-regular",
    medium: "font-medium",
    bold: "font-bold",
  }[weight];

  const getProps = () => ({
    className: cn(sizeClass, weightClass, className),
    children,
  });

  return <span {...getProps()} />;
};

export default TextBody;
