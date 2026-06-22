import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Reveal from "../../components/Animation/Reveal";
import RevealRightToLeft from "../../components/Animation/RevealRightToLeft";
import RevealLeftToRight from "../../components/Animation/RevealLeftToRight";

import toast from "react-hot-toast";
import Container from "../../components/Shared/Container";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload
    toast.success("Message sent successfully!");
    e.target.reset();
  };
  return (
   <Container>
     <section className=" py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
              Get In Touch
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Have questions or ready to start your decoration project? We'd
              love to hear from you.
            </p>
          </div>
        </Reveal>

        {/* Content */}
        <div className="bg-[#faf8f5] grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Info */}
          <RevealLeftToRight>
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                Reach out to us through any of the following channels. We're
                here to help!
              </p>

              <div className="space-y-6">
                {/* Item */}
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <MapPin className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Visit Us</h4>
                    <p className="text-gray-600 text-sm">
                      123 Design Street
                      <br />
                      Creative City, 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Phone className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-gray-600 text-sm">
                      +1 (555) 123-4567
                      <br />
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Mail className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-gray-600 text-sm">
                      hello@styledecor.com
                      <br />
                      support@styledecor.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Clock className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Working Hours</h4>
                    <p className="text-gray-600 text-sm">
                      Mon - Sat: 9:00 AM - 7:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealLeftToRight>

          {/* Right Form */}
          <RevealRightToLeft>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-serif font-semibold mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help?"
                      className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Message *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us about your project..."
                    className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition cursor-pointer"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </RevealRightToLeft>
        </div>
      </div>
    </section>
   </Container>
  );
};

export default Contact;
