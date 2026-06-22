import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const SellerOrderDataRow = ({ order, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const { name, price, quantity, customer } = order || {};

  // ✅ status state
  const [status, setStatus] = useState(order?.status || "Pending");

  const axiosSecure = useAxiosSecure();

  const handleStatusChange = async (e) => {
    const value = e.target.value;

    let updatedStatus = "Pending";

    if (value === "Delivered") {
      updatedStatus = "Delivered";
    }

    // 1️⃣ Update UI instantly
    setStatus(updatedStatus);

    // 2️⃣ Update Database
    try {
      await axiosSecure.patch(`/orders/status/${order._id}`, {
        status: updatedStatus,
      });

      // 3️⃣ Refresh table data
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${order._id}`);

      refetch(); // 🔄 refresh table
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{name} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{customer} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">${price} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{quantity} </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`font-semibold px-3 py-1 rounded-full inline-block
      ${
        status === "Pending"
          ? "bg-yellow-100 text-yellow-700"
          : status === "Delivered"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-700"
      }
    `}
        >
          {status}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          <select
            required
            className="p-1 border-2 border-amber-500 focus:outline-amber-600rounded-md rounded-xl text-gray-900  bg-white"
            name="category"
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">Start Processing</option>
            <option value="Delivered">Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Cancel</span>
          </button>
        </div>
        <DeleteModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
           id={order._id}   
          handleDelete={handleDelete}
          queryKey={["orders"]}
          deleteUrl="/orders"
        />
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
