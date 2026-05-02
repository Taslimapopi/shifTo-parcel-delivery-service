import React, { useState } from "react";
import { FaUserShield, FaEye } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

   const handleAdmin = (user) => {
    Swal.fire({
      title: "Make Admin?",
      text: `${user.displayName} will become an admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, { role: "admin" })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire("Success!", "User is now Admin", "success");
            }
          })
          .catch(() => Swal.fire("Error!", "Something went wrong", "error"));
      }
    });
  };
   const removeAdmin = (user) => {
    Swal.fire({
      title: "Remove Admin?",
      text: `${user.displayName} will become normal user`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, { role: "user" })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire("Done!", "Admin removed", "success");
            }
          })
          .catch(() => Swal.fire("Error!", "Failed to update", "error"));
      }
    });
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

    const handleDelete = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "User removed", "success");
            }
          })
          .catch(() => Swal.fire("Error!", "Delete failed", "error"));
      }
    });
  };

  // 🎨 Role Badge
  const getRoleBadge = (role) => {
    if (role === "admin") {
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
          Admin
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-black-700 font-semibold">
        User
      </span>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">User Management</h2>

      {/* 🔍 Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                {/* User Info */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="user" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">Bangladesh</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                {/* Role */}
                <td>{getRoleBadge(user.role)}</td>

                {/* Admin Actions */}
                <td>
                  <div className="flex gap-2">
                    <div
                      className="tooltip tooltip-secondary"
                      data-tip="Make Admin"
                    >
                      <button
                        onClick={() => handleAdmin(user)}
                        className="btn btn-sm bg-green-400 text-black"
                      >
                        <FaUserShield />
                      </button>
                    </div>

                    <div
                      className="tooltip tooltip-secondary"
                      data-tip="Remove Admin"
                    >
                      <button
                        onClick={() => removeAdmin(user)}
                        className="btn btn-sm bg-red-400 text-black"
                      >
                        <FiShieldOff />
                      </button>
                    </div>
                  </div>
                </td>

                {/* Other Actions */}
                <td>
                  <div className="flex gap-2">
                    <div
                      className="tooltip tooltip-secondary"
                      data-tip="View User"
                    >
                      <button
                        onClick={() => handleView(user)}
                        className="btn btn-sm"
                      >
                        <FaEye />
                      </button>
                    </div>

                    <div
                      className="tooltip tooltip-secondary"
                      data-tip="Delete User"
                    >
                      <button onClick={()=>handleDelete(user)}
                      className="btn btn-sm">
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination UI */}
      <div className="flex justify-center mt-6 gap-2">
        <button className="btn btn-sm btn-active">1</button>
        <button className="btn btn-sm">2</button>
        <button className="btn btn-sm">3</button>
      </div>
      {selectedUser && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            {/* Header */}
            <h3 className="font-bold text-lg mb-4 text-center">User Details</h3>

            {/* Image */}
            <div className="flex justify-center mb-4">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={selectedUser.photoURL} alt="user" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {selectedUser.displayName}
              </p>
              <p>
                <b>Email:</b> {selectedUser.email}
              </p>
              <p>
                <b>Role:</b> {selectedUser.role}
              </p>
              <p>
                <b>Created At:</b> {new Date(selectedUser.createdAt).toLocaleString()}
              </p>
              {selectedUser.updatedAt && (
                <p>
                  <b>
                    {selectedUser.role.charAt(0).toUpperCase() +
                      selectedUser.role.slice(1)}{" "}
                    from:
                  </b>{" "}
                  {new Date(selectedUser.updatedAt).toLocaleString()}
                </p>
              )}
            </div>

            {/* Action */}
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>
          </div>

          {/* backdrop click close */}
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedUser(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManageUser;
