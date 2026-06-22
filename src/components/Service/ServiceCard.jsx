import { Link } from "react-router";
import { Star } from "lucide-react";
import Reveal from "../Animation/Reveal";

const ServiceCard = ({ service }) => {
  const { _id, name, image, price, category, description } = service || {};

  return (
    <Reveal className="h-full">
      <Link
        to={`/service/${_id}`}
        className="group flex h-full w-full flex-col rounded-2xl overflow-hidden transition duration-300 hover:shadow-lg"
      >
        <div className="h-48 w-full shrink-0 overflow-hidden">
          <img
            src={image}
            alt="Service"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 bg-base-300">
          <span className="inline-block w-fit px-3 py-1 text-sm rounded-full bg-yellow-200 text-yellow-700 font-medium">
            {category}
          </span>

          <h2 className="mt-3 min-h-7 text-xl font-semibold text-primary line-clamp-1">
            {name}
          </h2>

          <p className="mt-1 min-h-10 flex-1 text-gray-500 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-bold text-black">
              ৳ {price}{" "}
              <span className="text-sm text-gray-500">/per rooms</span>
            </p>

            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={18} fill="currentColor" />
              <span className="font-medium text-gray-700">4.9</span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
};

export default ServiceCard;
