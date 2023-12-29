import { GEOCoordinates } from "./types";

export function padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
}

export function getFormattedDateTime(date: Date): string {
    // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`;
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`;
}

export async function getGeolocationCoordinates(options?: PositionOptions): Promise<GEOCoordinates> {
    return new Promise((resolve, reject) => {
        function success(position: GeolocationPosition) {
            resolve({
                long: position.coords.longitude,
                lat: position.coords.latitude,
            })
        }

        function error(err: any) {
            reject(`Failed to get current position: ${err}`)
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    });
}
