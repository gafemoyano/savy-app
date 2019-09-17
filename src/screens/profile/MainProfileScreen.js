import React from "react"
import { Button, Text, View } from "react-native"
import ProfileConfiguration from "../../components/ProfileConfiguration"

export default function MainProfileScreen(props) {
  return (
    <View>
      <Text>Hello to you're profile!</Text>
      <View>
        <Button
          title="Configuración"
          onPress={() =>
            props.navigation.navigate("GenericModal", {
              renderComponent: <ProfileConfiguration></ProfileConfiguration>
            })
          }
        />
      </View>
    </View>
  )
}
