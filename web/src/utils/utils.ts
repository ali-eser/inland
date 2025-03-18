export const formatDate = (dateString: string): string => {
  const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date: Date = new Date(dateString);
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " at " + hours + ":" + minutes;
}

export const getTextFromHtml = (html: string): string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
};
