export function clockManager() {
  const clockElement = document.getElementById('clock');

  function updateClock() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    clockElement.innerHTML = `${hours}:${minutes}<br>${year}-${month}-${day}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}