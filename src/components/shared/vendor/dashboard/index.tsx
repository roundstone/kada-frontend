"use client";
import React, { useState } from "react";
import Overview from "./overview";
import { BriefcaseIcon, SearchIcon } from "@/icons";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import Services from "../../farmer/vendors/service/services";
import AddProductServiceButton from "../add-button";
import { useGetProducts } from "@/app/_api/catalog";
import { ICatalog } from "@/interface/catalog";
import useDebounce from "@/hooks/use-debounce";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";

function VendorDashboardSharedPage() {
  useDashboardTitle("Dashboard");
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("Our Services");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState<ICatalog[]>([]);
  const [stats, setStats] = React.useState<any>({});
  const debouncedSearchQuery = useDebounce(search);
  const { user } = useAtomValue(userAtom);

  const active = React.useMemo(() => {
    return activeTab === "Our Services" ? "services" : "products";
  }, [activeTab]);

  const { data, isFetching, isRefetching, isError } = useGetProducts({
    enabled: loaded,
    params: {
      page,
      search: debouncedSearchQuery,
      limit,
      type: active,
    },
  });

  React.useEffect(() => {
    if (!isFetching && !isRefetching && data?.success && data?.data) {
      setProducts(data.data.products);
      setStats((data.data as any).stats);
    }
  }, [data, isFetching, isRefetching]);

  const tabs = React.useMemo(
    () => [
      {
        id: "our-services",
        label: "Our Services",
        badge: stats?.totalServices || 0,
        icon: BriefcaseIcon,
      },
      {
        id: "products",
        label: "Products",
        badge: stats?.totalProducts || 0,
        icon: BriefcaseIcon,
      },
    ],
    [stats]
  );

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center text-sm leading-tight">
        <div className="rounded-full px-4 py-1 bg-[#F0EFEC]">
          👍🏾 Welcome Back, {user?.vendorProfile?.vendorName || ""}
        </div>

        <div className="flex">
          <AddProductServiceButton />
        </div>
      </div>

      <Overview />

      <div className="flex justify-items-stretch mt-8 gap-7">
        <div className="flex-1 h-auto">
          <div className="border bg-white rounded-2xl border-[#ECF2F6] p-4 space-y-6">
            <div className="flex justify-between">
              <div className="flex">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.id}
                    title={tab.label}
                    active={activeTab}
                    onClick={() => setActiveTab(tab.label)}
                    count={Number(tab.badge)}
                    className="max-lg:flex-1"
                    icon={tab.icon}
                  />
                ))}
              </div>

              <div className="">
                <Input
                  placeholder="Search here..."
                  inputClassName="!rounded-[10px]"
                  className="w-[500px] max-lg:w-full"
                  prefix={<SearchIcon className="fill-black" />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  clearable
                  onClear={() => setSearch("")}
                />
              </div>
            </div>

            <Services
              products={products}
              activeTab={active}
              isError={isError}
              loading={isFetching || isRefetching}
            />
          </div>
        </div>

        <div className="w-[275px] h-[444px] max-lg:hidden">
          <div className="relative rounded-xl bg-[url('/images/vendor-banner.png')] bg-center bg-cover bg-no-repeat h-full overflow-hidden z-10 p-6 flex flex-col justify-between">
            <div className="absolute inset-0 bg-custom-gradient z-[-1]"></div>
            <h4 className="text-2xl font-bold text-white text-center">
              Increase your sales expand your market, and increase sales
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorDashboardSharedPage;
