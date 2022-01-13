import React from 'react';
import './App.css';
import Navigation from '../components/navigation/Navigation';
import SignIn from '../components/signIn/SignIn';
import Register from '../components/register/Register';
import Logo from '../components/logo/Logo';
import Rank from '../components/rank/Rank';
import ImageLinkForm from '../components/imageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/faceRecognition/FaceRecognition';
import Particles from "react-tsparticles";
import Clarifai from 'clarifai'

const clarifaiApp = new Clarifai.App({
  apiKey: 'theapikey'
 });

const particlesOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.5,
          size: 40,
        },
        repulse: {
          distance: 100,
          duration: 1,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        speed: 2,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 120,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "square",
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
}

const initialState = {
  route: 'signin',   //tracks what page we are on
  inputLink : '',    //input text link
  imageUrl : '',     //for showing image
  box: {},           //for blue box in image
  signedIn : false,  //tracks if the user is signed in
  user: {            //for details of user
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  onRouteChange = (routeValue) => {
    //updating signed in state
    if(routeValue === "home") {
      this.setState({signedIn: true});
    }
    else {
      this.setState(initialState);
    }
    //changing page
    this.setState({route: routeValue});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; //gets boundingBox from API 
    const image = document.getElementById('inputimage');
    
    const width = Number(image.width);
    const height = Number(image.height);

    return{
      //calculating the box using 'maths'
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    //updating box state
    this.setState({box: box});
  }

  onInputChange = (event) => {
    //changes inputLink to input entered in textbox
    this.setState({inputLink: event.target.value})
  }

  onSubmit = () => {
    //changees imageUrl to inputLink (for displaying image)
    this.setState({imageUrl : this.state.inputLink})
    //using API
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.inputLink)
    .then(response => {
      if(response){
        fetch('server/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    },
      err => console.log(err)
    );
  }

  enterkeyPress = (event) => {
    if(event.key === "Enter") { // if enter key is pressed
      this.onSubmit();
    }
  }

  render() {
    const {signedIn, route, box, imageUrl, user} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn = {signedIn} onRouteChange = {this.onRouteChange}/>
        
        { route === 'home' 
          ? <div>
            <Particles id="tsparticles" options={particlesOptions}/>
            <Logo/>
            <Rank name = {user.name} entries = {user.entries}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit} enterkeyPress={this.enterkeyPress}/>
            <FaceRecognition box = {box} imageUrl = {imageUrl}/>
            </div>
          : ( route === 'signin'
            ? <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
            : <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/> )
        }
      </div>
    );
  }
}
export default App;
