import React from "react";
import { ArrowRight, Code, Palette, TrendingUp } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900">
            Find Expert Freelancers
            <span className="text-blue-600 block mt-2">For Your Vision</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top-tier professionals who deliver exceptional results
          </p>
          <button className="group relative px-8 py-4 bg-blue-600 rounded-lg text-white font-bold text-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
            Explore Talent
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Professional Services
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Access a wide range of services from verified experts in their fields
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Development",
                description: "Custom web solutions built with modern technologies and best practices",
                icon: Code,
                color: "text-blue-600",
              },
              {
                title: "Graphic Design",
                description: "Professional designs that align with your brand and captivate your audience",
                icon: Palette,
                color: "text-indigo-600",
              },
              {
                title: "Digital Marketing",
                description: "Results-driven strategies to grow your online presence and ROI",
                icon: TrendingUp,
                color: "text-blue-600",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <service.icon className={`w-12 h-12 mb-6 ${service.color}`} />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Skilled Freelancers" },
              { number: "15K+", label: "Completed Projects" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Expert Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2 text-blue-600">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community of successful businesses and talented professionals
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;