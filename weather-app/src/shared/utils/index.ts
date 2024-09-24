export function formatDate(dateString: string): string {
    const dateParts = dateString.split('-');
    const month = dateParts[1];
    const day = dateParts[2];
    return `${month}/${day}`;
}