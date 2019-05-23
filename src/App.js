import React,{Component} from 'react';
import './App.css';
import axios from 'axios'; 

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      file: '',
      fileName: '',
    }
  }

  handleFileUpload = async (e) => {
    // const files = Array.from(e.target.files)
    const file = e.target.files[0];
    const nameOfFile= e.target.files[0].name;
    // const file = e.target.files[0];
    await this.setState({ 
        file: file,
        fileName:  nameOfFile
    }) 
    debugger; 
  }
  


getTicketIdForURl = async (id) => {
  let params = {
    fileName: this.state.fileName
  }
  let ticketId =  'trunpf201905202057433504d654-66e5-4e88-8f1d-3581dcbf1c5c';
  const API= `https://ry0fdjuey3.execute-api.us-east-1.amazonaws.com/api/ui/tickets/getpresignedurl/${ticketId}`
  let self = this; 
  
  await axios.post(API,ticketId,params).then( (result)=> {
    console.log(result)
    let url = result.data.url;
    let fields = result.data.fields; 
    self.sendFileToPresignedURLForS3(url, fields); 
  })

}

sendFileToPresignedURLForS3 =(url, fields) => {
    axios.post(url, fields, this.state.file).then( (result) => {
    console.log("result from presigned url",  result)
  })
  this.resetAllItems()
}

  render(){
    return (
      <div className="App">
           Hi Daniel! 
        <div> <input className="inputField" onChange={this.handleFileUpload}  type="file" multiple  name="fileUpload"/> </div> 
        <button onClick={this.getTicketIdForURl}> Submit </button> 
      </div>
    );
  }

}

export default App;
