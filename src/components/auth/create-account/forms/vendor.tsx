import { useRegisterMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Password from "@/components/form/password";
import Select from "@/components/form/select";
import { UserType } from "@/interface/user";
import {
  lgaOptionsByZone,
  wardOptionsByLga,
  zoneOptions,
} from "@/lib/lga-data";
import { VendorSchema, VendorSchemaType } from "@/schema/auth";
import { appAtom } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  vendorName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  userType: UserType.VENDOR,
  acceptTerms: false,
  lga: "",
  zone: "",
  ward: "",
  community: "uyftytfyt",
};

const VendorForm: React.FC = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useRegisterMutation();
  const [app, setApp] = useAtom(appAtom);
  const [option, setOption] = React.useState<any>(null);
  const [zoneOption, setZoneOption] = React.useState<any>(null);
  const [wardOption, setWardOption] = React.useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    defaultValues,
    resolver: zodResolver(VendorSchema),
  });

  const onSubmit = (data: VendorSchemaType) => {
    const { confirmPassword, acceptTerms, ...rest } = data;

    mutateAsync(rest, {
      onSuccess: (response) => {
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          setApp({ ...app, userEmail: data.email });
          router.push("/account-setup/verify-account?type=vendor");
        } else {
          toast.error(response.message);
        }
      },
    });
  };

  const lgaOptions = React.useMemo(() => {
    if (zoneOption) {
      return lgaOptionsByZone(zoneOption.value);
    }
    return [];
  }, [zoneOption]);

  const wardOptions = React.useMemo(() => {
    if (option) {
      return wardOptionsByLga(option.value);
    }
    return [];
  }, [option]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start lg:px-8 mt20 max-md:mt-10"
    >
      <div className="flex flex-col">
        <h2 className="text-base font-bold text-teal-700">
          Agro Input Dealers
        </h2>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          Please complete the form to get started
        </p>
      </div>

      <div className="w-full space-y-4">
        <Input
          placeholder="Enter your email"
          className=""
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Company Name"
          id="firstName"
          placeholder="What is your company name"
          className=""
          {...register("vendorName")}
          error={errors.vendorName?.message}
        />

        <Input
          label="Phone"
          prefix={"+234"}
          type="tel"
          id="phone"
          placeholder=""
          className=""
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />

        <Controller
          name="zone"
          control={control}
          render={({ field: { name, onChange } }) => (
            <Select
              label="Zone"
              id="zone"
              options={zoneOptions}
              onChange={(e: any) => {
                setZoneOption(e);
                onChange(e.value);
              }}
              value={zoneOption}
              error={errors.zone?.message}
            />
          )}
        />

        <Controller
          name="lga"
          control={control}
          render={({ field: { name, onChange } }) => (
            <Select
              label="Local Government Area (LGA)"
              id="lga"
              options={lgaOptions}
              onChange={(e: any) => {
                setOption(e);
                onChange(e.value);
              }}
              value={option}
              error={errors.lga?.message}
            />
          )}
        />

        <Controller
          name="ward"
          control={control}
          render={({ field: { name, onChange } }) => (
            <Select
              label="Ward"
              id="ward"
              options={wardOptions}
              onChange={(e: any) => {
                setWardOption(e);
                onChange(e.value);
              }}
              error={errors.ward?.message}
              value={wardOption}
            />
          )}
        />

        <Input
          label="Community"
          id="community"
          placeholder="What is your community"
          className=""
          {...register("community")}
          error={errors.community?.message}
        />

        <Password
          label="Password"
          id="password"
          placeholder={"*******"}
          className=""
          {...register("password")}
          error={errors.password?.message}
        />

        <Password
          label="Confirm Password"
          id="confirmPassword"
          placeholder={"*******"}
          className=""
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <div className="flex flex-col mt-9 self-stretch">
        <div className="">
          <div className="flex gap-1.5 items-center text-sm font-light text-zinc-700">
            <input
              type="checkbox"
              id="terms"
              {...register("acceptTerms")}
              className="w-3 h-3 border border-solid border-zinc-700 rounded-sm checked:bg-primary checked:border-primary focus:ring-0 text-primary"
            />
            <label htmlFor="terms" className="self-stretch my-auto">
              <span className="font-medium">
                I agree with the terms and conditions of this application
              </span>
            </label>
          </div>
          <p className="text-red-500 text-xs mt-1">
            {errors.acceptTerms?.message}
          </p>
        </div>

        <Button
          loading={isSubmitting || isPending}
          className="!rounded-full !py-4 mt-3.5 w-full"
          type="submit"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default VendorForm;
