import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "./App.css";
function App() {
  const [city, setCity] = useState("Toronto");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // ⚠ Replace with your real key, but DON'T commit it to GitHub
  const API_KEY = "YOUR_REAL_API_KEY";

  const fetchWeather = async () => {
    try {
      setError(null);

      const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=ec317d906e971988eaa8529256d7ea17&units=metric
`
      );

        const data = await res.json();
        console.log("API response:", data);

        if (data.cod !== 200) {
            setWeather(null);
            setError(data.message || "Failed to load weather");
            return;
        }

        setWeather(data);
    } catch (err) {
        console.error(err);
        setError("Network error");
        setWeather(null);
    }
  };

    useEffect(() => {
        fetchWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app-root">
            <div className="overlay">
                <div className="top-bar">
                    <h1 className="app-title">Weather Dashboard</h1>
                    <div className="searchBox">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city..."
                        />
                        <button onClick={fetchWeather}>Search</button>
                    </div>
                </div>

                {error && <p className="error-text">{error}</p>}

                {weather && <WeatherCard weather={weather} />}
            </div>
        </div>
    );
}

export default App;