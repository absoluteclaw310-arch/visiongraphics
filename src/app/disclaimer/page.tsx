import LayoutShell from "@/components/LayoutShell";

export default function Disclaimer() {
  return (
    <LayoutShell>
      <div className="max-w-4xl mx-auto p-8 py-12">
        <h1 className="text-3xl font-bold mb-6 font-primary text-blue-900">
          Disclaimer
        </h1>
        <p className="mb-4 text-gray-500">Last Updated: June 8, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">General Information</h2>
          <p className="text-gray-700">
            The information provided by Vision Graphics on this website is for
            general informational purposes only. All information on the site is
            provided in good faith, however, we make no representation or
            warranty of any kind, express or implied.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Professional Advice</h2>
          <p className="text-gray-700 mb-2">
            The site cannot and does not contain professional advice. The
            material on this site is provided for general information purposes
            only.
          </p>
          <p className="text-gray-700">
            Appropriate professional advice should be sought for each separate
            situation. Your use of the site is solely at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">External Links Disclaimer</h2>
          <p className="text-gray-700">
            The site may contain links to external websites that are not
            provided or maintained by Vision Graphics. We do not guarantee the
            accuracy, relevance, timeliness, or completeness of information on
            these external websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Errors and Omissions</h2>
          <p className="text-gray-700">
            While we strive to keep our product catalog and pricing accurate,
            errors may occur. Vision Graphics reserves the right to correct any
            errors, inaccuracies, or omissions and to change prices at any time
            without prior notice.
          </p>
        </section>
      </div>
    </LayoutShell>
  );
}
