import React, { useState } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';

const fontFamily = 'Raleway-Light';

const colors = [
  '#fff',
  '#202020',
  '#f88e11',
  '#c6c6c9',
  '#cbcbce',
  '#222222',
  '#79797b'
];

const {width, height} = Dimensions.get('window');

const calObj = [
  {id:0, bg:colors[3],text:'AC', mode:0, op:0},
  {id:1, bg:colors[3],text:'+/-', mode:0, op:1},
  {id:2, bg:colors[3],text:'%', mode:0, op:2},
  {id:3, bg:colors[2],text:'/', mode:0, op:3},
  {id:4, bg:colors[4],text:'7', mode:1, op:-1},
  {id:5, bg:colors[4],text:'8', mode:1, op:-1},
  {id:6, bg:colors[4],text:'9', mode:1, op:-1},
  {id:7, bg:colors[2],text:'x', mode:0, op:4},
  {id:8, bg:colors[4],text:'4', mode:1, op:-1},
  {id:9, bg:colors[4],text:'5', mode:1, op:-1},
  {id:10, bg:colors[4],text:'6', mode:1, op:-1},
  {id:11, bg:colors[2],text:'-', mode:0, op:5},
  {id:12, bg:colors[4],text:'1', mode:1, op:-1},
  {id:13, bg:colors[4],text:'2', mode:1, op:-1},
  {id:14, bg:colors[4],text:'3', mode:1, op:-1},
  {id:15, bg:colors[2],text:'+', mode:0, op:6},
  {id:16, bg:colors[4],text:'0', mode:1, op:-1, case:1},
  {id:17, bg:colors[4],text:'.', mode:1, op:-1},
  {id:18, bg:colors[2],text:'=', mode:0, op:7}
]

const App = () => {
  const [value, setValue] = useState([]);
  const [result, setResult] = useState('');

  const handleData = (item) => {
   
    if(item.op == 0){
      setResult('');
      setValue([]);
    }else if(item.op != 7){
      let value_ = [...value];
      value_.push(item);
    
      setValue(value_);
      let result_ = result;
      result_ += item.text;
      setResult(value_.length == 1 ? item.text : result_);
    }else{
      if(value.length > 2 && item.id != 0){
        if(item.id == 1){
          Alert.alert('Math error');
          setResult('');
          setValue([]);
        }else{
          handleResult();
        }
       
      }else{
        Alert.alert('Kindly add two numbers to view the operation');
      }
    }
   
  }

  const handleResult = () => {
    var numbers = [];
    var exceptionalCase = 0;
    value.map(item => {
      if(item.id == 17){
        exceptionalCase = 1;
      } 
      numbers.push(item.text == 'x' ? '*' : item.text);
     
    });
    try{
      let outcome = eval(numbers.join(''));
      if(exceptionalCase == 1){
        outcome = outcome.toFixed(2);
      }
      exceptionalCase = 0;
      setResult(outcome);
      setValue([]);
    }catch(error){
      setResult('Math Error');
      setValue('');
    }
  
   
  }


  return(
    <View style={_.container}>
      <View style={_.resultContainer}>
        <Text style={_.resultText}>{result == '' ? 0 : result}</Text>
      </View>
      <View style={_.btnContainer}>
        {calObj.map((item,index) => {
          return(
            <TouchableOpacity
            key={index}
            onPress={() => handleData(item)}
            style={[_.btn,{backgroundColor:item.bg, width: item.case ? width/2 : width/4}]}>
              <Text style={[_.btnText,{color:item.op >= 3 ? colors[0] : colors[5]}]}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
       
      </View>
    </View>
  );
}

const _ = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors[1],
  },
  resultContainer:{
    height:height/3 - 30,
    padding:10,
    justifyContent:'flex-end'
  },
  btnContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  btn:{
    width:width/4,
    borderWidth:1/4,
    borderColor:colors[5],
    alignItems:'center',
    justifyContent:'center',
    height:(height - height/3 + 20)/5,
  },
  btnText:{
    textAlign:'center',
    fontSize:40,
    color:colors[5],
    fontFamily:fontFamily
  },
  resultText:{
    textAlign:'right',
    fontSize:100,
    color:colors[0],
    fontFamily:fontFamily
  }
})

export default App;