"use client";
import React from "react";
import { cn, Select as RizzSelect, SelectOption, SelectProps } from "rizzui";

interface SelectProp extends SelectProps<SelectOption> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProp>(
  ({ error, label, className, ...props }, ref) => (
    <div className="flex flex-col my-1">
      <RizzSelect
        as="div"                     // <-- THIS LINE FIXES IT
        label={label}
        selectClassName={cn(
          "ring-0 bg-[#F9F9F9] rounded-[60px] max-md:px-5 max-md:max-w-full border-[0.4px] border-primary",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  )
);

Select.displayName = "Select";

export default Select;