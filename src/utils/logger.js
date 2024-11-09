// logger.js
function applyTimestampLogging() {
    const originalLog = console.log;
  
    console.log = (...args) => {
      const date = new Date();
    
      // Convert to GMT+1
      const gmtPlusOne = new Date(date.getTime() + 60 * 60 * 1000);
    
      // Format the date
      const yy = gmtPlusOne.getUTCFullYear().toString().slice(2);
      const mm = String(gmtPlusOne.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
      const dd = String(gmtPlusOne.getUTCDate()).padStart(2, '0');
      const hours = String(gmtPlusOne.getUTCHours()).padStart(2, '0');
      const minutes = String(gmtPlusOne.getUTCMinutes()).padStart(2, '0');
    
      const timestamp = `[${yy}-${mm}-${dd} | ${hours}:${minutes}]`;
  
      // Override console.log with timestamped logging
      originalLog(`${timestamp} :`, ...args);
    };
  }
  
  module.exports = { applyTimestampLogging };
  