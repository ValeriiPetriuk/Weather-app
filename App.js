import { StatusBar } from 'expo-status-bar';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import * as Location from 'expo-location'
import Loading from "./components/Loading";
import axios from "axios";
import Weather from "./components/Weather";


export default function App() {
  const [isLoading, selLoading] = useState(true)
  const [temp, setTemp] = useState(null)
  const [condition, setCondition] = useState("")

  const getWeather = async (latitude, longitude) => {
    const {data: {main: {temp}, weather}} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1039725e2045860590a1480fda53206d&units=metric`)
    setTemp(temp)
    setCondition(weather[0].main)
    selLoading(false)
  }
  const getLocation = async () => {
    try{
      await Location.requestForegroundPermissionsAsync();
      const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude)


    } catch (e) {
      Alert.alert("не можу визначити розташування", "Дуже сумно :(")
    }

  }

  useEffect(() => {
    getLocation();

  }, []);
  return (
      isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition}/>
  );
}


