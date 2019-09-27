import { useMutation, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React, { useState, useEffect} from "react"
import {
  Alert,
  AsyncStorage,
  Button,
  Picker,
  Text,
  TextInput,
  View
} from "react-native"

const PROFILE_DATA_QUERY = gql`
  query Profile($id: ID!) {
    profile(id: $id) {
      id
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
  const [lastName, setLastName] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [document, setDocument] = useState("")
  const [cellPhone, setCellPhone] = useState("")
  const [birthday, setBirthday] = useState("")
  const [gender, setGender] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [profileId, setProfileId] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      const profileId = await AsyncStorage.getItem("userSessionProfileId")  
      setProfileId(profileId.profileId)
    };
    fetchData()
  },[])
  
  const { loading, error } = useQuery(PROFILE_DATA_QUERY, {
    variables: { id: profileId },
    onCompleted : ((data)=>{
      setName(data.profile.name),
      setLastName(data.profile.lastName),
      setDocumentType(data.profile.documentType),
      setDocument(data.profile.document),
      setCellPhone(data.profile.cellphone),
      setBirthday(data.profile.birthday),
      setGender(data.profile.gender),
      setCountryCode(data.profile.countryCode)
    })    
  })
  
  const [profileEditMutation, { mutationLoading }] = useMutation(
    PROFILE_DATA_MUTATION
  )

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error!!${error.toString()}`</Text>
  if (mutationLoading) return <Text>Loading Mutation...</Text>
  
  EditProfileScreen.navigationOptions = () => ({
    title: "Home",
    headerRight: (
      <View style={styles.headerComContainer}>
        <Button
          title="Login"
          color="#841584" />
      </View>
    )
  })

  return (
    
    <View style={{ flex: 1}}>
      <View style={{ flex: 0.1, alignItems:"flex-end" }}>
        <Button
            title="Guardar"
            onPress={() => _saveChangesAsync(
                                            profileId,
                                            name, 
                                            lastName, 
                                            documentType, 
                                            document, 
                                            cellPhone,
                                            birthday,
                                            gender, 
                                            countryCode,
                                            profileEditMutation
                                            )
            }         
          />
      </View>      
           
      <View style={{ flex: 0.65, justifyContent: "center", alignItems: "flex-start", marginHorizontal: 40 }}>
        <View style={{flex: 0.8, }}>
            <Text> EDITAR PERFIL</Text> 
          </View> 
        <View>        
          <Text> Nombre:</Text>
          <TextInput
            value={name}
            onChangeText={name => setName(name)}></TextInput>
          <Text> Apellido:</Text>
          <TextInput
            value={lastName}
            onChangeText={lastName => setLastName(lastName)}></TextInput>
          <View style={{ alignItems:"flex-start", width:90, marginHorizontal:20}}>
            <Text> Tipo:</Text>
            <Picker
              selectedValue={documentType}
              style={{height: 50, width: 100}}
              onValueChange={(documentType) => setDocumentType(documentType)}>
                <Picker.Item label="CC" value="CC"/>
                <Picker.Item label="TI" value="TI"/>
                <Picker.Item label="PP" value="PP"/>
                <Picker.Item label="CE" value="CE"/>
              </Picker>
          </View>
          <View style={{ alignSelf:"flex-end", marginVertical:-68, marginHorizontal:90}}>
            <Text> Identificación:</Text>
            <TextInput
              value={document}
              onChangeText={document => setDocument(document)}></TextInput>
          </View>
          <View style={{ alignItems:"flex-start", marginVertical:80}}>
            <Text> Numero:</Text>
            <TextInput
              value={countryCode}
              onChangeText={countryCode => setCountryCode(countryCode)}></TextInput>
          </View>
          <View style={{ alignSelf:"flex-end", marginVertical:-125, marginHorizontal:130}}>
            <Text> Celular:</Text>
              <TextInput
                value={cellPhone}
                onChangeText={cellPhone => setCellPhone(cellPhone)}></TextInput>
          </View>
          <View style={{ alignItems:"flex-start", marginVertical:130}}>
            <Text> Cumpleaños: (AAAA-MM-DD)</Text>
            <TextInput
              value={birthday}
              onChangeText={birthday => setBirthday(birthday)}></TextInput>  
            <Text> Genero:</Text>
            <Picker
              selectedValue={gender}
              style={{height: 50, width: 300}}
              onValueChange={(gender) => setGender(gender)}>
                <Picker.Item label="Hombre" value="male"/>
                <Picker.Item label="Mujer" value="female"/>
                <Picker.Item label="Otro" value="other"/>
              </Picker> 
          </View> 
        </View>
      </View>
    </View>
  )  
}

async function _saveChangesAsync(
                                profileId,
                                name, 
                                lastName, 
                                documentType, 
                                document, 
                                cellphone, 
                                birthday,
                                gender,
                                countryCode,
                                profileEditMutation
                                ) 
{
  try {       
    const savyBackendSaveChanges = await profileEditMutation({
      variables: {
        id: profileId,
        name: name,
        lastName: lastName,
        countryCode: countryCode,
        cellPhone: find_letters(cellphone),
        documentType: documentType,
        document: find_letters(document),
        birthday: birthday,
        gender: gender
      },
      refetchQueries: () => ["Profile"]
    })
    Alert.alert(`¡Se actualizo tu perfil!`)
  } catch ({ message }) {
    Alert.alert(`Savy Profile Edit: ${message.split(":").pop()}`)
  }
}

function find_letters(text){
  var letters = "abcdefghijklmnñopqrstuvwxyz#$%&/()=*+_-@<>{}[]"
  var cont = 0;
  text = text.toLowerCase();
  for(i=0; i<text.length; i++){
     if (letters.indexOf(text.charAt(i),0)!=-1){
      Alert.alert(`¡Por favor verifica tus datos!`)
      cont= cont+1;
     }
  }  
  if(cont == 0)
  {
    return text
  }
}

