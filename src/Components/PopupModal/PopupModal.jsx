import React from 'react';
import "./PopupModal.css"
const PopupModal=({closePopup})=>{
  return(
    <div className='modal'>
    <div className="modal-content" >
       <div className="container">
       <h3>Warning </h3>
       <p>Please provide a name & description not in the list</p>
         <div className="clearFix">
           <button className="close" type="button" onClick={closePopup}>Close</button>
           
         </div>
       </div>
     </div>
     </div>
  )
}
export default PopupModal;
