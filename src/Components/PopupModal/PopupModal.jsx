import React from 'react';
import "./PopupModal.scss"
const PopupModal=({closePopup,popupText})=>{
  return(
    <div className='modal'>
    <div className="modal-content" >
       <div className="container">
       <h3>Warning </h3>
       <p>{popupText}</p>
         <div className="clearFix">
           <button className="close" type="button" onClick={closePopup}>Close</button>
           
         </div>
       </div>
     </div>
     </div>
  )
}
export default PopupModal;
