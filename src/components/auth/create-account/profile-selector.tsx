"use client";
import useScreenSize from "@/hooks/use-screen-size";
import { UserIcon, UsersIcon } from "@/icons";
import { createQueryString } from "@/utils/query-utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface ProfileType {
  icon: React.ReactNode;
  title: string;
  description: string;
  type: string;
}

const profileTypes: ProfileType[] = [
  {
    icon: <UserIcon className="object-contain w-6 h-6" />,
    title: "Farmer",
    description:
      "with this account you can do this and Lorem ipsum do this and Lorem",
    type: "farmer",
  },
  {
    icon: <UsersIcon className="object-contain w-6 h-6" />,
    title: "Cooperative/Association",
    description:
      "with this account you can do this and Lorem ipsum do this and Lorem i",
    type: "cooperative",
  },
  {
    icon: <UsersIcon className="object-contain w-6 h-6" />,
    title: "Agro Input Dealers",
    description:
      "with this account you can do this and Lorem ipsum do this and Lorem",
    type: "vendor",
  },
  {
    icon: <UsersIcon className="object-contain w-6 h-6" />,
    title: "Enumerator",
    description:
      "with this account you can do this and Lorem ipsum do this and Lorem",
    type: "enumerator",
  },
];

const ProfileTypeSelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams?.get("type");
  const [activeType, setActiveType] = React.useState(type);
  const { width } = useScreenSize();

  React.useEffect(() => {
    setActiveType(!type ? "farmer" : type);
  }, [type]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = profileTypes.find(
      (profile) => profile.type === event.target.value
    );
    if (selectedType) {
      router.push(
        `${pathname}?${createQueryString(
          searchParams,
          "type",
          selectedType.type
        )}`
      );
    }
  };

  if (width > 992) {
    return (
      <div className="flex flex-col pl-7 mt-20 max-md:pl-5 max-md:mt-10 w-full">
        <div className="flex flex-col self-start leading-tight max-md:ml-2">
          <h2 className="text-2xl font-bold text-zinc-700">
            Create an account
          </h2>
          <p className="mt-3 text-base font-medium text-neutral-500">
            Select a profile type
          </p>
        </div>
        {profileTypes.map((type, index) => (
          <button
            key={index}
            onClick={() => {
              router.push(
                `${pathname}?${createQueryString(
                  searchParams,
                  "type",
                  `${type.type}`
                )}`
              );
            }}
            className={`flex overflow-hidden flex-col items-start py-4 pr-14 pl-5 mt-6 w-full rounded-lg ${type.type == activeType
                ? "bg-white border border-teal-700 border-solid"
                : "bg-zinc-50"
              } max-md:pr-5 transition-all ease-in-out`}
          >
            <div
              className={`flex gap-1.5 text-base text-left font-bold leading-tight ${type.type == activeType ? "text-green-800" : "text-neutral-500"
                }`}
            >
              {type.icon}
              {/* <img  src={type.icon} alt="" className="object-contain shrink-0 w-6 aspect-square" /> */}
              <div className="my-auto">{type.title}</div>
            </div>
            <div className="mt-4 text-xs font-light tracking-wide leading-4 text-zinc-600 text-left">
              {type.description}
            </div>
          </button>
        ))}
      </div>
    );
  } else {
    return (
      <div className="relative w-full my-6">
        <select
          onChange={handleSelectChange}
          className="appearance-none w-full px-4 py-4 text-base font-bold leading-tight text-green-800 bg-white border border-teal-700 rounded-lg cursor-pointer focus:outline-none"
        >
          <option>Select type</option>
          {profileTypes.map((type, index) => (
            <option
              key={type.type || index}
              value={type.type}
              // selected={type.type == activeType}
              className="flex items-center gap-1.5 text-base"
            >
              {type.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
};

export default ProfileTypeSelector;
