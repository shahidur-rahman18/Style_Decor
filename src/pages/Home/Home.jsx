import ServiceList from "../../components/Service/ServiceList";
import Container from "../../components/Shared/Container";
import Hero from "./Hero";
import Reveal from "../../components/Animation/Reveal";
import DecoratorTeam from "../../components/Home/DecoratorTeam";
import { ArrowBigRight, Clock } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
  // const [services, setServices] = useState([]);

  // const featuredServices = services.slice(0, 3);
  return (
    <div>
      <Hero></Hero>
      <Reveal>
        <div className="text-center mb-12 py-12 ">
          <h3 className="font-bold  text-primary tracking-widest">
            Our Servicess
          </h3>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
            Decoration Packages
            <span className="text-yellow-600"> For Every Occasion</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we have the perfect
            decoration solution for your special moments.
          </p>
        </div>
      </Reveal>
      <Container>
        <ServiceList limit={3} />
      </Container>
      <Reveal>
        <div className="flex items-center justify-center py-12">
          <Link
            to="/services"
            className="bg-yellow-600 text-center hover:bg-yellow-700 text-gray-900 font-semibold py-3 px-6 rounded shadow-lg transition duration-300 flex items-center justify-center"
          >
            Book Consultation
            <ArrowBigRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </Reveal>
      <DecoratorTeam></DecoratorTeam>
    </div>
  );
};

export default Home;
