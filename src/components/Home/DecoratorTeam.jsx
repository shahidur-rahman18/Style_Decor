import { Star } from "lucide-react";
import Reveal from "../Animation/Reveal";
import Container from '../Shared/Container'

const decorators = [
  {
    name: "Sarah Mitchell",
    rating: "4.9",
    reviews: "156",
    img: "https://i.ibb.co.com/6cVYcGyZ/photo-1494790108377-be9c29b29330-w-200-h-200-fit-crop.jpg",
    tags: ["Wedding", "Anniversary"],
    years: "8",
    projects: "234",
  },
  {
    name: "Michael Chen",
    rating: "4.8",
    reviews: "98",
    img: "https://i.ibb.co.com/KjHKbmBx/photo-1507003211169-0a1dd7228f2d-w-200-h-200-fit-crop.jpg",
    tags: ["Home", "Office"],
    years: "6",
    projects: "167",
  },
  {
    name: "Emily Rodriguez",
    rating: "4.7",
    reviews: "124",
    img: "https://i.ibb.co.com/Q3FzS2rw/photo-1438761681033-6461ffad8d80-w-200-h-200-fit-crop.jpg",
    tags: ["Birthday", "Seminar"],
    years: "5",
    projects: "189",
  },
  {
    name: "David Park",
    rating: "4.9",
    reviews: "87",
    img: "https://i.ibb.co.com/s7xfrnj/photo-1472099645785-5658abf4ff4e-w-200-h-200-fit-crop.jpg",
    tags: ["Wedding", "Seminar"],
    years: "10",
    projects: "312",
  },
];

export default function DecoratorTeam() {
  return (
   
    <Container>
      <div className="w-full py-16 bg-[#F7F4EF]">
      {/* Heading */}
    <Reveal>
          <div className="text-center mb-12">
        <h3 className="text-sm tracking-widest text-gray-500">OUR TEAM</h3>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
          Meet Our <span className="text-yellow-600">Expert Decorators</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Talented professionals who bring creativity, expertise, and passion to every project they undertake.
        </p>
      </div>

    </Reveal>
      {/* Cards */}
      
      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-20">
        {decorators.map((d, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
            transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.03]"
          >
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={d.img}
                alt="decorator"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* Availability */}
            <div className="flex justify-center mt-3">
              <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                ● Available
              </span>
            </div>

            {/* Name */}
            <h2 className="text-center text-xl font-semibold mt-3">{d.name}</h2>

            {/* Rating */}
            <div className="flex justify-center items-center gap-1 text-yellow-600 mt-1">
              <Star size={16} fill="currentColor" />
              <span className="font-semibold">{d.rating}</span>
              <span className="text-gray-500 text-sm">({d.reviews} reviews)</span>
            </div>

            {/* Tags */}
            <div className="flex justify-center gap-3 mt-4">
              {d.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Line */}
            <div className="border-t mt-4 mb-4"></div>

            {/* Stats */}
            <div className="flex justify-between px-6">
              <div className="text-center">
                <p className="font-semibold">{d.years}</p>
                <p className="text-xs text-gray-500">Years</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{d.projects}</p>
                <p className="text-xs text-gray-500">Projects</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </Reveal>
    </div>
    </Container>
   
  );
}
