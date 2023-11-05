export function dateFormater (stringDate) {
    const date = new Date(stringDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`;
}
