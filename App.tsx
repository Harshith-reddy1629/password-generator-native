import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength : Yup.number()
  .min(4,'Should be min of 4 characters')
  .max(16,'Should be max of 16 characters')
  .required('Length is Required')
})

const App = () => {

  const [Password,setPassword ] = useState('')
  const [isGenerated,setIsGenerated] = useState(false)
  const [lowerCase,setLowerCase] = useState(true)
  const [upperCase,setUpperCase] = useState(false)
  const [numbers,setNumbers] = useState(false)
  const [symbols,setSymbols] = useState(false) 

  const generatePasswordString =(passwordLength:number)=>{
    
    let chrList = '' 

    const upperChrs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' 
    const lowerChrs = 'abcdefghijklmnopqrstuvwxyz'
    const digitChrs = '0123456789'
    const specialChrs = '!@#$%^&*()_+'

    chrList = upperCase ? chrList + upperChrs : chrList  
    chrList = lowerCase ? chrList + lowerChrs : chrList  
    chrList = numbers ? chrList + digitChrs : chrList  
    chrList = symbols ? chrList + specialChrs : chrList  

    const PassResult = createPassword( chrList , passwordLength )

    setPassword(PassResult)
    setIsGenerated(true)

  }

  const createPassword =(characters:string,passwordLength:number)=>{
    let result = '' 

    for (let i = 0; i < passwordLength; i++) {
      
      const ChrIndex = Math.floor(Math.random() * characters.length )

      result += characters.charAt(ChrIndex)
      
    }

    return result

  }

  const resetPassword = () =>{
    setPassword('')
    setIsGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' >
    <SafeAreaView>
      <View style={{alignItems:'center',marginVertical:5}} >
        <Text style={styles.appHeading}>Password Generator</Text>
      </View>
      <View >
      <Formik
       initialValues={{ passwordLength : '' }}
       validationSchema={PasswordSchema}
       onSubmit={(values)=>{ 
        generatePasswordString( +values.passwordLength ) 
       }}

     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         isSubmitting,
         /* and other goodies */
       }) => (
         <>
            <View style={{padding:12,paddingVertical:16 ,margin:8,marginHorizontal:16, borderRadius:12 , backgroundColor:'#ddd',elevation:2}} >
                <View >
              <View  >
                <Text style={{fontSize:20}} >Password Length</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={{color:'#dd2211'}} >{errors.passwordLength}</Text>
                ) }
                <TextInput
                value={values.passwordLength} 
                onChangeText={handleChange('passwordLength')}
                placeholder='Ex. 8'
                placeholderTextColor={'#666'}
                keyboardType='numeric'
                style={{backgroundColor:'#99999999',padding:10,borderRadius:6,marginTop:3}}
                />
              </View>
            </View>

            <View style={styles.checkContainer} >
              <Text style={styles.labelText} >Include Lowercase</Text>
              <BouncyCheckbox 
                disableBuiltInState
              isChecked={lowerCase}
              fillColor='#9499'
              onPress={()=>setLowerCase(!lowerCase)}
              />
              </View>
            <View style={styles.checkContainer}  >
              <Text style={styles.labelText}>Include Uppercase</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={upperCase}
              onPress={()=> setUpperCase(!upperCase)}
              fillColor='#2288ff'
              /></View>
            <View style={styles.checkContainer}  >
            <Text style={styles.labelText}>Include Numbers</Text>
              <BouncyCheckbox 
                disableBuiltInState
                isChecked={numbers}
              onPress={()=> setNumbers(!numbers)}
              fillColor='#ff374f'
              />
            </View>
            <View style={styles.checkContainer}  >
            <Text style={styles.labelText}>Include Special Characters</Text>
              <BouncyCheckbox 
                disableBuiltInState
                isChecked={symbols}
                onPress={()=> {setSymbols(!symbols)}}
                fillColor='#2f9f4f'
                />
            </View>

            <View style={styles.btsCon} >
              <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.btnCon} >
                <Text style={styles.btnTxt} >Generate</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=> {
                handleReset();
                resetPassword()
              }}
              style={[styles.btnCon,{backgroundColor:'tomato',paddingHorizontal:22}]} >
                <Text  style={styles.btnTxt} >Reset</Text>
              </TouchableOpacity>
            </View>
                </View>

         </>
       )}
     </Formik>
  { isGenerated ?   <View style={{backgroundColor:'#ddd',elevation:2,gap:6,marginVertical:12,marginHorizontal:16,borderRadius:8,height:100,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontWeight:'bold'}}>Long Press To Copy</Text><Text style={{fontSize:18,fontWeight:'700',backgroundColor:'#494',padding:8,paddingHorizontal:20,elevation:1,color:'#222',letterSpacing:2,borderRadius:8}} selectable={true}>{Password}</Text>
     </View>: null}
      </View>
    </SafeAreaView>

    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  appHeading:{
    fontSize:33,
    fontWeight:'bold',
    marginLeft:6,
  },
  checkContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:8,
    marginVertical:10,
  },
  labelText:{
    fontSize:20
  },
  btnCon:{
    backgroundColor:"#2358ff",
    padding:8,
    paddingHorizontal:18,
    borderRadius:6
  },
  btnTxt:{
    color:'#fff',
    fontSize:16
  },
  btsCon:{
    flexDirection: 'row',
    justifyContent:'space-evenly',
    marginVertical:16
  }
})

