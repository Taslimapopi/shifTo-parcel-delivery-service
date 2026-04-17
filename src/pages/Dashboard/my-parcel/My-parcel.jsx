import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcel = () => {
  const [parcels, setParcels] = useState([]);
  const axios = useAxiosSecure()

  // Later replace with real API call
  useEffect(() => { axios.get('/parcels').then(res => setParcels(res.data)) }, [axios]);

  console.log(parcels)

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
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Sender</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Receiver</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Parcel</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Weight</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Price</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Payment</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Delivery Status</th>
              <th className="px-8 py-5 text-left text-sm font-medium text-base-content/70">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {parcels.length > 0 ? (
              parcels.map((parcel) => (
                <tr key={parcel._id || parcel.id} className="hover:bg-base-200/50 transition-colors">
                  <td className="px-8 py-5 font-mono font-medium text-primary">
                    {parcel.id || parcel.trackingId}
                  </td>
                  <td className="px-8 py-5 text-base-content">{parcel.senderName}</td>
                  <td className="px-8 py-5 text-base-content">{parcel.receiverName}</td>
                  <td className="px-8 py-5 text-base-content">{parcel.parcelName}</td>
                  <td className="px-8 py-5">{parcel.weight} kg</td>
                  <td className="px-8 py-5 font-semibold text-secondary">৳ {parcel.totalPrice}</td>
                  
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium
                      ${parcel.paymentStatus === 'Paid' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {parcel.paymentStatus}
                    </span>
                  </td>

                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium
                      ${parcel.deliveryStatus === 'Delivered' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : parcel.deliveryStatus === 'In Transit' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-orange-100 text-orange-700'}`}>
                      {parcel.deliveryStatus}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-base-content/80">{parcel.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-8 py-16 text-center text-base-content/50">
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