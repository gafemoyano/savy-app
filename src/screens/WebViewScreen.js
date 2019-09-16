import React from "react"
import { Alert, TouchableOpacity, View, Text } from "react-native"

export default function WebViewScreen(props) {
  /*   const a = "Luis"
  const html = `
    <script>
      function send(){
        window.postMessage('${a}');
      }
    </script>
    <button onclick="send()">Send</button>
` */

  postData = async str => {
    try {
      let res = await fetch("https://api-uat.kushkipagos.com/card/v1/tokens", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Public-Merchant-Id": "1000000620905344928415591646868"
        },
        body: str
      })
      res = await res.json()
      console.log(res)
      Alert.alert("Token", res)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    /*  <WebView
      style={{ top: 50 }}
      source={{ html }}
      onMessage={event => Alert.alert(event.nativeEvent.data)}
    /> */
    <View>
      <TouchableOpacity
        onPress={() =>
          this.postData(`{
          "card": {
            "name": "TESTING",
            "number": "4386261181077714",
            "expiryMonth": "08",
            "expiryYear": "23",
            "cvv": "121"
          },
          "totalAmount": 30.15,
          "currency": "USD"
        }`)
        }
        style={{ padding: 20, backgroundColor: "gray" }}>
        <Text>Post</Text>
      </TouchableOpacity>
    </View>
  )
}
