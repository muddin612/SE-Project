function updateDigitalClock() {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    hours = hours % 12 || 12;
  
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    const digitalClockElement = document.getElementById('digitalClock');
    digitalClockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  }
  
  // Update the digital clock every second
  setInterval(updateDigitalClock, 1000);
  
  // Initial update
  updateDigitalClock();
  