import { StatusBar } from 'react-native'
import React from 'react'
import TemperatureChart from './src/components/Temperature'

const App = () => {
  return (
    <>
    <StatusBar barStyle={'light-content'} backgroundColor={"#3F51B5"}/>
    <TemperatureChart />
    </>
  )
}

export default App