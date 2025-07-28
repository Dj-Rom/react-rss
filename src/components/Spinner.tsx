const Spinner = () => {
  return (
    <>
      <style>{`
        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid #ccc;
          border-top-color: #1d72b8;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 40px auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div role="status" aria-label="Loading">
        <div className="spinner"></div>
        <span style={{ display: 'none' }}>Loading...</span>{' '}
        {/* optional text for screen readers */}
      </div>
    </>
  );
};

export default Spinner;
