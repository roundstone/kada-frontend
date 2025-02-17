import { useGetRequestByUserIdAndType } from "@/app/_api/request";
import Button, { KadaButton } from "@/components/form/button";
import { ArrowRightIcon, HandCoins } from "@/icons";
import { RequestType } from "@/interface/request";
import { UserType } from "@/interface/user";
import { userAtom } from "@/stores/user";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";

function JoinCooperative() {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const [loaded, setLoaded] = React.useState(false);
  const {
    data: hasCooperative,
    isFetching,
    isRefetching,
  } = useGetRequestByUserIdAndType({
    enabled: loaded,
    params: {
      requestType: RequestType.FARMER_TO_COOPERATIVE,
      userId: user.user?.id.toString(),
      userType: UserType.FARMER,
      status: ["pending"],
    },
  });

  const isObjectEmpty = React.useMemo(() => {
    return hasCooperative?.data
      ? Object.keys(hasCooperative.data).length === 0
      : true;
  }, [hasCooperative?.data]);

  React.useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#D5FADC] via-white to-[#DEEDE1] bg-[length:100%_300%] bg-[0_0] h-[204px] w-full p-[24px_34px] rounded-[20px] flex items-center">
      <div className="space-y-3">
        <HandCoins className="w-12 h-12 mx-auto fill-[#00A551]" />
        <h4 className="text-xl font-bold text-center text-primary">
          {hasCooperative?.data?.status === "pending" ? (
            <span>Pending Cooperative Approval</span>
          ) : hasCooperative?.data?.status === "approved" ? (
            <></>
          ) : (
            <>Empower Your Growth – Join a Cooperative Today!</>
          )}
        </h4>

        {!isObjectEmpty ? (
          <></>
        ) : (
          <KadaButton
            className="w-full rounded-full !bg-[#00A551]"
            variant="secondary"
            rightIcon={<ArrowRightIcon className="w-4 h-4 fill-white" />}
            onClick={() => router.push("/dashboard/farmer/cooperative")}
          >
            Join Cooperative
          </KadaButton>
        )}
      </div>
    </div>
  );
}

export default JoinCooperative;
