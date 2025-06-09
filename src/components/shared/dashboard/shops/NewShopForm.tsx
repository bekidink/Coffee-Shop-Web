
"use client";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { UserRole } from "@/types/next-auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextareaInput from "../../Forminputs/TextArea";
import ImageInput from "../../Forminputs/ImageInput";
import SelectInput from "../../Forminputs/SelectInput";
import TextInput from "../../Forminputs/TextInput";
import SubmitButton from "../../Forminputs/SubmitButton";
import { Country, State, City } from "country-state-city";

export interface Vendor {
  id: string;
  name: string;
  role: UserRole;
}

export type ShopProps = {
  id: string;
  name: string;
  vendorId: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  averageRating: number;
  addresses?: {
    formattedAddress: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    isDefault: boolean;
  }[];
};

interface Props {
  vendors: Vendor[];
  data?: ShopProps;
}

// Utility function to generate formatted address
const generateFormattedAddress = (
  street: string,
  city: string,
  state: string,
  postalCode: string,
  country: string
): string => {
  const parts = [
    street,
    city,
    state,
    postalCode,
    country,
  ].filter((part) => part?.trim()); // Remove empty or undefined parts
  return parts.join(", ");
};

const NewShopForm = ({ vendors, data }: Props) => {
  const [loading, setLoading] = useState(false);
  const initialImageUrl = data?.imageUrl ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const Id = data?.id ?? "";

  // State for country, state, and city data
  const countries = Country.getAllCountries();

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: data?.name ?? "",
      vendorId: data?.vendorId ?? "",
      description: data?.description ?? "",
      street: data?.addresses?.[0]?.street ?? "",
      postalCode: data?.addresses?.[0]?.postalCode ?? "",
      latitude: data?.addresses?.[0]?.latitude?.toString() ?? "",
      longitude: data?.addresses?.[0]?.longitude?.toString() ?? "",
      formattedAddress: data?.addresses?.[0]?.formattedAddress ?? "",
      country: data?.addresses?.[0]?.country ?? "",
      state: data?.addresses?.[0]?.state ?? "",
      city: data?.addresses?.[0]?.city ?? "",
    },
  });

  const router = useRouter();

  // Watch address fields to auto-generate formattedAddress
  const street = watch("street");
  const city = watch("city");
  const state = watch("state");
  const postalCode = watch("postalCode");
  const country = watch("country");

  // Update formattedAddress when address fields change
  useEffect(() => {
    const formatted = generateFormattedAddress(
      street,
      city,
      state,
      postalCode,
      country
    );
    setValue("formattedAddress", formatted);
  }, [street, city, state, postalCode, country, setValue]);

  // Fetch countries on mount
  useEffect(() => {
    const countryList = Country.getAllCountries().map((country) => ({
      label: country.name,
      value: country.isoCode,
    }));
    

    if (data?.addresses?.[0]?.country) {
      const country = countryList.find(
        (c) => c.label ===data?.addresses?.[0]!.country
      );
      if (country) {
        setSelectedCountry(country.value);
        setValue("country", country.label);
      }
    }
  }, [data, setValue]);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry).map((state) => ({
        label: state.name,
        value: state.isoCode,
      }));
     
      setSelectedState("");
      setSelectedCity("");
      setValue("state", "");
      setValue("city", "");

      if (data?.addresses?.[0]?.state) {
        const state = stateList.find((s) => s.label === data?.addresses?.[0].state);
        if (state) {
          setSelectedState(state.value);
          setValue("state", state.label);
        }
      }
    }
  }, [selectedCountry, data, setValue]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cityList = City.getCitiesOfState(selectedCountry, selectedState).map(
        (city) => ({
          label: city.name,
          value: city.name,
        })
      );
    

      if (data?.addresses?.[0]?.city) {
        const city = cityList.find((c) => c.label === data?.addresses?.[0].city);
        if (city) {
          setSelectedCity(city.value);
          setValue("city", city.label);
        }
      }
    }
  }, [selectedCountry, selectedState, data, setValue]);
  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value);
    setSelectedState(""); // Reset state when country changes
  };
  const handleStateChange = (event: any) => {
    setSelectedState(event.target.value);
  };
  function redirect() {
    router.push("/dashboard/admin/shop");
  }

  async function onSubmit(formData: any) {
    setLoading(true);

    const address = {
      formattedAddress: formData.formattedAddress,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      postalCode: formData.postalCode,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      isDefault: true,
    };

    const submitData = {
      ...formData,
      imageUrl,
      addresses: [address],
    };

    if (Id) {
      makePutRequest(setLoading, `shops/${Id}`, submitData, "Shop", redirect);
    } else {
      makePostRequest(setLoading, "shops", submitData, "Shop", reset, redirect);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Shop Title"
            name="name"
            errors={errors}
            register={register}
          />
          <SelectInput
            label="Select Vendor"
            name="vendorId"
            register={register}
            className="w-full"
            options={vendors}
          />
          <ImageInput
            label="Shop Images"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="imageUploader"
          />
          <TextareaInput
            label="Shop Description"
            name="description"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Street Address"
            name="street"
            errors={errors}
            register={register}
          />
          <TextInput
            label="Postal Code"
            name="postalCode"
            errors={errors}
            register={register}
          />
          <TextInput
            label="Latitude"
            name="latitude"
            type="number"
            // step="any"
            errors={errors}
            register={register}
            // required
          />
          <TextInput
            label="Longitude"
            name="longitude"
            type="number"
            // step="any"
            errors={errors}
            register={register}
            // required
          />
         
          <div className="rounded-md">
            <label htmlFor="country">Country</label>
            <select
              className="text-gray-800"
              id="country"
              {...register("country", { required: "Country is required" })}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <p>{errors.country.message}</p>}
          </div>
          {/* <TextInput  name={'city'} register={register} label={'City'} errors={errors}/> */}
          <div className="overflow-hidden rounded-md">
            <label htmlFor="state">State</label>
            <select
              className="text-gray-800 "
              id="state"
              {...register("state", { required: "State is required" })}
              onChange={handleStateChange}
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <p>{errors.state.message}</p>}
          </div>
          {/* <TextInput   name={'state'} register={register} label={'State'} errors={errors}/> */}

          <div className="overflow-hidden flex flex-col rounded-md">
            <label htmlFor="city">City</label>
            <select
              id="city"
              {...register("city", { required: "City is required" })}
              disabled={!selectedState}
              className="text-gray-800"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <p>{errors.city.message}</p>}
          </div>
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={Id ? "Update Shop" : "Create Shop"}
          loadingButtonTitle={`${
            Id ? "Updating" : "Creating"
          } Shop please wait...`}
        />
      </form>
    </div>
  );
};

export default NewShopForm;
