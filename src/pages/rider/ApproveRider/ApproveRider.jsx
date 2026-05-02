import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ITEMS_PER_PAGE = 5;

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const [selectedRider, setSelectedRider] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });

    // 🔍 Filter + Search
    const filteredRiders = riders.filter(rider => {
        const matchSearch =
            rider.name.toLowerCase().includes(search.toLowerCase()) ||
            rider.email.toLowerCase().includes(search.toLowerCase());

        const matchFilter =
            filter === 'all' ? true : rider.status === filter;

        return matchSearch && matchFilter;
    });

    // 📄 Pagination
    const totalPages = Math.ceil(filteredRiders.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedRiders = filteredRiders.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // 🔄 Status update
    const updateRiderStatus = (rider, status) => {
        axiosSecure.patch(`/riders/${rider._id}`, {
            status,
            email: rider.email
        }).then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    icon: "success",
                    title: `Status → ${status}`,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/riders/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "", "success");
                    }
                });
            }
        });
    };

    // 🎨 Status badge
    const getStatusBadge = (status) => {
        const base = "px-3 py-1 rounded-full text-xs font-semibold";
        if (status === 'approved')
            return <span className={`${base} bg-green-100 text-green-700`}>Approved</span>;
        if (status === 'rejected')
            return <span className={`${base} bg-red-100 text-red-600`}>Rejected</span>;
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
    };

    return (
        <div>
            <h2 className="text-3xl mb-4 font-bold">
                Riders ({filteredRiders.length})
            </h2>

            {/* 🔍 Search + Filter */}
            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search name/email..."
                    className="input input-bordered w-full max-w-xs"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />

                <select
                    className="select select-bordered"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* 📊 Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedRiders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>
                                <td>{getStatusBadge(rider.status)}</td>

                                <td className="flex gap-2">

                                    <div className="tooltip" data-tip="View">
                                        <button
                                            onClick={() => setSelectedRider(rider)}
                                            className="btn btn-sm"
                                        >
                                            <FaEye />
                                        </button>
                                    </div>

                                    <div className="tooltip" data-tip="Approve">
                                        <button
                                            onClick={() => updateRiderStatus(rider, 'approved')}
                                            className="btn btn-sm"
                                        >
                                            <FaUserCheck />
                                        </button>
                                    </div>

                                    <div className="tooltip" data-tip="Reject">
                                        <button
                                            onClick={() => updateRiderStatus(rider, 'rejected')}
                                            className="btn btn-sm"
                                        >
                                            <IoPersonRemoveSharp />
                                        </button>
                                    </div>

                                    <div className="tooltip" data-tip="Delete">
                                        <button
                                            onClick={() => handleDelete(rider._id)}
                                            className="btn btn-sm"
                                        >
                                            <FaTrashCan />
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📄 Pagination */}
            <div className="flex justify-center mt-4 gap-2">
                {
                    [...Array(totalPages).keys()].map(page => (
                        <button
                            key={page}
                            className={`btn btn-sm ${currentPage === page + 1 ? 'btn-active' : ''}`}
                            onClick={() => setCurrentPage(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))
                }
            </div>

            {/* 🧾 Modal */}
            {selectedRider && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-3">Rider Details</h3>

                        <div className="space-y-2 text-sm">
                            <p><b>Name:</b> {selectedRider.name}</p>
                            <p><b>Email:</b> {selectedRider.email}</p>
                            <p><b>Phone:</b> {selectedRider.phone}</p>
                            <p><b>Vehicle:</b> {selectedRider.vehicle}</p>
                            <p><b>Region:</b> {selectedRider.riderRegion}</p>
                            <p><b>District:</b> {selectedRider.district}</p>
                            <p><b>Address:</b> {selectedRider.address}</p>
                            <p><b>NID:</b> {selectedRider.nid}</p>
                            <p><b>Experience:</b> {selectedRider.experience} yrs</p>
                            <p><b>Status:</b> {selectedRider.status}</p>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => setSelectedRider(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setSelectedRider(null)}>close</button>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default ApproveRiders;