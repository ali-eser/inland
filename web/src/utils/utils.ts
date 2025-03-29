export const formatDate = (dateString: string): string => {
  const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const date: Date = new Date(dateString);
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const hours: string = String(date.getHours()).padStart(2, "0");
  return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " at " + hours + ":" + minutes;
}

export const getTextFromHtml = (html: string): string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary: string = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < buffer.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

export const base64toArrayBuffer = (base64: string) => {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}
