import os
import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Footer
    content = content.replace('<p>&copy; 2026 Manzi Remodeling. All rights reserved.</p>', '<p>&copy; 2026 Manzi Remodeling | Jonathan Manzi | 518-847-1773 | All rights reserved.</p>')
    
    if filepath == 'index.html':
        content = content.replace('<p>High-quality remodeling with craftsmanship you can see and durability you can trust.</p>', '<p>High-quality remodeling with craftsmanship you can see and durability you can trust. Remodeling Pro 25+ yrs of experience.</p>')
        content = content.replace('<h2>Expert Craftsmanship in the Capital Region</h2>', '<h2>Expert Craftsmanship in the Capital District of NY</h2>')
        content = content.replace('<p>Serving Schenectady, Albany, Troy, and surrounding areas with premium remodeling services.</p>', '<p>Serving the Capital District of NY with premium remodeling services.</p>\n        </section>\n        <section class="specialties">\n            <h2>Our Specialties</h2>\n            <ul>\n                <li>Intricate Tilework</li>\n                <li>Custom Backsplash</li>\n                <li>Precision Installations (e.g., Pocket doors, Custom Decks, Custom Fence Installs)</li>\n            </ul>')

    if filepath == 'contact.html':
        content = content.replace('<p>Ready to start your home transformation? Fill out the form below, and we\'ll get back to you shortly to schedule a free estimate.</p>', '<p>Ready to start your home transformation? Contact Jonathan Manzi at 518-847-1773 or fill out the form below, and we\'ll get back to you shortly to schedule a free estimate.</p>')

    if filepath == 'area.html':
        content = content.replace('throughout the Capital Region of New York', 'throughout the Capital District of NY')

    if filepath == 'about.html':
        content = content.replace('With years of experience in the Capital Region', 'As a Remodeling Pro with 25+ yrs of experience in the Capital District of NY')

    if filepath == 'tile.html':
        content = content.replace('<li><strong>Backsplashes:</strong>', '<li><strong>Custom Backsplash:</strong>')
        content = content.replace('<li><strong>Accents & Patterns:</strong>', '<li><strong>Intricate Tilework:</strong>')

    with open(filepath, 'w') as f:
        f.write(content)

