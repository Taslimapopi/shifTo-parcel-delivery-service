import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RiderApplyForm = () => {
  const axiosSecure = useAxiosSecure()
 
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const riderRegion = useWatch({control,name:'riderRegion'})

 

    // 🔥 fetch data
  const { data: centers = [], isLoading } = useQuery({
    queryKey: ["centers"],
    queryFn: async () => {
      const res = await fetch("/serviceCenters.json");
      return res.json();
    },
  });

      const duplicateRegions = centers.map(c=>c.region)
      const regions = [... new Set(duplicateRegions)]
 

       const districtsByRegion = (region)=>{
    const districtR = centers.filter(c=>c.region===region)
    const district = districtR.map(d=>d.district)
    return district
  }
 

  const onSubmit = (data) => {
    console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. We will reach to you in 145 days",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Rider Apply Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            className="input input-bordered w-full"
            {...register("phone", {
              required: "Phone is required",
              // pattern: {
              //   value: /^01[0-9]{9}$/,
              //   message: "Invalid Bangladeshi number",
              // },
            })}
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block mb-1 font-medium">Vehicle Type</label>
          <select
            className="select select-bordered w-full"
            {...register("vehicle", { required: "Select vehicle type" })}
          >
            <option value="">Select</option>
            <option value="bike">Bike</option>
            <option value="bicycle">Bicycle</option>
            <option value="car">Car</option>
          </select>
          <p className="text-red-500 text-sm">{errors.vehicle?.message}</p>
        </div>

        {/* Region */}
        <div>
          <label className="block mb-1 font-medium">Region</label>
          <select
            className="select select-bordered w-full"
            {...register("riderRegion", { required: "Region is required" })}
          > <option value="" >Select Region</option>
            {
              regions.map((r,i)=><option key={i} >{r}</option>)
            }
           
            
          </select>
          <p className="text-red-500 text-sm">{errors.region?.message}</p>
        </div>

        {/* District (dynamic) */}
        <div>
          <label className="block mb-1 font-medium">District</label>
          <select
            className="select select-bordered w-full"
            {...register("district", { required: "District is required" })}
          >
            <option value="">Select District</option>
            {districtsByRegion(riderRegion).map((d) => (
              <option key={d} >
                {d}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.district?.message}</p>
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Full Address</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("address", { required: "Address required" })}
          ></textarea>
        </div>

        {/* NID Number */}
        <div>
          <label className="block mb-1 font-medium">NID Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("nid", { required: "NID required" })}
          />
        </div>

        {/* License Upload */}
        <div>
          <label className="block mb-1 font-medium">Driving License</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("license", { required: "License file required" })}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-1 font-medium">
            Delivery Experience (years)
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("experience")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Submitting..." : "Apply Now"}
        </button>
      </form>
    </div>
  );
};

export default RiderApplyForm;