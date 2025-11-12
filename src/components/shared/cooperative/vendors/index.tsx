"use client";
import React from "react";
import Input from "@/components/form/input";
import { SearchIcon } from "@/icons";
import VendorCard from "@/components/common/vendor-card";
import Catalog from "@/components/common/catalog";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { useGetVendorsQuery } from "@/app/_api/user";
import { useGetProducts } from "@/app/_api/catalog";
import { Empty } from "rizzui";
import VendorCardSkeleton from "@/components/skeletons/vendor-card";
import CatalogSkeleton from "@/components/skeletons/catalog";
import Select from "@/components/form/select";
import { productServiceCategories } from "@/lib/vendor-category-data";

function CooperativeVendorsSharedPage() {
  useDashboardTitle("Vendors");
  const [loaded, setLoaded] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const debouncedSearchQuery = useDebounce(search);

  const [productService, setProductService] = React.useState<{ value: string } | null>(null);
  const debouncedFilterProductServiceQuery = useDebounce(productService?.value!);

  const { data, isFetching, isRefetching } = useGetVendorsQuery({
    enabled: loaded,
    params: {
      page,
      limit,
      search: debouncedSearchQuery,
      productService: debouncedFilterProductServiceQuery
    },
  });

  const {
    data: productsData,
    isFetching: isProductFetching,
    isRefetching: isProductRefetching,
    isError,
  } = useGetProducts({
    enabled: loaded,
    params: {
      page: 1,
      limit: 10,
    },
  });

  React.useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <section className="flex gap-5 min-h-[calc(100vh-70px)]">
      <div className="flex-1 space-y-4">
        <h4 className="text-2xl font-inter font-bold">Explore Vendors</h4>

        <div className="flex gap-2">
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px]"
            className="w-full lg:w-[500px]"
            prefix={<SearchIcon className="fill-black" />}
            onChange={(e) => setSearch(e.target.value)}
            clearable
            onClear={() => setSearch("")}
            value={search}
          />

          <Select
            clearable={productService !== null}
            onClear={() => setProductService(null)}
            options={productServiceCategories}
            onChange={(value) => setProductService(value as { value: string } | null)}
            value={productService}
            selectClassName="min-w-40"
          />
        </div>

        <div className="border border-[#DFDFDF] p-6 bg-white rounded-2xl">
          {isFetching || isRefetching ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <VendorCardSkeleton />
              <VendorCardSkeleton />
            </div>
          ) : data?.data?.total === 0 ? (
            <>
              <Empty text="No Vendor Data" />
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {data?.data?.users.map((user) => (
                  <VendorCard vendor={user} key={user.id + user.email} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-[390px] space-y-6 divide-y bg-white border-l border-[#F2F4F8] ">
        <div className="px-4">
          <h4 className="text-lg font-inter font-bold">
            {" "}
            Popular Services/Products
          </h4>

          <div className="space-y-4 mt-6">
            {isProductFetching || isProductRefetching ? (
              <CatalogSkeleton />
            ) : isError ? (
              <div className="">error...</div>
            ) : productsData?.data?.products?.length === 0 ? (
              <Empty className="" text="No service available" />
            ) : (
              productsData?.data?.products
                .slice(0, 3)
                .map((product) => (
                  <Catalog
                    type={product.type}
                    image={product.imagePath ?? "/images/bdo.png"}
                    name={product.name}
                    price={product.amount}
                    description={product.description}
                    key={product.id + product.name + product.amount}
                    href={`vendors/${product.id}`}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CooperativeVendorsSharedPage;
