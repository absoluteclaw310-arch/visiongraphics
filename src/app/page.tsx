import Link from "next/link";
import LayoutShell from "@/components/LayoutShell";

export default function Home() {
  return (
    <LayoutShell>
      <div className="bg-gray-50 text-gray-900 font-secondary">
        {/* Hero Section */}
        <header className="relative py-20 md:py-28 px-6 text-center bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-primary leading-tight">
              The Complete Sign Shop Growth Playbook
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
              A 60-page digital PDF packed with sourcing strategies, pricing
              frameworks, and systems to scale your sign shop.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/products"
                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
              >
                Get Instant Access — $29.99
              </Link>
              <Link
                href="#about"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition border border-blue-300 shadow-md"
              >
                Learn More
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              No shipping. Instant download. One-time payment.
            </p>
          </div>
        </header>

        {/* What's Inside */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-primary text-blue-900">
            What’s Inside
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sourcing Secrets",
                desc: "Find the right suppliers, negotiate better pricing, and avoid common material pitfalls.",
                icon: "📦",
              },
              {
                title: "Pricing Frameworks",
                desc: "Use proven markup formulas and quote templates to protect your margins.",
                icon: "💰",
              },
              {
                title: "Systems That Scale",
                desc: "Build repeatable workflows for sales, production, and customer follow-up.",
                icon: "⚙️",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-md border hover:border-blue-400 hover:shadow-lg transition"
              >
                {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
                <h3 className="text-xl font-bold mb-2 font-primary">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 py-12 px-6 text-center border-y border-blue-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 font-primary">
              Ready to systemize your shop?
            </h2>
            <p className="text-lg text-blue-700 mb-6">
              Get the playbook trusted by sign shop owners across the Capital
              District.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition shadow-md"
            >
              Buy Now — $29.99
            </Link>
          </div>
        </section>

        {/* About / Trust */}
        <section
          id="about"
          className="py-16 px-6 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6 font-primary text-blue-900">
            From the Team at Vision Graphics
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            For over 50 years, Vision Graphics has supplied sign shops with the
            materials and knowledge they need to win. This playbook compiles
            the systems, vendor insights, and pricing lessons we’ve learned
            serving the industry — now available as an instant digital
            download.
          </p>
        </section>
      </div>
    </LayoutShell>
  );
}
