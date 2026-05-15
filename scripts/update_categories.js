const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../shop/products');
const files = fs.readdirSync(dir);

const mapping = {
  'cal-vinyl-gloss-white.json': 'Die-Cut Vinyl',
  '7238.json': 'Printable Vinyl',
  '7204.json': 'Printable Vinyl',
  '7504.json': 'Printable Vinyl',
  'orafol-3164.json': 'Printable Vinyl',
  'orafol-3258.json': 'Printable Vinyl',
  '7038.json': 'Laminate',
  '7267.json': 'Window Film',
  'gg-reflective-white.json': 'Window Film'
};

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (mapping[file]) {
      data.categoryId = mapping[file];
    } else {
      data.categoryId = 'Tools'; // fallback
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
});
