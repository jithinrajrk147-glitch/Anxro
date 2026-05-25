// Merge blog.json and blogs.json into a single unified file
// Run this with: node merge-blogs.js

const fs = require('fs');

// Read both files
const blogJson = JSON.parse(fs.readFileSync('blog.json', 'utf8'));
const blogsJson = JSON.parse(fs.readFileSync('blogs.json', 'utf8'));

// Normalize blog.json format to match blogs.json
const normalizedBlogJson = blogJson.map(item => ({
  title: item.title,
  link: item.file,  // Convert 'file' to 'link'
  category: item.imf,  // Convert 'imf' to 'category'
  cover: item.cover
}));

// Combine both arrays
const combined = [...normalizedBlogJson, ...blogsJson];

// Shuffle the combined array for complete randomization
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const shuffledBlogs = shuffle(combined);

// Remove duplicates based on link
const uniqueBlogs = [];
const seenLinks = new Set();

for (const blog of shuffledBlogs) {
  if (!seenLinks.has(blog.link)) {
    seenLinks.add(blog.link);
    uniqueBlogs.push(blog);
  }
}

// Write to new file
fs.writeFileSync('blog.json', JSON.stringify(uniqueBlogs, null, 2));

console.log(`✅ Merged successfully!`);
console.log(`📊 Total blogs: ${uniqueBlogs.length}`);
console.log(`🔀 Completely randomized and deduplicated`);
console.log(`📁 Saved to: blog.json`);
