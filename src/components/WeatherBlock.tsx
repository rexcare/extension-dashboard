type Props = {
  weatherIconURL: string;
  temperatureCurrent: number;
  temperatureMin: number;
  temperatureMax: number;
};

export default function WeatherBlock({
  weatherIconURL,
  temperatureCurrent,
  temperatureMin,
  temperatureMax,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="w-1/2 flex items-center">
        <img
          src={weatherIconURL}
          alt="Current Weather Icon"
          className="object-cover w-full h-full"
        />
        <p className="text-xl text-shadow-sm">{temperatureCurrent}</p>
      </div>

      <p className="flex space-x-1 text-shadow-sm">
        <span>{temperatureMin}</span>
        <span>&deg;C</span>
        <span>-</span>
        <span>{temperatureMax}</span>
        <span>&deg;C</span>
      </p>
    </div>
  );
}
