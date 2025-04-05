export const formatDate = (dateString: string): string => {
  // const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
  return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " at " + hours + ":" + minutes;
}

export const parseTitle = (html: string): string => {
  const re = /<.*?>.*?<\/.*?>/;
  const match: RegExpExecArray | null = re.exec(html);
  if (match) {
    const temp: HTMLDivElement = document.createElement('div');
    console.log(html)
    temp.innerHTML = match[0];
    if (temp.textContent && temp.textContent.length > 26) {
      const title: string = temp.textContent.slice(0, 26);
      return `${title.trimEnd()}...`
    } else if (temp.textContent) {
      return temp.textContent.trimEnd();
    }
  }
  return "New Note";
}

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary: string = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < buffer.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

export const base64toArrayBuffer = (base64: string): ArrayBuffer => {
  const binary: string = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}
