import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../utils";

const UpdatePlantForm = ({ service, closeModal, queryKey }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (updatedService) => {
      const res = await axiosSecure.patch(
        `/services/${service._id}`,
        updatedService
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Service updated successfully");
      queryClient.invalidateQueries(queryKey);
      closeModal();
    },
    onError: () => {
      toast.error("Update failed");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const imageFile = form.image.files[0]; // get uploaded file

    let imageUrl = service.image; // default to existing image

    // If user selected a new image, upload it
    if (imageFile) {
      imageUrl = await imageUpload(imageFile); // call your function
    }

    const updatedService = {
      name: form.name.value,
      category: form.category.value,
      description: form.description.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),

      image: imageUrl, // include uploaded image URL
    };

    mutate(updatedService);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                defaultValue={service.name}
                className="w-full px-4 py-3 text-gray-800 border border-amber-500 focus:outline-amber-600 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Service Name"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                defaultValue={service.category}
                required
                className="w-full px-4 py-3 border-amber-500 focus:outline-amber-600 rounded-md bg-white"
                name="category"
              >
                <option value="Wedding">Wedding</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Seminar">Seminar</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                defaultValue={service.description}
                id="description"
                placeholder="Write service description here..."
                className="block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-amber-500 bg-white focus:outline-amber-600"
                name="description"
              ></textarea>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  defaultValue={service.price}
                  className="w-full px-4 py-3 text-gray-800 border border-amber-500 focus:outline-amber-600 rounded-md bg-white"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price per service"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  defaultValue={service.quantity}
                  className="w-full px-4 py-3 text-gray-800 border border-amber-500 focus:outline-amber-600 rounded-md bg-white"
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                  required
                />
              </div>
            </div>

            {/* Image (future use) */}
            <div className="p-4 w-full m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-amber-500">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-primary"
            >
              {isLoading ? "Updating..." : "Update Service"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlantForm;
