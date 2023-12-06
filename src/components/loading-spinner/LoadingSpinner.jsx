function LoadingSpinner() {
  return (
    <div className="overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
export default LoadingSpinner;