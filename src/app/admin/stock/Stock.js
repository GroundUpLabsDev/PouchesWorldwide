import {sendGetRequest} from "@/_config/apiConfig";

export async function Stock(){
  let distributers = [];
  const resp = await sendGetRequest('/users');
  if (resp.status === "success") {
    distributers = resp.data;
    distributers = resp.data.filter((user) => {
      user.urole === "distributer";
    })
  }

  return (
    <div className="mt-10 container mx-auto">
      <h1 className="text-3xl font-semibold text-center">Manage Stock Assigned to Distributers</h1>
<p>{distributers.toString()}</p>
      <div className="flex items-center mt-10">
        <p>Select Distributer</p>
        <select className="ml-5 p-2 border border-gray-300 rounded-lg">
          <option value="1">Distributer 1</option>
          <option value="2">Distributer 2</option>
        </select>
      </div>
      <table className="table table-striped mt-20">
        <thead>
          <tr>
            <th>Product</th>
            <th>Dis</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Add Order</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "200px" }}>
              <div className="flex items-center gap-3">
                <div className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize">
                  Product Name
                </div>
              </div>
            </td>
            <td style={{ width: "150px" }}>
              <div className="w-16 h-16 rounded overflow-hidden bg-[#ececec]">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Product Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </td>
            <td
              className="text-lg font-medium font-['Poppins'] capitalize"
              style={{ width: "150px" }}
            >
              $100
            </td>
            <td
              className="text-lg font-medium font-['Poppins'] capitalize"
              style={{ width: "100px" }}
            >
              100
            </td>
            <td style={{ width: "150px" }}>
              <button
                className="btn h-[52px] w-[120px] rounded-lg text-black text-[10px] font-medium font-['Poppins'] capitalize inline-flex items-center justify-center gap-1"
                style={{
                  background: "linear-gradient(113deg, #F5D061 -0.67%, #E6AF2E 99.33%)",
                }}
              >
                Add Order
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}