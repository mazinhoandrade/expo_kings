export const formatDateYear = (date: Date) =>  {
    const data = new Date().getFullYear();
    const newDate = data - new Date(date).getFullYear();
    return newDate;
};