import React, { useState, useMemo } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import BlogViewer from '../components/BlogViewer';
const FolderIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto mb-4 text-purple-400">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
  </svg>
);

const FileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto mb-4 text-slate-400">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline>
    </svg>
);

const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-400">
        <path d="m9 18 6-6-6-6"></path>
    </svg>
);

// --- TYPESCRIPT INTERFACES ---
interface BlogStructure {
  [key: string]: BlogStructure | null;
}

interface BreadcrumbsProps {
  path: string[];
  onNavigate: (index: number) => void;
}

interface FolderItemProps {
  name: string;
  onClick: () => void;
}

interface NotebookItemProps {
  name: string;
  onClick: () => void;
}


// --- MOCK FILE SYSTEM DATA ---
// This object now conforms to the BlogStructure interface.
const blogStructure: BlogStructure = {
  'blogs': {
    'ml': {
      'first.md': null,
    },
    'dev': {
      'first.md': null,
    },
  }
};


const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigate }) => (
    <nav className="flex items-center space-x-2 text-sm sm:text-base mb-8 text-slate-600">
        {path.map((segment, index) => (
            <React.Fragment key={index}>
                <button
                    onClick={() => onNavigate(index)}
                    className="capitalize hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                >
                    {segment}
                </button>
                {index < path.length - 1 && <ChevronRightIcon />}
            </React.Fragment>
        ))}
    </nav>
);

const FolderItem: React.FC<FolderItemProps> = ({ name, onClick }) => (
    <div
        onClick={onClick}
        className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100 flex flex-col justify-center items-center"
    >
        <FolderIcon />
        <h3 className="text-base font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
            {name}
        </h3>
    </div>
);

const NotebookItem: React.FC<NotebookItemProps> = ({ name, onClick }) => {
    // Removes the .ipynb extension and replaces underscores/dashes with spaces
    const title = name.replace(/\.ipynb$/, '').replace(/[_-]/g, ' ');
    
    return (
        <div
            onClick={onClick}
            className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100 flex flex-col justify-center items-center"
        >
            <FileIcon />
            <h3 className="text-base font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                {title}
            </h3>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const BlogHomepage: React.FC = () => {
  const [path, setPath] = useState<string[]>(['blogs']);
  const [viewingNotebook, setViewingNotebook] = useState<string | null>(null);

  // Memoize content calculation to avoid re-computing on every render
  const currentContent = useMemo((): BlogStructure => {
    let content: any = blogStructure;
    for (const segment of path) {
      if (content && typeof content === 'object') {
        content = content[segment];
      } else {
        return {}; // Should not happen in normal navigation
      }
    }
    return content as BlogStructure;
  }, [path]);

  const handleFolderClick = (folderName: string) => {
    setPath([...path, folderName]);
  };

  const handleBreadcrumbNavigate = (index: number) => {
    setPath(path.slice(0, index + 1));
  };

  if (viewingNotebook) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => setViewingNotebook(null)}
            className="mb-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
          >
            &larr; Back to Explorer
          </button>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">{[...path, viewingNotebook].join(" / ")}</h1>
            <BlogViewer path={[...path, viewingNotebook].join(" / ")}/>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
     <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      <section className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Blog</h1>
        <p className="text-lg text-slate-600 mb-8">
          Explore articles, tutorials, and deep dives.
        </p>
        <Breadcrumbs path={path} onNavigate={handleBreadcrumbNavigate} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {Object.entries(currentContent).map(([name, content]) => {
            const isDirectory = content !== null;
            if (isDirectory) {
              return <FolderItem key={name} name={name} onClick={() => handleFolderClick(name)} />;
            }
            return <NotebookItem key={name} name={name} onClick={() => setViewingNotebook(name)} />;
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogHomepage;
