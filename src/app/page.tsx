import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-secondary">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-700 font-primary">Vision Graphics</div>
        <div className="space-x-6 hidden md:flex">
          <a href="#products" className="hover:text-blue-600 transition">Products</a>
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 px-6 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-primary">Upstate NY's Sign Supply Distribution</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 font-secondary text-blue-100">Capital District's Sign Supplier</h2>
        <div className="flex justify-center gap-4">
          <a href="#contact" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get a Quote
          </a>
          <a href="#products" className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition border border-blue-300">
            Our Catalog
          </a>
        </div>
      </header>

      {/* Features/Services */}
      <section id="products" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 font-primary">Our Product Range</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Vinyl & Films", 
              desc: "High-grade die-cut vinyl and specialty films for every application.",
              icon: "" 
            },
            { 
              title: "Print Materials", 
              desc: "UV, Solvent, and Eco-Solvent compatible media for crisp, durable prints.",
              icon: "" 
            },
            { 
              title: "Application Tools", 
              desc: "Transfer tapes, squeegees, and precision tools for a professional finish.",
              icon: "" 
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow-md border hover:border-blue-400 transition">
              {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
              <h3 className="text-xl font-bold mb-2 font-primary">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="bg-blue-50 py-12 px-6 text-center border-y border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 font-primary">Free Delivery!</h2>
          <p className="text-lg text-blue-700">
            We provide <strong>free delivery in the capital district</strong> for qualified wholesale accounts.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 font-primary">50+ Years of Excellence</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Vision Graphics is a trusted local sign supply distribution warehouse. We specialize in providing
          wholesale pricing and unparalleled expertise to the sign-making community. From the smallest 
          boutique shops to large-scale production facilities, we ensure you have the materials you need 
          to succeed.
        </p>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 font-primary">Vision Graphics</h2>
            <p className="text-gray-400 mb-4">Your one-stop shop for wholesale sign supplies.</p>
            <p className="text-gray-400">Serving the Capital District and beyond.</p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 font-primary">Contact Us</h3>
            <p className="text-gray-400">Interested in a wholesale account?</p>
            <p className="text-lg font-medium mt-2">Email: info@visiongraphics.example</p>
            <p className="text-lg font-medium">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
          © {new Date().getFullYear()} Vision Graphics. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
