const baseUrl = 'https://soliton.glitch.me';

export interface City {
    cityName: string;
    dateAndTime: string;
    timeZone: string;
    temperature: string;
    humidity: string;
    precipitation: string;
}

export interface CityDateTime {
    city_Date_Time_Name: string
}

export interface CityWeatherForecast {
    hours: string[];
    temperature: string[];
}

export const getAllCitiesApi = async (): Promise<City[]> => {
    const response = await fetch(`${baseUrl}/all-timezone-cities`);
    return response.json();
};

export const getCityDateTimeApi = async (city: string): Promise<CityDateTime> => {
    const response = await fetch(`${baseUrl}?city=${city}`);
    return response.json();
};

export const getCityWeatherForecastApi = async (cityDateTime: CityDateTime, hours: number): Promise<CityWeatherForecast> => {
    const requestBody = {
        ...cityDateTime,
        hours: hours
    };

    const response = await fetch(`${baseUrl}/hourly-forecast`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    return response.json();
};