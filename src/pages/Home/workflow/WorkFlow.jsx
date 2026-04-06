const steps = [
  {
    title: "Place Order",
    desc: "Customer creates a delivery request easily",
  },
  {
    title: "Pickup",
    desc: "Agent collects the package from your location",
  },
  {
    title: "Live Tracking",
    desc: "Track your package in real-time",
  },
  {
    title: "Delivery",
    desc: "Package delivered safely to destination",
  },
];

export default function Workflow() {
  return (
    <div className="py-16 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-10">
        How Shifto Works
      </h2>

      <div className="grid md:grid-cols-4 gap-6 px-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow-md border hover:shadow-xl transition  bg-secondary"
          >
            <div className="text-4xl font-bold text-white mb-2 ">
              {i + 1}
            </div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-100">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}