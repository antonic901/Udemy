const add = (a: number, b: number): number => {
    return a + b;
};

// always use return type!!
// const subtract = (a: number, b: number) => {
//     a - b;
// }

function divide(a: number, b: number): number {
    return a / b;
}

const multiply = function(a: number, b: number): number {
    return a * b;
}

const logger = (message: string): void => {
    console.log(message);
}

// Function will never return anything, we will get error at some point
const throwError = (message: string): never => {
    throw new Error(message);
}

const forecast = {
    date: new Date(),
    weather: 'sunny'
};

const logWeather = (forecast: { date: Date, weather: string}): void => {
    console.log(forecast.date);
    console.log(forecast.weather);
};

// Destructuring
// const logWeather = ({date, weather}: { date: Date, weather: string}): void => {
//     console.log(date);
//     console.log(weather);
// };

logWeather(forecast)