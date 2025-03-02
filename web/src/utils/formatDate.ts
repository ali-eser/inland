export const formatDate = (dateString: string): string => {
  const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date: Date = new Date(dateString);
  return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " at "  + date.getHours() + ":" + date.getMinutes();
}