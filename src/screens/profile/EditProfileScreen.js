import React, { useState } from "react"
import { Text, View, AsyncStorage, Alert, TextInput, Button } from "react-native"
import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const PROFILE_DATA_QUERY = gql`
  query Profile {
    profile(id:4){
      name
      lastName   
      countryCode 	
      cellphone
      documentType
      document
      birthday
      gender      
    }
  }`

  const PROFILE_DATA_MUTATION = gql`
  mutation profileEdit(
    $name:String!,
    $lastName:String!,
    $countryCode:String!,
    $cellphone:String!,                      
    $documentType:String!,
    $document:String!,
    $birthday:String!,
    $gender:String!,
    $profileId: String!) 
    {
    profileEdit(
      id:4,
      name:$name,
      lastName:$lastName,
      countryCode:$countryCode,
      cellPhone:$cellphone,            
      documentType:$documentType,
      document:$document,
      birthday:$birthday,
      gender:$gender,
      profileId:$profileId)   
  }
`

export default function EditProfileScreen(props) {
  const [name, setName] = useState('')
  const [lastName, setlastName] = useState('')
  const [countryCode, setcountryCode] = useState('')
  const [cellPhone, setcellPhone] = useState('')
  const [documentType, setdocumentType] = useState('')
  const [document, setdocument] = useState('')
  const [birthday, setbirthday] = useState('')
  const [gender, setgender] = useState('')
  
  const {loading, error, data} = useQuery(PROFILE_DATA_QUERY)
  
  const [profileEditMutation, {errorMutation, mutationLoading}] = useMutation(PROFILE_DATA_MUTATION)

  
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error!!${error.toString()}`</Text>
  
  if (errorMutation) return <Text>`Error!!${error.toString()}`</Text>
  if (mutationLoading) return <Text>Loading Mutation...</Text>
  
  const profile = data.profile

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edita tus datos</Text>    
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text> Nombre:</Text>
          <TextInput 
            value={name}
            onChange={name => setName(name.target.value)}>{` ${profile.name}` }</TextInput>
          <Text> Apellido:</Text>
          <TextInput
            value={lastName}
            onChange ={lastName => setlastName(lastName.target.value)}>{` ${profile.lastName}`}</TextInput>
          <Text>Country Code:</Text>
          <TextInput
            value={countryCode}
            onChange ={countryCode => setcountryCode(countryCode.target.value)}>{` ${profile.countryCode}`}</TextInput>
          <Text>Celular:</Text>
          <TextInput
            value={cellPhone}
            onChange ={cellPhone => setcellPhone(cellPhone.target.value)}>{` ${profile.cellphone}`}</TextInput>
          <Text>Tipo de documento:</Text>
           <TextInput
              value={documentType}
              onChange ={documentType => setdocument(documentType.target.value)}>{` ${profile.document}`}</TextInput>
          <Text>Documento: </Text>
            <TextInput
            value={document}
            onChange ={document => setdocument(document.target.value)}>{` ${profile.document}`}</TextInput>
          <Text>Cumpleaños:</Text>   
          <TextInput
            value={birthday}
            onChange ={birthday => setbirthday(birthday.target.value)}>{` ${profile.birthday}`}</TextInput>   
          <Text> Genero:</Text>   
          <TextInput
            value={gender}
            onChange ={gender => setgender(gender.target.value)}>{` ${profile.gender}`}</TextInput>    
          <Button title="Guardar"
                  onPress={()=> _saveChangesAsync(
                                                  name,
                                                  lastName, 
                                                  countryCode, 
                                                  cellPhone, 
                                                  documentType,
                                                  document, 
                                                  birthday, 
                                                  gender,
                                                  profileEditMutation)}/>            
        </View>
        
      </View>        
    </View>
  )
}

async function _saveChangesAsync(
                                name, 
                                lastName, 
                                countryCode, 
                                cellPhone, 
                                documentType, 
                                document, 
                                birthday, 
                                gender, 
                                profileEditMutation){
  try{
    const profileId =  await AsyncStorage.getItem("profileId")
    const savyBackendSaveChanges = await profileEditMutation({
      variables: {
        name:name,
        lastName:lastName,
        countryCode:countryCode,
        cellPhone:cellPhone,
        documentType:documentType,
        document:document,
        birthday:birthday,
        gender:gender,
        profileId: profileId
      }, 
      refetchQueries:["Profile"]
    })
    await AsyncStorage.setItem("userSessionProfileId")
     savyBackendSaveChanges.data.profileEdit.profileId
  }
  catch ({ message }) {
    Alert.alert(`SPE: ${message.split(":").pop()}`)
  }
}