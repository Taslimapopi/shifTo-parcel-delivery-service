import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Headings from "../shared/Headings";
import NavBar from "../shared/navaBar/NavBar";
import Footer from "../shared/footer/Footer";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [totalPrice, setTotalPrice] = useState(0);

  const weight = useWatch({ control, name: "weight", defaultValue: 0 });
  const parcelType = useWatch({
    control,
    name: "parcelType",
    defaultValue: "",
  });

  const duplicateDistrict = serviceCenters.map((c) => c.region);
  const regions = [...new Set(duplicateDistrict)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const senderDistrict = useWatch({ control, name: "senderDistrict" });

  const receiverRegion = useWatch({control, name: "receiverRegion"})
  const receiverDistrict = useWatch({control, name: "receiverDistrict"})

  const districtByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };

  const warehouseByDistricts = (district) => {
    const warehouseDistricts = serviceCenters.filter(
      (d) => d.district === district,
    );

    const warehouses = warehouseDistricts.map((w) => w.covered_area).flat();

    return warehouses;
  };

  // Price Calculation
  useEffect(() => {
    let basePrice = 0;
    if (weight > 0) {
      basePrice = weight <= 1 ? 80 : Math.ceil(weight) * 70;
    }
    if (parcelType === "nondocument") {
      basePrice += 30;
    }
    setTotalPrice(basePrice);
  }, [weight, parcelType]);

const onSubmit = (data) => {
  Swal.fire({
    title: "Agree with the Cost?",
    text: `It will cost ৳ ${totalPrice}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, proceed!",
  }).then((result) => {
    if (result.isConfirmed) {
      const parcelData = { ...data, totalPrice };   // Add price

      axiosSecure.post("/parcels", parcelData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire("Success!", "Parcel sent successfully", "success");
          }
        })
        .catch((err) => {
          Swal.fire("Error!", "Failed to send parcel", "error");
          console.error(err);
        });
    }
  });
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-12">
      <NavBar></NavBar>
      <div className="max-w-5xl mx-auto px-6">
        <Headings>Send a Parcel</Headings>
        <p className="text-base-content/70 mt-2 mb-10">
          Fast & Reliable delivery across Bangladesh
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-base-300 shadow-xl rounded-3xl p-8 md:p-12 border border-base-200"
        >
          {/* Parcel Information */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Parcel Information</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Parcel Type
                </label>
                <select
                  {...register("parcelType", {
                    required: "Parcel type is required",
                  })}
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Type</option>
                  <option value="document">Document</option>
                  <option value="nondocument">Non-Document</option>
                </select>
                {errors.parcelType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parcelType.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Parcel Name / Description
                </label>
                <input
                  type="text"
                  {...register("parcelName", {
                    required: "Parcel name is required",
                  })}
                  placeholder="e.g. Important Documents, Laptop, Clothes"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.parcelName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parcelName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight", {
                    required: "Weight is required",
                    min: 0.1,
                  })}
                  placeholder="0.5"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.weight.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sender Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Sender Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("senderName", {
                    required: "Sender name is required",
                  })}
                  placeholder="Your full name"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.senderName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              {/* phone no */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sender Contact No
                </label>
                <input
                  type="tel"
                  {...register("senderContact", {
                    required: "Sender contact is required",
                  })}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.senderContact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderContact.message}
                  </p>
                )}
              </div>
              {/*Sender email adress */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sender Email
                </label>
                <input
                  type="email"
                  {...register("senderEmail", {
                    required: "Sender contact is required",
                  })}
                  placeholder="Sender Email"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.senderEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderEmail.message}
                  </p>
                )}
              </div>
              {/* Sender Region */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sender Region
                </label>
                <select
                  {...register("senderRegion", {
                    required: "Region is required",
                  })}
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {/* Sender District */}
              <div>
                <label className="block text-black text-sm font-medium mb-2">
                  Sender District
                </label>
                <select
                  {...register("senderDistrict", {
                    required: "District is required",
                  })}
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" >Select District</option>
                  {districtByRegion(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {/* warehouse */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Pickup Warehouse
                </label>
                <select
                  {...register("pickupWarehouse", {
                    required: "Pickup warehouse is required",
                  })}
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>Select Warehouse</option>
                  {warehouseByDistricts(senderDistrict).map((w) => (
                    <option value={w}>{w} Hub</option>
                  ))}
                </select>
                {errors.pickupWarehouse && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pickupWarehouse.message}
                  </p>
                )}
              </div>

              <div className="">
                <label className="block text-sm font-medium mb-2">
                  Full Address
                </label>
                <textarea
                  {...register("senderAddress", {
                    required: "Address is required",
                  })}
                  rows="2"
                  placeholder="House no, Road, Area"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Receiver Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Receiver Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Receiver Full Name
                </label>
                <input
                  type="text"
                  {...register("receiverName", {
                    required: "Receiver name is required",
                  })}
                  placeholder="Receiver name"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>
              

              <div>
                <label className="block text-sm font-medium mb-2">
                  Receiver Contact No
                </label>
                <input
                  type="tel"
                  {...register("receiverContact", {
                    required: "Receiver contact is required",
                  })}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.receiverContact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverContact.message}
                  </p>
                )}
              </div>

              {/*Rceiver email adress */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sender Email
                </label>
                <input
                  type="email"
                  {...register("receiverEmail", {
                    required: "receiver email is required",
                  })}
                  placeholder="Receiver Email"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.receiverEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverEmail.message}
                  </p>
                )}
              </div>

              {/*Rceiver Region */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Receiver Region
                </label>
                <select
                  defaultValue=""
                  {...register("receiverRegion", {
                    required: "Region is required",
                  })}
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Select Region
                  </option>
                  {
                    regions.map((r,i)=><option key={i} value={r}>{r}</option>)
                  }
                  
                  
                </select>
              </div>
              {/*receiver  District */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Receiver District
                </label>
                <select
                  defaultValue=""
                  {...register("receiverDistrict", {
                    required: "District is required",
                  })}
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {
                    districtByRegion(receiverRegion).map((r,i)=><option key={i} value={r}>{r}</option>)
                  }
                  
                  
                </select>
              </div>

              {/*Rceiver delivery warehouse */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Delivery Warehouse
                </label>
                <select
                  {...register("deliveryWarehouse", {
                    required: "Delivery warehouse is required",
                  })}
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" >Select Warehouse</option>
                  {
                    warehouseByDistricts(receiverDistrict).map((w,i)=>
                        <option key={i} value={w}>{w} Hub</option>

                    )
                  }
                  
                </select>
              </div>

              {/*Rceiver  address */}

              <div className="">
                <label className="block text-sm font-medium mb-2">
                  Full Address
                </label>
                <textarea
                  {...register("receiverAddress", {
                    required: "Receiver address is required",
                  })}
                  rows="2"
                  placeholder="House no, Road, Area, City"
                  className="w-full px-5 py-3.5 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                {errors.receiverAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverAddress.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-base-200 p-6 rounded-2xl mb-10 flex justify-between items-center">
            <span className="text-lg font-medium">Total Price</span>
            <span className="text-3xl font-bold text-primary">
              ৳ {totalPrice}
            </span>
          </div>

          <button
            type="submit"
            className="button w-full py-4 text-lg font-semibold"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SendParcel;
