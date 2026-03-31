const Shimmer = () => {
  return (
    <div className="res-container">
      {/* Generate 10 shimmer cards */}
      {Array(10)
        .fill('')
        .map((_, i) => (
          <div className="shimmer-card" key={i}>
            <div className="shimmer-img" />
            <div className="res-ino">
              <div className="shimmer-line title"></div>
              <div className="shimmer-line rating"></div>
              <div className="shimmer-line time"></div>
              <div className="shimmer-line cuisine"></div>
              <div className="shimmer-line location"></div>
              <div className="shimmer-line area"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
