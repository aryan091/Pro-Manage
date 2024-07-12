import './Shimmer.css'; // Ensure you have the necessary styles in this CSS file

const AnalyticsShimmer = () => {
  return (
    <div className="analytics-shimmer-container w-[75%] h-full fixed ml-[25%] p-4 bg-white">
      <h2 className="analytics-header-shimmer animate-shimmer"></h2>
      <div className="analytics-cards flex gap-4 space-x-2 pl-8">
        <div className="analytics-card-1 bg-[#F9FCFF] shadow rounded p-8 w-[400px] h-52">
          <div className="task-list-1 space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="shimmer-line h-6 w-4/5 mb-2"></div>
            ))}
          </div>
        </div>
        <div className="analytics-card-2 bg-[#F9FCFF] shadow rounded p-8 w-[400px] h-52">
          <div className="task-list-2 space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="shimmer-line h-6 w-4/5 mb-2"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsShimmer;
