import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch, isLoading } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      cost: Number(parcel.totalPrice) ,
    };

    try {
      const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
      if (res.data.url) {
        window.location.assign(res.data.url);   // Redirect to Stripe
      }
    } catch (error) {
      Swal.fire("Error", "Payment session failed", "error");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading parcels...</div>;

  return (
    <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-200">
      <div className="px-8 py-6 border-b border-base-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-base-content">My Parcels</h2>
        <p className="text-sm text-base-content/60">Total: {parcels.length} parcels</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-base-200 border-b border-base-300">
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Tracking ID</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Receiver</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Parcel</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Weight</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Price</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Payment</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Delivery Status</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {parcels.length > 0 ? (
              parcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-base-200/50 transition-colors">
                  <td className="px-8 py-5 font-mono font-medium text-primary">
                    {parcel.trackingId}
                  </td>
                  <td className="px-8 py-5">{parcel.receiverName}</td>
                  <td className="px-8 py-5">{parcel.parcelName}</td>
                  <td className="px-8 py-5">{parcel.weight} kg</td>
                  <td className="px-8 py-5 font-semibold text-secondary">
                    ৳ {parcel.totalPrice}
                  </td>

                  <td className="px-8 py-5">
                    {parcel.paymentStatus === "paid" ? (
                      <span className="btn btn-sm px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Paid
                      </span>
                    ) : (
                      <button 
                        onClick={() => handlePayment(parcel)}
                        className="button btn btn-sm px-4"
                      >
                        Pay
                      </button>
                    )}
                  </td>

                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium
                      ${parcel.deliveryStatus === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                        parcel.deliveryStatus === "In Transit" ? "bg-blue-100 text-blue-700" :
                        "bg-orange-100 text-orange-700"}`}>
                      {parcel.deliveryStatus || "Pending"}
                    </span>
                  </td>

                  <td className="px-8 py-5 flex gap-3">
                    <button className="btn btn-sm hover:bg-secondary">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-sm hover:bg-red-500 hover:text-white"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-8 py-16 text-center text-base-content/50">
                  No parcels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;