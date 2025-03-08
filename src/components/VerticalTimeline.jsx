import React from 'react';

const TimelineItem = ({ status, date, title }) => {
  const statusClasses = {
    completed: 'bg-[#fab12f] text-white',
    inProgress: 'bg-black text-white',
    upcoming: 'bg-gray-300 text-gray-600',
    canceled: 'bg-[#fa4032] text-[#fa4032]',
  };

  

  const statusClass = statusClasses[status] || 'bg-gray-300 text-gray-600';

  return (
    <div className="relative flex items-center mb-6 ">
      <div className={`${statusClass} w-8 h-8 rounded-full flex items-center justify-center`}></div>
      <div className="ml-6">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{date || '--'}</p>
      </div>
    </div>
  );
};

const VerticalTimeline = ({ timeline = [] }) => {
  // Check if the timeline is valid before calling findIndex
  const inProgressIndex = timeline.findIndex(item => item.status === 'inProgress');

  // Calculate the height of the yellow line dynamically
  const yellowLineHeight = inProgressIndex !== -1 ? `${(inProgressIndex + 1) * 80}px` : '0px';

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md h-[565px]">
      <h2 className="text-black text-lg font-medium font-['Poppins'] pb-4">Order History</h2>
      <div className="relative">
        {/* Gray line for the entire timeline */}
        <div className="absolute h-full border border-gray-300 left-4 top-0"></div>

        {/* Yellow line up to the inProgress item */}
        {inProgressIndex !== -1 && (
          <div
            className="absolute border border-yellow-400 left-4 top-0"
            style={{ height: yellowLineHeight }}
          ></div>
        )}

        {/* Render timeline items */}
        {timeline.map((item, index) => (
          <TimelineItem
            key={index}
            title={item.title}
            date={item.date}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalTimeline;
