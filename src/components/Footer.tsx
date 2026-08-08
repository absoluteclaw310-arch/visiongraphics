import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping-returns", label: "Digital Delivery" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <Link href="/" className="text-2xl font-bold mb-4 block font-primary">
            Vision Graphics
          </Link>
          <p className="text-gray-400 mb-2">
            Sign shop systems and digital products.
          </p>
          <p className="text-gray-400">Serving sign makers since 1975.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 font-primary">Contact Us</h3>
          <p className="text-gray-400 mb-2">Questions about your digital download?</p>
          <p className="text-gray-400 font-medium">Email: info@visiongraphics.com</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 font-primary">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { href: "/products", label: "Digital Playbook" },
              { href: "/shipping-returns", label: "Delivery Policy" },
              { href: "/terms", label: "Terms" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Vision Graphics. All rights reserved.</p>
      </div>
    </footer>
  );
}
