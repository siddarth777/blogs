import { Search, BookOpen, Code, Cpu, Layers, Sparkles } from 'lucide-react';
import { useState } from 'react';
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: 'AI/ML' | 'Programming' | 'Dev' | 'Misc';
  date: string;
  readTime: string;
  image: string;
}

const BlogHomepage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: Sparkles, color: 'text-purple-600' },
    { name: 'AI/ML', icon: Cpu, color: 'text-blue-600' },
    { name: 'Programming', icon: Code, color: 'text-green-600' },
    { name: 'Dev', icon: Layers, color: 'text-orange-600' },
    { name: 'Misc', icon: BookOpen, color: 'text-pink-600' }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Understanding Transformers: The Architecture Behind Modern AI',
      excerpt: 'Deep dive into the transformer architecture that revolutionized natural language processing and machine learning.',
      category: 'AI/ML',
      date: 'Oct 5, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    },
    {
      id: 2,
      title: 'Mastering React Hooks: A Complete Guide',
      excerpt: 'Learn how to leverage React Hooks to write cleaner, more efficient functional components.',
      category: 'Programming',
      date: 'Oct 4, 2025',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
    },
    {
      id: 3,
      title: 'Building Scalable Microservices with Docker',
      excerpt: 'Best practices for containerizing applications and orchestrating microservices in production.',
      category: 'Dev',
      date: 'Oct 3, 2025',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80'
    },
    {
      id: 4,
      title: 'The Philosophy of Clean Code',
      excerpt: 'Exploring the principles that make code maintainable, readable, and elegant.',
      category: 'Misc',
      date: 'Oct 2, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'
    },
    {
      id: 5,
      title: 'Fine-tuning LLMs for Domain-Specific Tasks',
      excerpt: 'Practical strategies for adapting large language models to specialized use cases.',
      category: 'AI/ML',
      date: 'Oct 1, 2025',
      readTime: '15 min read',
      image: 'https://images.unsplash.com/photo-1676277791608-11f3c1b6d5ca?w=800&q=80'
    },
    {
      id: 6,
      title: 'TypeScript Design Patterns Every Developer Should Know',
      excerpt: 'Essential design patterns and their implementation in TypeScript for robust applications.',
      category: 'Programming',
      date: 'Sep 30, 2025',
      readTime: '11 min read',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text">
                Blog
              </span>
            </div>
            {/*Search*/}
            <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-sm"
            />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === cat.name
                    ? 'shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full text-sm font-semibold text-slate-700">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No articles found matching your search.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">AI/ML</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Programming</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dev</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Misc</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogHomepage;