import React from "react";
import '../style/style.css'
export const Meme = ({ templates, onClick }) => {
  return (
    
    <img
      style={{ width: 200 }}
      key={templates.id}
      src={templates.url}
      alt={templates.name}
      onClick={onClick}
      class="imageCss"
    />
   
  );
};