import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", "rider-assigned", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?deliveryStatus=rider-assigned&riderEmail=${user?.email}`,
      );
      return res.data;
    },
  });

  const handleRiderStatusBtn = async (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    let message = `Parcel Status is updated with ${status.split("_").join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/rider`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2>Assign Task : {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === "rider-assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleRiderStatusBtn(parcel, "rider-arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleRiderStatusBtn(parcel, "pending-pickup")
                        }
                        className="btn btn-warning text-black ms-2"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td>
                  <button
                    disabled={parcel.deliveryStatus === "parcel-pickedUp"}
                    onClick={() =>
                      handleRiderStatusBtn(parcel, "parcel-pickedUp")
                    }
                    className="btn btn-primary text-black"
                  >
                    {parcel.deliveryStatus === "parcel-pickedUp"
                      ? "Parcel Picked Up"
                      : "Mark as Picked Up"}
                  </button>
                  <button
                    onClick={() =>
                      handleRiderStatusBtn(parcel, "parcel-delivered")
                    }
                    className="btn btn-primary text-black mx-2"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignDeliveries;
