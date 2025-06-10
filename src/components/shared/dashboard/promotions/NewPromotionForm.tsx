"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Discount, Shop } from "@/types";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";

type CreatePromotionDto = {
  code: string;
  type: "PERCENTAGE" | "FIXED" | "BOGO";
  value: number;
  description: string;
  startDate: string;
  endDate: string;
  minOrderAmount?: number;
  maxUses?: number;
  shopId?: string;
  productId?: string;
};

interface NewPromotionFormProps {
  shops: Shop[];
  updateData?: Discount;
}

const NewPromotionForm: React.FC<NewPromotionFormProps> = ({
  shops,
  updateData,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | undefined>();
  const Id = updateData?.id ?? "";

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: updateData?.startDate ? new Date(updateData.startDate) : undefined,
    to: updateData?.endDate ? new Date(updateData.endDate) : undefined,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreatePromotionDto>({
    defaultValues: {
      shopId: updateData?.shop?.id,
      productId: updateData?.product?.id,
      code: updateData?.code || "",
      description: updateData?.description || "",
      minOrderAmount: updateData?.minOrderAmount,
      maxUses: updateData?.maxUses,
      value: updateData?.value || 0,
      type: updateData?.type || "PERCENTAGE",
    },
  });

  const selectedShopId = watch("shopId");

  useEffect(() => {
    const foundShop = shops.find((shop) => shop.id === selectedShopId);
    setSelectedShop(foundShop);
  }, [selectedShopId, shops]);

  const redirect = () => {
    router.push("/dashboard/admin/promotions");
  };

  const onSubmit = async (data: CreatePromotionDto) => {
    setLoading(true);
    data.startDate = dateRange.from?.toISOString() || "";
    data.endDate = dateRange.to?.toISOString() || "";
    if (Id) {
      makePutRequest(
        setLoading,
        `promotions/${Id}`,
        data,
        "Promotion",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "promotions",
        data,
        "Promotion",
        reset,
        redirect
      );
    }
  };

  const formatDateRange = (range: { from?: Date; to?: Date }) => {
    const { from, to } = range;
    if (!from && !to) return "Pick date range";
    if (from && !to) return `${format(from, "PPP")} — ...`;
    if (from && to) return `${format(from, "PPP")} — ${format(to, "PPP")}`;
    return "Pick date range";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-5xl p-4 gap-y-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="code">Promotion Code</Label>
          <Input id="code" {...register("code", { required: true })} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="type">Promotion Type</Label>
          <Select
            defaultValue={updateData?.type}
            onValueChange={(value) => setValue("type", value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE">Percentage</SelectItem>
              <SelectItem value="FIXED">Fixed</SelectItem>
              <SelectItem value="BOGO">Buy One Get One</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="value">Value</Label>
          <Input
            type="number"
            id="value"
            {...register("value", { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="flex flex-col gap-y-2">
          <Label>Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDateRange(dateRange)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange({ from: range?.from, to: range?.to });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="minOrderAmount">Min Order Amount</Label>
            <Input
              type="number"
              id="minOrderAmount"
              {...register("minOrderAmount", { valueAsNumber: true })}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="maxUses">Max Uses</Label>
            <Input
              type="number"
              id="maxUses"
              {...register("maxUses", { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-3">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="shopId">Select Shop</Label>
          <Select
            defaultValue={updateData?.shop?.id}
            onValueChange={(value) => setValue("shopId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a shop" />
            </SelectTrigger>
            <SelectContent>
              {shops.map((shop) => (
                <SelectItem key={shop.id} value={shop.id}>
                  {shop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedShop && (
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="productId">Select Product</Label>
            <Select
              defaultValue={updateData?.product?.id}
              onValueChange={(value) => setValue("productId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a product" />
              </SelectTrigger>
              <SelectContent>
                {selectedShop.products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button type="submit">
        {Id ? "Update Promotion" : "Create Promotion"}
      </Button>
    </form>
  );
};

export default NewPromotionForm;
