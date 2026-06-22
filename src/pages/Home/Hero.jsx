import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Star, Users, Calendar } from "lucide-react";
// import { Button } from '@/components/ui/button';
import heroImage from "../../assets/hero-decoration.jpg";
import Container from "../../components/Shared/Container";
const stats = [
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: Users, value: "2,500+", label: "Happy Clients" },
  { icon: Calendar, value: "5,000+", label: "Events Decorated" },
];

const Hero = () => {
  return (
    <section className="relative -mt-20 flex items-center  overflow-hidden bg-[#F5F0E7] lg:min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury interior decoration"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r 
                     from-[#FBFBF9]/80 via-[#F5F0E7]/90 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="container max-w-7xl py-8 px-4 mx-auto  lg:py-40 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e2e1c7a0] text-primary text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-primary text-primary " />
              Premium Decoration Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6"
          >
            Transform Your Space  brInto
            <span className="block text-primary">Something Extraordinary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700 mb-8 max-w-lg"
          >
            From intimate home makeovers to grand wedding celebrations, our
            expert decorators bring your vision to life with elegance and
            precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              to="/services"
              className="px-6 py-3 bg-gray-900 text-white font-bold  rounded-full flex items-center justify-center hover:bg-gray-800 transition"
            >
              Book Decoration Service
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 border border-gray-900 text-gray-900 font-bold rounded-full flex items-center justify-center  
             hover:bg-gray-900 hover:text-white transition  duration-300 transform  hover:scale-[1.02] 
            "
            >
              Explore Our Work
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#C19B72]">
                  <stat.icon className="h-5 w-5 text-amber-100" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-10 right-10 hidden lg:block"
      >
        <div className=" p-4 rounded-2xl border-0 bg-[#D6D3D1] animate-float">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full  border-2 border-white bg-[#E3D4BD] "
                />
              ))}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">
                500+ Projects
              </div>
              <div className="text-xs text-gray-600">This Month</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
