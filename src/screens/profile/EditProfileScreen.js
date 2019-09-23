import React, { useState } from "react"
import { Text, View, ScrollView,TextInput, Button } from "react-native"
import { useQuery , useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
//import { NavigationContext } from "react-navigation"

const PROFILE_DATA_QUERY = gql`
  query Profile {
    profile(id:4){
      name
      lastName
      cellphone
      documentType
      document
      birthday
      gender
    }
  }`
  const PROFILE_DATA_MUTATION = gql`
  mutation profileEdit($name:String!,
                      $lastName:String!,
                      $cellphone:String!,
                      $documentType:String!,
                      $document:String!,
                      $birthday:String!,
                      $gender:String!) {
    profileEdit(name:$name,
            lastName:$lastName,
            cellPhone:$cellphone,
            documentType:$documetType,
            document:$document,
            birthday:$birthday,
            gender:$gender) {
      profilePostEdit
    }
  }
`

export default function EditProfileScreen(props) {
  const [name, setName] = useState('')
  const [lastName, setlastName] = useState('')
  const { loading, error, data } = useQuery(PROFILE_DATA_QUERY)
  const [profileEdit, {errorM}] = useMutation(PROFILE_DATA_MUTATION, 
                                                      variables={name,lastName},
                                                      refetchQueries=["Profile"])
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error!!${error.toString()}`</Text>
  if (errorM) return <Text>`Error!!${error.toString()}`</Text>
  /*const { loading2, error2 } = useMutation(PROFILE_DATA_MUTATION)
  if (loading2) return <Text>LoadingM...</Text>
  if (error2) return <Text>`Error!${error.toString()}`</Text>*/
  
  const profile = data.profile

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edita tus datos</Text>    
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text> Nombre:</Text>
          <TextInput 
            onChange ={e => setName(e.target.value)}>{` ${profile.name}`}</TextInput>
          <Text
            onChange ={e => setlastName(e.target.value)}> Apellido:</Text>
          <TextInput>{` ${profile.lastName}`}</TextInput>
          <Text>Celular:</Text>
          <TextInput>{` ${profile.cellphone}`}</TextInput>
          <Text>Tipo de documento:</Text>
          <TextInput>{` ${profile.documentType}`}</TextInput>
          <Text>Documento: </Text>
          <TextInput>{` ${profile.document}`}</TextInput>
          <Text>Cumpleaños:</Text>   
          <TextInput>{` ${profile.birthday}`}</TextInput>   
          <Text> Genero:</Text>   
          <TextInput>{` ${profile.gender}`}</TextInput>    
          <Button title="Guardar"
                  onPress={profileEdit}/>              
        </View>
        
      </View>        
    </View>
  )
}
