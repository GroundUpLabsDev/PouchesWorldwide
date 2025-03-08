import React from 'react';

const StatusTable = ({ tableData }) => {
  return (
    <div className="overflow-x-auto w-[900px] mx-auto flex justify-center">
      <table className="table">
        {/* Table Head */}
        <thead className="bg-[#ececec]">
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-[90.36px] h-[90.36px] bg-[#fafafa] flex justify-center items-center">
                    <div className="h-[64px] w-[64px]">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                  </div>
                  <div>
                    <div className="text-black text-lg font-medium font-['Poppins']">{item.name}</div>
                  </div>
                </div>
              </td>
              <td className="text-black text-lg font-medium font-['Poppins']">{item.quantity}</td>
              <td className="text-black text-lg font-medium font-['Poppins']">{item.unitPrice} $</td>
              <td className="text-black text-lg font-medium font-['Poppins']">${item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusTable;
