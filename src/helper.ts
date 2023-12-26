export function padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
}

export function getFormattedDateTime(date: Date): string {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`;
}
