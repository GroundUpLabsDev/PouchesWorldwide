const OrderTimeline = ({ steps, currentStatus }) => {
    return (
      <div className="mt-4">
        <h2>Order Progress</h2>
        <div className="flex flex-col gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                step === currentStatus ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default OrderTimeline;
  