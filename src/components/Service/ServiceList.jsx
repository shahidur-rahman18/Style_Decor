import ServiceCard from "./ServiceCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const ServiceList = ({ limit, searchText, categoryFilter, budget }) => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/services`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  let filtered = services;

  if (searchText) {
    filtered = filtered.filter((s) =>
      s.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (categoryFilter) {
    filtered = filtered.filter((s) => s.category === categoryFilter);
  }

  if (budget) {
    filtered = filtered.filter((s) => Number(s.price) <= Number(budget));
  }

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  if (filtered.length === 0) {
    return (
      <p className="text-center py-12 text-gray-500">No services found</p>
    );
  }

  return (
    <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {filtered.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
