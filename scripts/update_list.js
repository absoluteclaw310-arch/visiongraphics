const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/components/ProductList.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

const replacement = `      {(!items || items.length === 0) ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center border">
          <h2 className="text-2xl mb-2 text-gray-600">No products found.</h2>
          <p className="text-gray-500">The local shop directory might be empty.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {["Die-Cut Vinyl", "Printable Vinyl", "Laminate", "Window Film", "Tools"].map(category => {
            const categoryItems = items
              .filter(item => item.categoryId === category)
              .sort((a, b) => {
                const minPriceA = Math.min(...a.options.map(o => o.price));
                const minPriceB = Math.min(...b.options.map(o => o.price));
                return minPriceA - minPriceB;
              });

            if (categoryItems.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold font-primary text-blue-800 mb-6 border-b pb-2">{category}</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryItems.map((item) => (
                    <ProductCard key={item.id} item={item} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}`;

content = content.replace(
  /\{\(\!items \|\| items\.length === 0\) \? \([\s\S]*?<\/[dD]iv>\n      \)\}/,
  replacement
);

fs.writeFileSync(targetFile, content);
