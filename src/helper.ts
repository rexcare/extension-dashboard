export function padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
}

export function getFormattedDateTime(date: Date): string {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`;
}

export function getGeolocation(timeout = 5000): GeolocationCoordinates | undefined {
    let crd: GeolocationCoordinates | undefined;
    const options = {
        enableHighAccuracy: true,
        timeout: timeout,
        maximumAge: 0,
    };

    function success(pos: GeolocationPosition) {
        crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err: any) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
    return crd;
}
