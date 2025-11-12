import { useUpdateUserMutation } from "@/app/_api/user";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import TextArea from "@/components/form/text-area";
import { CloseIcon } from "@/icons";
import { productServiceCategories } from "@/lib/vendor-category-data";
import { EditVendorProfileSchema, EditVendorProfileSchemaType } from "@/schema/vendor";

import { userAtom } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
    vendorName: "",
    about: "",
    productService: "",
    registrationNumber: "",
    dateEstablished: "",
};

type EditVendorProfileProps = {
    close: () => void;
};

function EditVendorProfile({ close }: EditVendorProfileProps) {
    const [user] = useAtom(userAtom);

    const { mutateAsync, isPending } = useUpdateUserMutation();

    const {
        control,
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
        resolver: zodResolver(EditVendorProfileSchema),
    });

    const onSubmit = async (data: EditVendorProfileSchemaType) => {
        const newData = {
            vendorName: data.vendorName,
            vendorAbout: data.about,
            vendorProductService: data.productService,
            vendorRegistrationNumber: data.registrationNumber,
            vendorDateEstablished: data.dateEstablished,
        };

        mutateAsync(newData, {
            onSuccess: (response) => {
                if (response.success) {
                    toast.success("Profile updated successfully");
                    close();
                }
            },
            onError: (error) => { },
        });
    };

    useEffect(() => {
        reset({
            vendorName: user?.user?.vendorProfile?.vendorName || "",
            about: user?.user?.vendorProfile?.about || "",
            productService: user?.user?.vendorProfile?.productService || "",
            registrationNumber: user?.user?.vendorProfile?.registrationNumber || "",
            dateEstablished: user?.user?.vendorProfile?.dateEstablished
                ? new Date(user.user.vendorProfile.dateEstablished).toISOString().split('T')[0]
                : "",
        });
    }, []);

    return (
        <form
            className="bg-white font-inter rounded-xl w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <header className="flex items-center justify-between border-b px-6 py-2">
                <h4 className="text-base font-semibold">Edit Profile</h4>

                <button
                    onClick={() => {
                        if (isSubmitting || isPending) return;
                        close();
                    }}
                >
                    <CloseIcon className="w-4 h-4" />
                </button>
            </header>

            <div className="p-6 overflow-y-scroll max-h-[600px]">
                <div className="space-y-6">
                    <Input
                        placeholder="Enter Vendor Name"
                        inputClassName="!rounded-[10px] !h-[40px]"
                        className="!w-full"
                        label="Vendor Name"
                        {...register("vendorName")}
                        error={errors.vendorName?.message}
                    />

                    <TextArea
                        placeholder="Enter About"
                        textareaClassName=""
                        className="w-full"
                        label="About"
                        {...register("about")}
                        error={errors.about?.message}
                    />

                    <Controller
                        control={control}
                        name="productService"
                        render={({
                            field: { value, onChange },
                            fieldState: { error },
                        }) => (
                            <Select
                                label="Product/Service"
                                id="lga"
                                value={value} // Ensure value is a string
                                onChange={onChange} // Extract the value string
                                className={"w-full !rounded-[10px] !h-[40px]"}
                                options={productServiceCategories}
                                error={errors.productService?.message || error?.message}
                            />
                        )}
                    />

                    <Input

                        placeholder="Enter Registration Number"
                        inputClassName="!rounded-[10px] !h-[40px]"
                        className="!w-full"
                        label="Registration Number"
                        {...register("registrationNumber")}
                        error={errors.registrationNumber?.message}
                    />

                    <Input
                        type="date"
                        placeholder="Enter Date Established"
                        inputClassName="!rounded-[10px] !h-[40px]"
                        className="!w-full"
                        label="Date Established"
                        {...register("dateEstablished")}
                        error={errors.dateEstablished?.message}
                    />
                </div>
            </div>

            <div className="w-full mt-4 px-6 py-4 border-t">
                <Button
                    type="submit"
                    className="!rounded-full !shadow-none"
                    loading={isSubmitting || isPending}
                >
                    Save
                </Button>
            </div>
        </form>
    );
}

export default EditVendorProfile;
