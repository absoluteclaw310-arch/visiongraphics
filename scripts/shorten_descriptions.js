const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../shop/products');
const files = fs.readdirSync(dir);

const mapping = {
  '7038.json': 'Calendered vinyl laminate protecting against abrasion, UV, and chemicals.',
  '7204.json': 'Gloss white vinyl for short-term promotional graphics and POP displays.',
  '7238.json': 'Calendered vinyl for general graphics. Features gray air-egress adhesive for clean removal.',
  '7267.json': 'Perforated vinyl for one-way window graphics (white print, black see-through).',
  '7504.json': '13 oz PVC banner for general signage. Tear, curl, and fire resistant. Inkjet & UV printable.',
  'cal-vinyl-gloss-white.json': 'Professional gloss white vinyl for short-to-medium term outdoor signage.',
  'gg-reflective-white.json': '6 mil reflective vinyl with permanent adhesive for signs and fleets.',
  'orafol-3164.json': 'Economy gloss vinyl ideal for short-term promotional signs and POP graphics.',
  'orafol-3258.json': 'Semi-rigid 6mil PVC film with permanent adhesive for durable professional signage.'
};

files.forEach(file => {
  if (file.endsWith('.json') && mapping[file]) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.description = mapping[file];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
});
