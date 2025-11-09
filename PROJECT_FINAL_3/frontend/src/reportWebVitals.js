const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Monitor appointment booking flow performance
      getCLS(onPerfEntry);  // Track layout shifts during appointment selection
      getFID(onPerfEntry);  // Measure responsiveness when users interact with booking forms
      getFCP(onPerfEntry);  // Track when users first see appointment content
      getLCP(onPerfEntry);  // Monitor main appointment list loading
      getTTFB(onPerfEntry); // Track initial server response time
    });
  }
};

export default reportWebVitals;