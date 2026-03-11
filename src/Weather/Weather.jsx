import React,{useEffect,useRef,useState}from "react";

const Weather =() => {

    const inputRef = useRef()
    const [weatherData,setWeatherData] =useState(null);

    let search = async (city) => {
        if(!city.trim()){
            alert("Please enter a city name")
            return;
        }


        try{
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&
            appid=${import.meta.env.VITE_APP_ID}`


            let response= await fetch(url)
            let data =await response.json()

            console.log(data)

            if(data.cod !== 200){
                alert("city not found");
                setWeatherData(null);
                return;
            }


            setWeatherData({
                humidity: data.main.humidity,
                windSpeed:data.wind.speed,
                temp: Math.floor(data.main.temp),
                location :data.name,
                icon :` https://openweathermap.org/img/wn/${data.Weather[0].icon}@2x.png`
            });
            
        }catch(error){
            setWeatherData(null)
            alert("Error fetching Weather data")
            console.error(error)
        }

        inputRef.current.value = "";
    }

    useEffect(()=>{
        search("Pune")
    },[])
    return (
        <div className="w-[320px] h-[520px] rounded-3xl bg-gradient-to-b from-pink-600
         to-purple-500 p-4 text-white shadow-x1 flex-col">
            <div className="flex items-center gap-3 ">
                <input
                ref={inputRef}
                type="text"
                placeholder="search"
                className="flex-1 px-4 py-2 rounded-full text-white 
                bg-transparent border  border-white/50 placeholder-white/70 
                 outline-none focus:border-white"
                />
                <button className="w-10 h-10  bg-white rounded-full flex items-center
                 justify-center hover:cursor-pointer text-white"
                onClick={()=>search(inputRef.current.value)}>
                 🔍
                </button>
            </div>
           {weatherData && (
            <>
            
            <div className="flex justify-center mt-14 ">
                <img
                src={weatherData.icon}
                alt="weather icon "
                className="w-32 h-32"
                />
            </div>
             
             <p className="text-center text-6x1 font-light  mt-6 text-white">
                {weatherData.temp}&deg;C</p>
             <p className="text-center font-bold text-2xl mt-1 text-white">
                {weatherData.location}</p>

             <div className="flex justify-between px-4 pb-4 mt-25">

                <div className="flex items-center gap-3">
                    <span className="text-x1">💧</span>

                    <div>
                        <p className="text-center font-6x1 font-light mt-6 ">
                            {weatherData.humidity}%

                        </p>
                        <p className="text-center font-bold text-2x1 mt-1">
                            Humadity</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-x1">🌬️</span>
                    <div>
                        <p className="text-sm font-medium text-white">{weatherData.windSpeed}</p>
                        <p className="text-xs opacity-80 text-white">Wind Speed</p>
                    </div>
                </div>
             </div>
             </>
            )}
        </div>
    )
}
export default Weather