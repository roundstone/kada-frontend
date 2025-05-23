import React from "react";

interface CommitteeMemberProps {
  name: string;
  role: string;
  imageSrc: string;
  background: string;
}

const CommitteeMember: React.FC<CommitteeMemberProps> = ({
  name,
  role,
  background,
  imageSrc,
}) => {
  return (
    <article className="flex flex-col min-w-[240px] w-[259px]">
      <div className="relative flex justify-center items-center">
        <img
          src={background}
          alt="img-1"
          className="rounded-full w-[250px] mb-0 fill-red-200"
        />

        <img
          src={imageSrc}
          alt="img-2"
          className="rounded-full w-[161px] h-[161px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-0 object-cover"
        />
      </div>
      <div className="flex flex-col items-center self-center mt-3 leading-tight text-black">
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <p className="mt-1.5 text-base text-center">{role}</p>
      </div>
    </article>
  );
};

export default CommitteeMember;
