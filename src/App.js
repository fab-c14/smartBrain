import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg'
import Clarifai,{FACE_DETECT_MODEL} from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';

import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

//You must add your own API key here from Clarifai
const app = new Clarifai.App({
 apiKey:'25081218e2ef4b818d5d2f8bb51566e9'
});

class App extends Component{
 constructor(){
 super();
 this.state = {
  input:"",
  imageUrl:"",
  box:{}// contains values we received
 }
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
 	rightCol: width - (clarifaiFace.right_col * width),
 	bottomRow: height - (clarifaiFace.bottom_row * height),
 };
}

 displayFaceBox = (box)=>{
	console.log(box);
 	this.setState({box:box});
 }

 onInputChange = (event)=>{

 	this.setState({input:event.target.value});
 }

onButtonSubmit = () => {
  // Set the imageUrl state to the input value
  this.setState({ imageUrl: this.state.input });

  app.models
    .predict('face-detection',this.state.input)
    .then(response => {
      // Handle the response here, which should contain face detection data
      console.log(response);
      // Display the face bounding box
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(error => {
      // Handle any errors here, including the "Method not allowed" error
      console.log(error);
    });
}

 render(){
   return(
    <div className="App">
    <Navigation/>
    <Logo />
    <Rank />
    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
    <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
    {/*
     // before we start big part
     1.This is going to be hard.
     2.the project works
     3.follow my method.
     4.Grpc
     5.Modelid.

    */}

    </div>
   )
 }
}

export default App;
