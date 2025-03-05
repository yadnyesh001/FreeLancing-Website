import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Code, Palette, TrendingUp, Star, CheckCircle, Users, Clock, 
  Pen, Camera, Megaphone, Globe, Smartphone, Headphones, Terminal, Layout, 
  BarChart 
} from 'lucide-react';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Custom web solutions built with modern technologies and best practices",
      icon: Terminal,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $50/hr",
      rating: 4.9
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance product usability and appeal",
      icon: Layout,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $45/hr",
      rating: 4.8
    },
    {
      title: "Digital Marketing",
      description: "Data-driven marketing strategies to boost your online presence",
      icon: BarChart,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $40/hr",
      rating: 4.7
    },
    {
      title: "Content Writing",
      description: "Engaging content that tells your story and connects with your audience",
      icon: Pen,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $35/hr",
      rating: 4.8
    },
    {
      title: "Photography",
      description: "Professional photography services for products, events, and portfolios",
      icon: Camera,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $60/hr",
      rating: 4.9
    },
    {
      title: "Social Media",
      description: "Strategic social media management to build your brand presence",
      icon: Megaphone,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $38/hr",
      rating: 4.7
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: Smartphone,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $55/hr",
      rating: 4.8
    },
    {
      title: "SEO Optimization",
      description: "Search engine optimization to improve your website's visibility",
      icon: Globe,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $42/hr",
      rating: 4.6
    },
    {
      title: "Customer Support",
      description: "24/7 customer service solutions to enhance user satisfaction",
      icon: Headphones,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      price: "From $30/hr",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gray-50">
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Find Expert
            <span className="block mt-2 text-gray-800">
              Freelancers
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top-tier professionals who deliver exceptional results
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gray-900 rounded-lg text-white font-medium text-lg transition-all duration-200 hover:bg-gray-800">
              <span className="relative z-10">Start Hiring</span>
              <ArrowRight className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button className="group relative px-8 py-4 bg-white rounded-lg text-gray-900 font-medium text-lg border border-gray-200 transition-all duration-200 hover:border-gray-300">
              <span className="relative z-10">Become a Freelancer</span>
            </button>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md"
              >
                <div className={`w-16 h-16 rounded-lg ${service.bgColor} flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-105`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-medium">{service.price}</span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="ml-1 text-gray-600">{service.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Skilled Freelancers", icon: Users },
              { number: "15K+", label: "Completed Projects", icon: CheckCircle },
              { number: "98%", label: "Satisfaction Rate", icon: Star },
              { number: "24/7", label: "Expert Support", icon: Clock },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center group relative"
                style={{ 
                  opacity: scrollPosition > 800 ? 1 : 0,
                  transform: `translateY(${scrollPosition > 800 ? 0 : 20}px)`,
                  transition: `all 0.6s ${index * 0.1}s ease-out`
                }}
              >
                <div className="mb-4 w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold mb-2 text-blue-600 transition-all duration-300 group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-pattern opacity-10"
          style={{ transform: `translateY(${scrollPosition * 0.2}px)` }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community of successful businesses and talented professionals
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg relative overflow-hidden group">
            <span className="relative z-10">Get Started Today</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-100/30" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;