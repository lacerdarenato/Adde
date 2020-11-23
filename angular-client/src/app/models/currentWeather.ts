import { weather } from './weather';

export interface currentWeather {
    temp: number,
    city_name: string,
    weather: weather
}
