const reportWebVitals = (onPerfEntry?: (metric: unknown) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    void import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
