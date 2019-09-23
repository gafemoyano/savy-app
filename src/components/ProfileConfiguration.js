import React, { useContext } from "react"
import { View, Text, Button } from "react-native"
import { NavigationContext } from "react-navigation"

export default function ProfileConfiguration() {
  const navigation = useContext(NavigationContext)
  return (
    <View>
      <Text style={{ fontSize: 30 }}>        
        Profile configuration injected component!
      </Text>
      <Button title="Editar"
              onPress={() =>
                navigation.navigate("EditProfile")
              }  />
    </View>
  )
}
