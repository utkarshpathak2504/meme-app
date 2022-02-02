import React, { useState, useEffect } from "react";

import "../src/style/style.css";
import "./App.css"
import { Meme } from "./components/Meme";

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function App() {
  const [memeTemplates, setMemeTemplates] = useState([]);
  const [templates, setTemplates] = useState(null);
  const [topImageText, setTopImageText] = useState("");
  const [bottomImageText, setBottomImageText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((e) =>
      e.json().then((response) => setMemeTemplates(response.data.memes))
    );
    
  }, []);

  if (meme) {
    return (
      <div  class="templateImage" >
        <h1 style={{padding:'2% 0 2% 0',textAlign:'center' }}>Your Funny MEME</h1>
        <img  src={meme} alt="custom meme" class="imageCss"  />
      </div>
    );
  }
  return (
    <div className="App">
     {templates!=null?
        <h1 style={{margin:'0',padding:'2% 0 2% 0' }}>Make A MEME</h1>
     
     : <h1 style={{margin:'0',padding:'2% 0 2% 0' }}>Pick A Template</h1>}
      <div class="imageContainer">
   
        {templates &&
           
         (
        
          <form 
            onSubmit={async (e) =>  {
              e.preventDefault();
              e.preventDefault();
              // add logic to create meme from api
              const params = {
                template_id: templates.id,
                text0: topImageText,
                text1: bottomImageText,
                username: process.env.REACT_APP_IMGFLIP_USERNAME,
                password: process.env.REACT_APP_IMGFLIP_PASSWORD 
                // username:'buzzlightyear25',
                // password:'meme@123'
              };
              const response = await fetch(
                `https://api.imgflip.com/caption_image${objectToQueryParam(
                  params
                )}`
              );
              const json = await response.json();
              console.log(json)
              setMeme(json.data.url);
            
            }}
          >
         <Meme templates={templates} />
           
         <div class="form">
            <input placeholder="Top Text" value={topImageText} onChange={e=>{setTopImageText(e.target.value)}} class="inputBox"/>
            <input placeholder="Bottom Text" value={bottomImageText} onChange={e=>{setBottomImageText(e.target.value)}} class="inputBox"/>
            <button type="submit" class="submitButton" >create meme</button>
            </div>
          </form>
          
        )
       
        }
      
    
        {!templates && (
          <>
           
            {memeTemplates.map((templates) => {
              return (
                <Meme
                  templates={templates}
                  onClick={() => {
                    setTemplates(templates);
                  }}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
