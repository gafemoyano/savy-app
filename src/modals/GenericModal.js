import React from "react"
import { View, Text, Button } from "react-native"

export default function GenericModal(props) {
  const renderComponent = props.navigation.getParam("renderComponent", "")
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {renderComponent}
      <Button onPress={() => props.navigation.goBack()} title="Dismiss" />
    </View>
  )
}
