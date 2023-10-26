import React from "react";
import cn from "classnames";

export type ContainerProps = {
  // Defines the component id -kebab casing
  id?: string;
  // Defines if the component is full width
  hasPadding?: boolean;
  // Contains the components to be rendered inside
  children: React.ReactNode;
  // Custom className
  className?: string;
};

const Container = ({
  id,
  hasPadding = true,
  children,
  className,
}: ContainerProps): JSX.Element => {
  return (
    <div
      id={id}
      className={cn(
        "w-full max-w-[1320px] mx-auto grid grid-cols-12 gap-x-4",
        className,
        {
          "px-6 sm:px-8": hasPadding,
        }
      )}
    >
      {children}
    </div>
  );
};

export default Container;
