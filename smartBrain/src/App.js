import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: '25081218e2ef4b818d5d2f8bb51566e9',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin', // when app loads, route should be sign in
      isSignedIn:false,
      user:{
        id:125,
        name:'',
        email:'',
        entries:0,
        joined: ''
      }
    };
  }
  loadUser = (data)=>{
    console.log(data.id)
    this.setState({
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    })
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    // Set the imageUrl state to the input value
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict('face-detection', this.state.input)
      .then((response) => {
     
        if(response){
          fetch('https://3000-fabc14-smartbrain-869wclgw977.ws-us107.gitpod.io/image',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
          })
          }).then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((error) => {
        // Handle any errors here, including the "Method not allowed" error
        console.log(error);
      });
  };

  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState({isSignedIn:false})
    }
    else if (route==='home'){
      this.setState({isSignedIn:true})
    }

    this.setState({ route: route });
  };

  render() {
    const {isSignedIn,imageUrl,route,box} = this.state;
    return (
  
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        {
        route === 'home' ? (
          <div>
            <Navigation isSignedIn={isSignedIn} onRouteChange={() => this.onRouteChange('signin')} />
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
        ) :(
              route === 'register' ? (
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
            ) : (
              <SignIn onRouteChange={this.onRouteChange} />
            )
          )
        }
      </div>
    );
  }
}

export default App;
