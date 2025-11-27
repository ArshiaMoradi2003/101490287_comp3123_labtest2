// src/WeatherCard.js
function WeatherCard({ weather }) {
    if (
        !weather ||
        !weather.sys ||
        !weather.main ||
        !weather.weather ||
        !weather.weather[0]
    ) {
        return null;
    }

    const now = new Date();
    const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
    const fullDate = now.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const icon = weather.weather[0].icon;
    const desc = weather.weather[0].description;
    const temp = Math.round(weather.main.temp);

    return (
        <div className="weather-wrapper">
            {/* LEFT CARD */}
            <div className="left-card">
                <p className="day-text">{dayName}</p>
                <p className="date-text">{fullDate}</p>
                <p className="location-text">
                    {weather.name} – {weather.sys.country}
                </p>

                <div className="big-circle" />

                <h1 className="big-temp">{temp}°C</h1>
                <p className="condition-text">{desc}</p>
            </div>

            {/* RIGHT GLASS CARD */}
            <div className="right-card">
                <div className="city-select-row">
                    <select className="city-select">
                        <option>
                            {weather.name} – {weather.sys.country}
                        </option>
                    </select>
                </div>

                {/* Faux forecast row (same data repeated – assignment doesn’t require real forecast) */}
                <div className="forecast-row">
                    {["Fri", "Sat", "Sun", "Mon", "Tue"].map((day, idx) => (
                        <div
                            key={day}
                            className={`forecast-item ${idx === 0 ? "active-forecast" : ""}`}
                        >
                            <span className="forecast-day">{day}</span>
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}.png`}
                                alt={desc}
                                className="forecast-icon"
                            />
                            <span className="forecast-temp">{temp}°C</span>
                        </div>
                    ))}
                </div>

                <div className="details-grid">
                    <div className="details-row">
                        <span>UV Index</span>
                        <span>8 (High)</span>
                    </div>
                    <div className="details-row">
                        <span>Humidity</span>
                        <span>{weather.main.humidity} %</span>
                    </div>
                    <div className="details-row">
                        <span>Wind</span>
                        <span>{weather.wind?.speed} km/h</span>
                    </div>
                    <div className="details-row">
                        <span>Pressure</span>
                        <span>{weather.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
