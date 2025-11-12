"use client";
import Select from "@/components/form/select";
import { kadaLGA, lgaOptions } from "@/lib/lga-data";
import React, { useState } from "react";

const LocalGovernmentSelector: React.FC = () => {
  const [localGovernment, setLocalGovernment] = useState(kadaLGA.lgas[0]);

  return (
    <div className="flex flex-col md:self-start self-center text-sm">
      <label
        htmlFor="localGovernment"
        className="self-start font-bold leading-none text-zinc-700"
      >
        Select Local Government
      </label>
      <div className="flex flex-col mt-3 w-full text-black rounded-none max-w-[391px]">
        <Select
          options={lgaOptions}
          value={localGovernment}
          onChange={(value) => setLocalGovernment(value as string)}
          className="md:max-w-[391px] w-full !py-2"
        ></Select>
      </div>
    </div>
  );
};

export default LocalGovernmentSelector;
