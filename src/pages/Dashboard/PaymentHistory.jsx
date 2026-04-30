import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [], isLoading, isError } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email, // prevents unnecessary call
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center mt-10 text-red-500">Failed to load payments</div>;
    }

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Parcel ID</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover">
                                <td>{index + 1}</td>
                                <td>{payment.parcelName}</td>
                                <td>{payment.parcelId}</td>
                                <td className="text-sm">{payment.transactionId}</td>
                                <td>৳ {payment.cost}</td>
                                <td>
                                    <span className={`px-2 py-1 rounded text-white text-sm ${
                                        payment.paymentStatus === 'paid'
                                            ? 'bg-green-500'
                                            : 'bg-yellow-500'
                                    }`}>
                                        {payment.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    {new Date(payment.paidAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {payments.length === 0 && (
                    <p className="text-center mt-5 text-gray-500">
                        No payment history found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;