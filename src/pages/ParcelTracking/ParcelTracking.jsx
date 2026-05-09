import { useQuery } from '@tanstack/react-query';
import React from 'react';


import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import NavBar from '../shared/navaBar/NavBar';
import Footer from '../shared/footer/Footer';

const statusColors = {
  default: { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-200', dot: 'bg-blue-500', line: 'bg-blue-200' },
};

const getStatusStyle = (index, total) => {
  if (index === 0) return { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200', dot: 'bg-emerald-500', line: 'bg-emerald-200', icon: 'check' };
  if (index === total - 1) return { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-200', dot: 'bg-blue-500', line: 'bg-blue-200', icon: 'truck' };
  return { bg: 'bg-slate-50', text: 'text-slate-600', ring: 'ring-slate-200', dot: 'bg-slate-400', line: 'bg-slate-200', icon: 'dot' };
};

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h13l3 7H1V1zM17 8h3l2 4v5h-5V8z" />
  </svg>
);

const DotIcon = () => (
  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
    <circle cx="4" cy="4" r="4" />
  </svg>
);

const PackageIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
};

const SkeletonLoader = () => (
  <div className="space-y-6 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-slate-200" />
          {i < 3 && <div className="w-0.5 h-12 bg-slate-200 mt-2" />}
        </div>
        <div className="flex-1 pb-6">
          <div className="h-4 bg-slate-200 rounded w-32 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-48" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
      <PackageIcon />
    </div>
    <p className="text-slate-500 font-medium">No tracking events yet</p>
    <p className="text-slate-400 text-sm mt-1">Check back soon for updates</p>
  </div>
);

const ParcelTracking = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [], isLoading, isError } = useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tracking/${trackingId}/logs`);
      return res.data;
    },
  });

  const latestLog = trackings[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-10 px-4">
          <NavBar></NavBar>
      <div className="max-w-2xl mx-auto">
      

        {/* Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
                <PackageIcon />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Tracking ID</p>
                <h1 className="text-lg font-bold text-slate-800 font-mono leading-tight">{trackingId}</h1>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold ring-1 ring-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isLoading ? 'Loading...' : trackings.length > 0 ? 'In Transit' : 'No Data'}
              </span>
            </div>
          </div>

          {latestLog && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-1">Latest Update</p>
              <p className="text-sm text-slate-700 font-medium">{latestLog.details}</p>
              <p className="text-xs text-slate-400 mt-1">{formatDate(latestLog.createdAt).date} · {formatDate(latestLog.createdAt).time}</p>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <div className="text-xs text-slate-400">
              {isLoading ? '—' : `${trackings.length} event${trackings.length !== 1 ? 's' : ''} recorded`}
            </div>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Shipment Timeline</h2>

          {isLoading && <SkeletonLoader />}

          {isError && (
            <div className="text-center py-10">
              <p className="text-red-500 font-medium text-sm">Failed to load tracking data.</p>
              <p className="text-slate-400 text-xs mt-1">Please try refreshing the page.</p>
            </div>
          )}

          {!isLoading && !isError && trackings.length === 0 && <EmptyState />}

          {!isLoading && !isError && trackings.length > 0 && (
            <div className="relative">
              {trackings.map((log, index) => {
                const style = getStatusStyle(index, trackings.length);
                const { date, time } = formatDate(log.createdAt);
                const isLast = index === trackings.length - 1;

                return (
                  <div key={log._id} className="flex gap-4 group">
                    {/* Left: dot + line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ring-4 ${style.ring} ${style.dot} transition-transform duration-200 group-hover:scale-110`}
                      >
                        {style.icon === 'check' && <CheckIcon />}
                        {style.icon === 'truck' && <TruckIcon />}
                        {style.icon === 'dot' && <DotIcon />}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 my-2 ${style.line} min-h-[2rem]`} />
                      )}
                    </div>

                    {/* Right: content */}
                    <div className={`flex-1 pb-6 ${isLast ? 'pb-0' : ''}`}>
                      <div className={`rounded-xl p-3.5 border border-transparent hover:border-slate-200 transition-all duration-200 ${style.bg}`}>
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <p className={`text-sm font-semibold leading-snug ${style.text}`}>{log.details}</p>
                          {index === 0 && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                              Latest
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-slate-400">{date}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-400 font-mono">{time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Updates may take a few minutes to reflect. Last refreshed just now.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ParcelTracking;
