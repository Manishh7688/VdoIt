import { View, Text } from 'react-native'
import React from 'react'

type Prop={
    timestamp:any
}
const DateCmp = ({timestamp}:Prop) => {
    let dateObject = new Date(timestamp*1000)

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
   
  
    const formattedDate = `${year}-${month}-${day}`;
  
    return    <Text>{formattedDate}</Text>
     
  };

export default DateCmp