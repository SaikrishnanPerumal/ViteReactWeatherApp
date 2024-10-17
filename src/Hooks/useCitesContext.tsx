/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from "react";
import { City, CityDateTime, getAllCitiesApi, getCityDateTimeApi } from "../Services/cityWeatherApis";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CitiesContext {
    cities?: City[];
    selectedCity: string;
    setSelectedCity: (cityName: string) => void;
    isCitiesLoading: boolean;
    getCityDateTime: (cityName: string) => void;
    cityDateTime?: CityDateTime;
}

const citiesContext = createContext<CitiesContext | undefined>(undefined);

const CitiesContextProvider = ({ children }: {children: ReactNode}) => {

    const {data: cities, isLoading: isCitiesLoading} = useQuery(['cities'],
        {
            queryFn: getAllCitiesApi
        }
    );
    const [selectedCity, setSelectedCity] = useState<string>('');

    const {data: cityDateTime, mutate: getCityDateTime} = useMutation({
        mutationFn: (cityName: string) => getCityDateTimeApi(cityName)
    });

    return <citiesContext.Provider value={{
            cities,
            selectedCity, setSelectedCity,
            isCitiesLoading, cityDateTime,
            getCityDateTime
        }}>
        {children}
    </citiesContext.Provider>;
}

const useCitiesContext = () => {
    const context = useContext(citiesContext);

    if (context === undefined) {
        throw new Error('useCitiesContext must be used within a CitiesContextProvider');
    }
    return context;
}

export {CitiesContextProvider, useCitiesContext};