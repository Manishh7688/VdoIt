import { View, Text, TextInput, ImageBackground, Dimensions, TouchableOpacity, Alert, PermissionsAndroid, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { LineChart } from 'react-native-chart-kit'
import axios from 'axios'
import DateCmp from '../dateFormatter'

const TemperatureChart = () => {
    const [city, setCity] = useState('');
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [all, setAll] = useState({})
    const [come, setCome] = useState(false)


    const reqPermisson = async() => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
                Alert.alert("You can use the location");
            } else {
                console.log("location permission denied")
                BackHandler.exitApp()
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const searchCity = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyACAXWDv-HeA9sFnUc-cJVEOSTJen2o95c`
            );

            const { results } = response.data;
            console.log('response', response);

            if (results.length > 0) {
                const { geometry } = results[0];
                const { location } = geometry;
                setLat(location.lat);
                setLong(location.lng);
            } else {
                Alert.alert('City not found');
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    const weatherData = async () => {
        console.log('latitutututasgis', lat, long);

        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c7b7f8674495894d113331f1dd768fac`
            )
            console.log("res===============", res.data);
            setAll(res.data)
            setCome(true)
        }
        catch (e) {
            console.log("temp apii", e);
        }
    }
    console.log("all data is here", all);
    useEffect(() => {
        reqPermisson()
        console.log("usreffect", lat);

        if (lat) {
            weatherData()


        }
    }, [lat, long])

    let time = (d) => {
        return new Date(d)
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/background.jpg')} resizeMode="cover" style={styles.image}>

                {come ?
                    (
                        <><Text style={styles.temp}>{`${all.main.temp}°F`}</Text>
                            <Text style={[styles.temp, { fontSize: 20, marginTop: 10 }]}>City: {city}</Text>
                            <View style={styles.middle}>
                                <View style={styles.left}>
                                    <Text style={styles.text}>pressure: {all.main.pressure}</Text>
                                    <Text style={styles.text}>Humidity: {all.main.humidity}</Text>
                                    <Text style={styles.text}>Wind: {all.wind.speed} km/h</Text>
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.text}>Weather</Text>
                                    <Text style={styles.text}> {<DateCmp timestamp={all.dt} />}</Text>
                                    <Text style={styles.text}>{all.weather[0].main}</Text>
                                </View>
                            </View></>) : ''}
                <LineChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={chartConfig}
                    style={styles.chart}
                />
                <TextInput style={styles.input}
                    placeholder='search city'
                    placeholderTextColor={'white'}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <TouchableOpacity style={styles.btn} onPress={searchCity}>
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default TemperatureChart
