"use client";
import Select from "@/components/form/select";
import React, { useState } from "react";

interface FilterDropdownProps {
  label: string;
  defaultValue: string;
  options: string[];
  width?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  defaultValue,
  options,
  // width = "w-[250px]"
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  return (
    <div className="flex flex-col grow shrink-0 basis-0 w-fit">
      <label
        htmlFor={`${label.toLowerCase().replace(/\s+/g, "-")}-select`}
        className="font-medium text-black"
      >
        {label}
      </label>
      <Select
        options={[
          { label: "All", value: "" },
          ...options.map((option) => ({ label: option, value: option })),
        ]}
        value={selectedOption}
        onChange={(value) => setSelectedOption(value as string)}
        className="bg-white !border-teal-700 !py-3"
      />
    </div>
  );
};

export default FilterDropdown;
