const Navbar = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text">
              Blog
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
