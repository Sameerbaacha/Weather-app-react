import { useState } from 'react';
import './App.css';

function App() {
  let [cityName, setcityName] = useState('');
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=496c9246945c36b3c01f782eed8ea08e&units=metric`;
  let [weather, setweather] = useState({});

  let fetchData = async () => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setweather(data);
    } catch (error) {
      console.log("error aya h ===>>>>", error.message);
    }
  };

  const { name } = weather;
  const temp = weather?.main?.temp;
  const feelTemp = weather?.main?.feels_like;
  const humidity = weather?.main?.humidity;
  const country = weather?.sys?.country;
  const description = weather?.weather?.[0]?.description;
  const speed = weather?.wind?.speed;

  return (
    <>
      <div className='flex justify-center items-center'>
        <div className=' bg-gradient-to-br from-blue-100 to-indigo-300 shadow-md rounded-lg p-8 max-w-lg w-full'>
          <h1 className='text-3xl font-bold text-indigo-600 text-center mb-6'>Weather App</h1>

          <div className='flex justify-center mb-4'>
            <input
              value={cityName}
              onChange={(e) => setcityName(e.target.value)}
              className='border border-indigo-400 py-2 px-4 rounded-md w-3/4 focus:outline-none focus:border-indigo-600 transition-all duration-300'
              placeholder='Enter city name...'
              type="text"
            />
          </div>

          <div className='flex justify-center'>
            <button
              onClick={fetchData}
              className='bg-indigo-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-indigo-700 transition-all duration-300'
            >
              Search
            </button>
          </div>

          {/* Weather Information */}
          <div className='mt-8'>
            {name ? (
              <>
                <p className='mb-3 text-indigo-600  '>City: <b>{name}</b></p>
                <p className='mb-3 text-indigo-600  '>Country: <b>{country}</b></p>
                <p className='mb-3 text-indigo-600  '>Temperature: <b>{temp}</b>°C</p>
                <p className='mb-3 text-indigo-600  '>Description: <b>{description}</b></p>
                <p className='mb-3 text-indigo-600  '>Humidity: <b>{humidity}</b>%</p>
                <p className='mb-3 text-indigo-600  '>Wind Speed: <b>{speed} </b>m/s</p>
                <p className='mb-3 text-indigo-600  '>Feels like: <b>{feelTemp}</b> °C</p>
              </>
            ) : (
              <p className='text-gray-500 text-center'>Enter a city to get weather information.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
