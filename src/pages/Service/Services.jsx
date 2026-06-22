import React, { useState } from "react";
import ServiceList from "../../components/Service/ServiceList";
import Container from "../../components/Shared/Container";
import { Filter, Search } from "lucide-react";
import Reveal from "../../components/Animation/Reveal";
import RevealRightToLeft from "../../components/Animation/RevealRightToLeft";
import RevealLeftToRight from "../../components/Animation/RevealLeftToRight";

const categories = [
  "Home",
  "Wedding",
  "Office",
  "Seminar",
  "Meeting",
  "Birthday",
  "Anniversary",
];

const Services = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(100000);

  return (
    <Container>
      {/* Title */}
      <RevealRightToLeft>
        <div className="text-center mt-12 mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Our Decoration Services
          </h1>
          <p className="text-gray-500 mt-2">
            Browse our curated decoration packages for every occasion and
            budget.
          </p>
        </div>
      </RevealRightToLeft>

      {/* Filter Box */}
     <RevealLeftToRight>
         <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full bg-transparent outline-none text-sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button className="bg-primary text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Categories */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-sm">Service Type</h3>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === category ? "" : cat)}
                className={`px-3 py-[6px] rounded-full text-sm border transition
            ${
              category === cat
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600"
            }
          `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Slider */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-sm">
            Budget Range: ৳0 — ৳{budget}
          </h3>

          <input
            type="range"
            min="0"
            max="100000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full accent-primary"
          />
        </div>
      </div>
     </RevealLeftToRight>

      {/* Card List */}
      <div className="py-10 ">
        <ServiceList
          searchText={searchText}
          categoryFilter={category}
          budget={budget}
        />
      </div>
    </Container>
  );
};

export default Services;
