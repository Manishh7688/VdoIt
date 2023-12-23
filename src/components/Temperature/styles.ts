import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    input:{
        width:'99%',
        height:50,
        borderBottomWidth:.5,
        alignSelf:'center',
        alignItems:'center',
        fontSize:20,
        color:'white',
        borderColor:'white',
        marginTop:30,
    },
    image:{
        flex:1,
    },
    temp:{
        fontSize:40,
        color:'white',
        alignSelf:'center',
        marginTop:20,
        fontWeight:'bold',
    },
    text:{
        fontSize:18,
        color:'white',
        marginLeft:10
    },
    middle:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10
    },
    left:{
        flexDirection:'column'
    },
    right:{
        flexDirection:'column'
    },
    chart:{
        marginTop:10
    },
    btn:{
        backgroundColor:"#3F51B5",
        height:50,
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:150,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        
    }
})