import React from 'react';
import DecoratorTeam from '../../components/Home/DecoratorTeam';
import Reveal from '../../components/Animation/Reveal';
import RevealLeftToRight from '../../components/Animation/RevealLeftToRight';

const About = () => {
  
  const stats = [
    { label: 'Years of Excellence', value: '8+', icon: '🏆' },
    { label: 'Happy Clients', value: '2,500+', icon: '🤝' },
    { label: 'Events Decorated', value: '5,000+', icon: '📅' },
    { label: 'Average Rating', value: '4.9', icon: '⭐' },
  ];

  // Helper component for the statistic cards
  const StatCard = ({ label, value, icon }) => (
    <div className="flex flex-col items-center p-4 text-center">
      {/* Icon (using a simple emoji for demonstration; in a real app, use an SVG icon library) */}
      <div className="text-4xl text-yellow-400 mb-2">{icon}</div>
      <p className="text-5xl md:text-6xl font-extrabold text-white mb-1">
        {value}
      </p>
      <p className="text-base text-gray-300 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );

  return (
    <div className="font-sans">
      {/* ========================================
        Section 1: Crafting Beautiful Spaces (Headline & Stats)
        ========================================
      */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headline Section */}
          <RevealLeftToRight>
            <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Crafting Beautiful Spaces 
              <span className="text-yellow-600 ml-2">Since 2016</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              StyleDecor began with a simple vision: to transform ordinary spaces into extraordinary experiences. Today, we're proud to be one of the leading decoration companies, serving thousands of satisfied clients.
            </p>
          </div>
          </RevealLeftToRight>
        </div>

        {/* Statistics Bar */}
        <div className="bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
           <Reveal>
             <div className="grid grid-cols-1  md:grid-cols-4 gap-8">
              {stats.map((stat) => (
              
                <StatCard  key={stat.label} {...stat} />
              
              ))}
            </div>
           </Reveal>
          </div>
        </div>
      </div>

      {/* ========================================
        Section 2: Our Story, Mission, & Vision
        ========================================
      */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Story & Text Content */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Our Story
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
                A Passion for Creating <span className="text-yellow-600">Memorable Moments</span>
              </h3>
              <p className="mt-6 text-gray-600">
                What started as a small home-based business has grown into a full-service decoration company with a team of talented designers and decorators.
              </p>
              <p className="mt-4 text-gray-600">
                Our journey began when our founder, inspired by the transformative power of beautiful spaces, decided to share that vision with others. From our first wedding decoration to our hundredth corporate event, every project has been a labor of love.
              </p>
              <p className="mt-4 text-gray-600">
                Today, we pride ourselves on our attention to detail, creative innovation, and unwavering commitment to client satisfaction. Whether it's an intimate home makeover or a grand celebration, we bring the same passion and expertise to every project.
              </p>
            </div>

            {/* Placeholder Visuals (Empty beige blocks from the design) */}
            <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-2">
              <div className=" rounded-xl h-full p-4 col-span-2">
              <RevealLeftToRight>
                <img src="https://i.ibb.co.com/HLV0hnDV/photo-1741969494307-55394e3e4071-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-1.jpg" 
              className='rounded-2xl '
              alt="" />
              </RevealLeftToRight>
              </div>
              <div className="rounded-lg h-full  row-span-1">
              <Reveal><img src="https://i.ibb.co.com/Swpn9MNc/premium-photo-1691861595088-b2c02e156557-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-1.jpg"
               className='rounded-2xl ' alt="" /></Reveal>
              </div>
              <div className=" rounded-lg h-full row-span-1">
              <Reveal><img src="https://i.ibb.co.com/bjy88nw9/premium-photo-1698249759490-f339e7c861e1-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-1.jpg" 
               className='rounded-2xl 'alt="" /></Reveal>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h4>
              <p className="text-gray-600">
                To transform every space into a reflection of our client's dreams, creating memorable experiences through thoughtful design, quality craftsmanship, and exceptional service.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h4>
              <p className="text-gray-600">
                To be the most trusted and innovative decoration company, known for our creativity, reliability, and ability to turn every occasion into an unforgettable celebration.
              </p>
            </div>
          </div>
        </div>
      </div>

       <DecoratorTeam></DecoratorTeam>

    </div>
  );
};

export default About;