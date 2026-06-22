import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import "leaflet/dist/leaflet.css";
import Container from "../../components/Shared/Container";
import Reveal from "../../components/Animation/Reveal";
import RevealLeftToRight from "../../components/Animation/RevealLeftToRight";

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);

  return (
    <Container>
      <section className="py-12 ">
        {/* HEADER */}
        <RevealLeftToRight>
          <header className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Our Service Coverage
            </h2>

            <p className="text-lg text-gray-400">
              We provide decoration services across major cities. Check if we
              serve your area.
            </p>
          </header>
        </RevealLeftToRight>

        {/* ================================
            MAIN RESPONSIVE LAYOUT 
            LEFT = MAP 
            RIGHT = SCROLLABLE LIST
        =================================*/}

        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* ======================== 
              LEFT DIV (YOUR MAP)
              JUST REPLACED WRAPPER
          ========================= */}
          <div className="w-full md:w-2/3 shadow-md rounded-xl overflow-hidden h-[350px] md:h-[700px]">
            {/* YOUR MAP HERE (NO CHANGE INSIDE) */}
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              className="h-full w-full"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {serviceCenters.map((center, i) => (
                <Marker key={i} position={[center.latitude, center.longitude]}>
                  <Popup>
                    <strong>{center.district}</strong> <br />
                    Service Area: {center.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* ===================================== 
              RIGHT DIV (SCROLLABLE LIST)
              Replace your static area list here
          ======================================*/}
          <div className="w-full md:w-1/3  rounded-xl p-5 h-[350px] md:h-[700px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Service Centers</h2>

            <div className="flex flex-col gap-4 pb-10">
              {/* Dynamically load service centers */}
              {serviceCenters.map((center, i) => (
                <Reveal>
                  <div
                    key={i}
                    className="p-4 bg-white shadow-md rounded-lg  hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-lg">{center.district}</h3>
                    <p className="text-gray-600 text-sm">
                      📍 Coverage: {center.coverage_radius || "N/A"} km radius
                    </p>
                    <p className="text-gray-600 text-sm">
                      🗺 Areas: {center.covered_area.join(", ")}
                    </p>
                    <p className="text-gray-600 text-sm">
                      📞 {center.phone || "+8801XXX-XXXXXX"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      ⏰ 9:00 AM – 7:00 PM
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Coverage;
