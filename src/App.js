import React from 'react';
import Titles from './components/titles.js';
import Form from './components/form.js';
import Weather from './components/weather.js';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

class App extends React.Component{
constructor(props){
  super(props);
  this.state = {
  result:[],
  temperature: undefined,
  city: undefined,
  country: undefined,
  humidity: undefined,
  description: undefined,
  errormsg: '',
  error:false,
  style:{background: '#0a2333',height:'100vh'}
}
}
//method to get the weather
getWeather = async (e) => {

  e.preventDefault();
  const Api_Key='a1c2256332b2d277b39984f085cbf988';
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  console.log("inside getweather");
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${Api_Key}`);
//http://api.openweathermap.org/data/2.5/forecast?q=chennai&appid=a1c2256332b2d277b39984f085cbf988
  const response = await api_call.json();
  this.setState({result:response.list,error:false,style:{background: '#0a2333',height:'100%'}})
  const result = response.list;
  console.log(result);
  result.map(item => {

    if(city && country){
      this.setState({
        temperature: item.main.temp,
        city: city,
        country: country,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        errormsg:""
      })
    }else{
        this.setState({
        errormsg: "Please enter the values...",
        // error:true,
        // style:{background: '#0a2333',height:'100%'},
        // result:undefined
    })
  }
  })


}
   render(){

    if(!this.state.error && this.state.result!=undefined)
    {
      return(

  <div className="container-fluid">

      <div className="row">

       <div className="col-lg-12" style={this.state.style}>

          <div>
            <h1 className="title">Weather App</h1>
            <p className="subTitle">Get to know the weather in a single click!!!</p>
          </div>

          <div className="updatedFormContainer">
            <center>
            <Form loadWeather={this.getWeather} />
            </center>
          </div>

          <div>
            <center>
            <Table celled  style={{width:'70%'}}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell style={{color:'white'}}>Location</Table.HeaderCell>
                    <Table.HeaderCell style={{color:'white'}}>Temperature</Table.HeaderCell>
                    <Table.HeaderCell style={{color:'white'}}>Humidity</Table.HeaderCell>
                    <Table.HeaderCell style={{color:'white'}}>Conditions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>


                <Table.Body>

                  {this.state.result.map((item,index) => (
                    <Table.Row>
                      <Table.Cell style={{color:'white'}}>{this.state.city}</Table.Cell>
                      <Table.Cell style={{color:'white'}}>{item.main.temp}</Table.Cell>
                      <Table.Cell style={{color:'white'}}>{item.main.humidity}</Table.Cell>
                      <Table.Cell style={{color:'white'}}>{item.weather[0].description}</Table.Cell>
                    </Table.Row>
                  ))}

                </Table.Body>
            </Table>

            </center>
          </div>

       </div>
      </div>
  </div>

     )
    }
else {
  return(

<div className="container-fluid">

  <div className="row">

   <div className="col-lg-12" style={this.state.style}>

      <div>
        <h1 className="title">Weather App</h1>
        <p className="subTitle">Get to know the weather in a single click!!!</p>
      </div>

      <div className="updatedFormContainer">
        <center>
        <Form loadWeather={this.getWeather} />
        </center>
      </div>

      <div>
        <center>
        <h4>{this.state.errormsg}</h4>

        </center>
      </div>

   </div>
  </div>
</div>

 )
}

  }
}
export default App;
