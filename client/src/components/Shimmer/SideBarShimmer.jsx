import './SideBarShimmer.css';
const SideBarShimmer = () => {

  return (
    <div className="w-[25%] h-full bg-white border-r border-gray-200 fixed flex flex-col">
      {/* Logo and Title */}
      <div className="p-4 border-b border-gray-200">
        <div className="animate-pulse flex items-center">
          <div className="rounded-full h-6 w-6 bg-gray-300 mr-2"></div>
          <div className="bg-gray-300 w-20 h-6"></div>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex flex-col p-4 space-y-4">
        <div className="flex items-center text-teal-600 bg-gray-100 p-2 rounded animate-pulse">
          <div className="rounded-full h-6 w-6 bg-gray-300 mr-2"></div>
          <div className="bg-gray-300 w-12 h-4"></div>
        </div>
        <div className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100 animate-pulse">
          <div className="rounded-full h-6 w-6 bg-gray-300 mr-2"></div>
          <div className="bg-gray-300 w-10 h-4"></div>
        </div>
        <div className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100 animate-pulse">
          <div className="rounded-full h-6 w-6 bg-gray-300 mr-2"></div>
          <div className="bg-gray-300 w-10 h-4"></div>
        </div>
      </nav>
      
      {/* Logout Button */}
      <div className="p-4 mt-auto mb-8">
        <div className="flex items-center text-red-600 p-2 rounded hover:bg-gray-100 animate-pulse">
          <div className="bg-gray-300 w-16 h-4 cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default SideBarShimmer;
