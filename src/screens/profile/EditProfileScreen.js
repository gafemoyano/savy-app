import { useMutation, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React, { useState } from "react"
import {
  Alert,
  AsyncStorage,
  Button,
  Text,
  TextInput,
  View
} from "react-native"

const PROFILE_DATA_QUERY = gql`
  query Profile($id: ID!) {
    profile(id: $id) {
      name
      lastName
      countryCode
      cellphone
      documentType
      document
      birthday
      gender
    }
  }
`

const PROFILE_DATA_MUTATION = gql`
  mutation profileEdit(
    $id: ID!
    $name: String!
    $lastName: String!
    $countryCode: String!
    $cellPhone: String!
    $documentType: String!
    $document: String!
    $birthday: String!
    $gender: String!
  ) {
    profileEdit(
      id: $id
      name: $name
      lastName: $lastName
      countryCode: $countryCode
      cellPhone: $cellPhone
      documentType: $documentType
      document: $document
      birthday: $birthday
      gender: $gender
    ) {
      message
    }
  }
`

export default function EditProfileScreen() {
  const [name, setName] = useState("")
  const { loading, error } = useQuery(PROFILE_DATA_QUERY, {
    variables: { id: 123 },
    onCompleted: data => setName(data.profile.name)
  })
  const [profileEditMutation, { mutationLoading }] = useMutation(
    PROFILE_DATA_MUTATION
  )
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error!!${error.toString()}`</Text>
  if (mutationLoading) return <Text>Loading Mutation...</Text>
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edita tus datos</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text> Nombre:</Text>
          <TextInput
            value={name}
            onChangeText={name => setName(name)}></TextInput>
          <Button
            title="Guardar"
            onPress={() => _saveChangesAsync(name, profileEditMutation)}
          />
        </View>
      </View>
    </View>
  )
}

async function _saveChangesAsync(name, profileEditMutation) {
  try {
    const profileId = await AsyncStorage.getItem("userSessionProfileId")
    const savyBackendSaveChanges = await profileEditMutation({
      variables: {
        id: 123,
        name: name,
        lastName: "Mckenzy",
        countryCode: "57",
        cellPhone: "12345678",
        documentType: "CC",
        document: "12345678",
        birthday: "",
        gender: ""
      },
      refetchQueries: () => ["Profile"]
    })
    Alert.alert(`¡Se actualizo tu perfil!`)
  } catch ({ message }) {
    Alert.alert(`SPE: ${message.split(":").pop()}`)
  }
}
