import './ViewTaskShimmer.css'; // Ensure you have the necessary styles in this CSS file

const ViewTaskShimmer = () => {
  return (
    <div className="view-task-shimmer-container w-full h-full fixed p-4 mt-4 mb-4 mx-auto flex flex-col justify-start items-center">
      <div className="header-container w-full flex justify-start items-center mb-4">
        <div className="shimmer-line h-6 w-16 bg-gray-300 rounded mr-2"></div>
        <div className="shimmer-line h-6 bg-gray-300 rounded"></div>
      </div>

      <div className="view-task-content bg-white shadow-lg p-6 rounded-lg mt-4">
        <div className="view-task-card mb-4">
          <div className="view-task-header flex items-center justify-between mb-4">
            <span className="shimmer-line h-4 w-20 bg-gray-300 rounded"></span>
          </div>
          <div className="view-task-title text-xl font-semibold mb-4">
            <div className="shimmer-line h-6 w-full bg-gray-300 rounded"></div>
          </div>
          <div className="shimmer-line h-4 w-32 bg-gray-300 rounded mb-4"></div>

          <div className="view-task-checklist custom-scrollbar overflow-y-auto max-h-[300px]">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="view-task-checklist-item flex items-center mb-2 border border-gray-300 p-4 rounded-lg">
                <div className="shimmer-line h-4 w-4/5 bg-gray-300 rounded mr-2"></div>
              </div>
            ))}
          </div>
          <div className="view-task-footer flex items-center gap-4 text-sm mt-4">
            <div className="shimmer-line h-4 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskShimmer;
