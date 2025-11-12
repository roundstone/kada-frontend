import { usePersonalizeCroppingMutation } from "@/app/_api/farm";
import { KadaButton } from "@/components/form/button";
import DatePicker from "@/components/form/date-picker";
import Select from "@/components/form/select";
import { CloseIcon } from "@/icons";
import { createCroppingSchema, createCroppingSchemaType } from "@/schema/crop";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "rizzui";
import { toast } from "sonner";

const defaultValues: createCroppingSchemaType = {
  cropId: "",
  plantingDate: "" as any,
  farmerId: "",
  farmId: "",
  seasonId: "",
};

function AddCroppping({
  open,
  close,
  crop,
}: {
  open: boolean;
  close: () => void;
  crop: any;
}) {
  const [plantingDate, setPlantingDate] = React.useState<Date>();
  const [cropOptions, setCropOptions] = React.useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = React.useState<any | null>(null);
  const [seasons, setSeasons] = React.useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = React.useState<any | null>(null);
  const [seasonOptions, setSeasonOptions] = React.useState<any[]>([]);
  const { mutateAsync, isPending } = usePersonalizeCroppingMutation();
  const {
    reset,
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(createCroppingSchema),
  });

  console.log(errors);

  React.useEffect(() => {
    if (crop) {
      reset({
        farmId: crop.id,
        farmerId: crop.farmerId,
      });
    }
  }, [crop]);

  React.useEffect(() => {
    if (crop.crops) {
      setCropOptions(
        crop.crops.map((crop: any) => ({
          label: crop.name,
          value: crop.id,
          seasons: crop.seasons,
        }))
      );
    }
  }, [crop]);

  React.useEffect(() => {
    if (seasons) {
      setSeasonOptions(
        seasons.map((season: any) => ({
          label: season.name + " (" + season.period + ")",
          value: season.id,
        }))
      );
    }
  }, [seasons]);

  const onSubmit = (data: createCroppingSchemaType) => {
    mutateAsync(data, {
      onSuccess: () => {
        toast.success("Cropping Calendar created successfully");
        reset(defaultValues);
        close();
      },
    });
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={() => {}}
        size={"md"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <form
          className="flex flex-col w-full rounded-[10px] max-md:max-w-full bg-white p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <header className="flex justify-between bg-[#FFFFFF] border-b border-[#ECF2F6]">
            <h1 className="self-start text-xl font-bold text-green-800">
              Set Personalized Cropping Calender
            </h1>
            <button onClick={close}>
              <CloseIcon className="w-4 h-4" />
            </button>
          </header>

          <div className="w-full">
            <div className="flex flex-col space-y-4">
              <Controller
                control={control}
                name="cropId"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Select
                    label="Crop"
                    value={selectedCrop}
                    onChange={(selected) => {
                      if (selected && typeof selected === 'object' && 'value' in selected && 'seasons' in selected) {
                        onChange(selected.value);
                        setSelectedCrop(selected);
                        setSeasons(Array.isArray(selected.seasons) ? selected.seasons : []);
                      } else {
                        onChange(undefined);
                        setSelectedCrop(undefined);
                        setSeasons([]);
                      }
                    }}
                    className={"!h-[56px]"}
                    options={cropOptions}
                    error={errors.cropId?.message || error?.message}
                    selectClassName="!h-[40px] border-[.5px] border-primary rounded-full"
                  />
                )}
              />

              <Controller
                control={control}
                name="seasonId"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Select
                    label="Season"
                    value={selectedSeason}
                    onChange={(selected) => {
                      if (selected && typeof selected === 'object' && 'value' in selected) {
                        onChange(selected.value);
                        setSelectedSeason(selected);
                      } else {
                        onChange(undefined);
                        setSelectedSeason(undefined);
                      }
                    }}
                    className={"!h-[56px]"}
                    options={seasonOptions}
                    error={errors.cropId?.message || error?.message}
                    selectClassName="!h-[40px] border-[.5px] border-primary rounded-full"
                  />
                )}
              />

              <Controller
                control={control}
                name="plantingDate"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    selected={plantingDate}
                    onChange={(date: Date) => {
                      setPlantingDate(date);
                      onChange(date);
                    }}
                    placeholderText="Select Date"
                    // maxDate={new Date()}: FOR TEST
                    wrapperClassName="w-full"
                    inputProps={{
                      inputClassName:
                        "!rounded-full border-primary border-[.5px]",
                      label: "Planting Date",
                      error: errors.plantingDate?.message,
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <KadaButton
              type="submit"
              className="!rounded-full !shadow-none"
              loading={isPending}
            >
              Submit
            </KadaButton>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
}

export default AddCroppping;
