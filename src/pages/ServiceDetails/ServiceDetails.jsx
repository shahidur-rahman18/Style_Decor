import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { Star } from "lucide-react";
import RevealLeftToRight from "../../components/Animation/RevealLeftToRight";
import RevealRightToLeft from "../../components/Animation/RevealRightToLeft";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useParams } from "react-router";

const ServiceDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
 const {id} = useParams();
 console.log('service id', id)

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/services/${id}`
      );
      return result.data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;
  const { image, name, description, price } = service;
  console.log(service)

  return (
    <Container>
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 lg:px-0">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-cen">
            {/* LEFT: Image */}
            <RevealLeftToRight>
              <div className="w-full ">
                <img
                  src={image}
                  alt="Interior Design"
                  className="rounded-xl w-full   object-cover overflow-hidden "
                />
              </div>
            </RevealLeftToRight>

            {/* RIGHT: Text Content */}
            <RevealRightToLeft>
              <div className="space-y-4 ">
                {/* Title Section */}
                <div>
                  <h1 className="text-xl lg:text-4xl font-bold text-gray-900">
                    {name}
                  </h1>

                  <div className="flex items-center gap-2 mt-2 text-yellow-600">
                    <Star size={20} fill="#DDA23C" stroke="none" />
                    <p className="text-gray-700 font-medium">
                      4.9{" "}
                      <span className="text-gray-500 text-xm">
                        (128 reviews)
                      </span>
                    </p>
                  </div>

                  <p className="text-gray-400 mt-3 text-xm leading-relaxed">
                   {description}
                  </p>
                </div>

                {/* Price Box */}
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <p className="text-xl font-bold text-yellow-700">
                    ৳ {price}
                    <span className="text-base font-medium text-gray-600">
                      / per room
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    *Final price may vary based on specific requirements
                  </p>
                </div>

                {/* Included Items */}
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-900">
                    What's Included
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">✓</span>
                      Custom furniture selection
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">✓</span>
                      Color consultation
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">✓</span>
                      Lighting design
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">✓</span>
                      Art curation
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">✓</span>
                      Final styling
                    </div>
                  </div>
                </div>

                {/* Footer Details */}
                <div className="border-t pt-4 text-gray-500 text-sm flex flex-wrap gap-4">
                  <p>🕒 Consultation: 1–2 hours</p>
                  <p>👷‍♂️ 1 decorators available</p>
                  <p>🌍 City-wide service</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => setIsOpen(true)}
                    label="Purchase"
                    className="bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white py-3 rounded-lg w-full sm:w-1/2 font-semibold transition"
                  >
                    Book Now
                  </button>
                  <hr className="my-6" />

                  <PurchaseModal 
                   service={service}
                  closeModal={closeModal} 
                  isOpen={isOpen} 
                  />

                  <button className="border cursor-pointer border-gray-300 hover:bg-gray-100 py-3 rounded-lg w-full sm:w-1/2 font-semibold transition">
                    Contact Us
                  </button>
                </div>
              </div>
            </RevealRightToLeft>
          </div>
        </div>
      </section>
    </Container>
  );
};

// closeModal={closeModal} isOpen={isOpen}

export default ServiceDetails;
