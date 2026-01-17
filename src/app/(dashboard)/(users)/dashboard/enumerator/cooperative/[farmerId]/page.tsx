import FarmerCooperativeSharedPage from "@/components/shared/farmer/cooperative";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cooperative",
};

type Params = {
  farmerId: string;
};

type FarmerCooperativePageProps = {
  params: Promise<Params>;
};

export default async function FarmerCooperativePage({
  params,
}: FarmerCooperativePageProps) {
  const { farmerId } = await params;
  return <FarmerCooperativeSharedPage farmerId={farmerId} />;
}
