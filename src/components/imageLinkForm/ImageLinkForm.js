import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit, enterkeyPress}) => {
    return(
        <div>
            <p className="f3">
                {'This app detects faces in your picture. Give it a try!'}
            </p>
            <div className="center form pa3 br3 shadow-3">
                <input 
                    className='f4 pa2 w-70 center' 
                    type='text' 
                    placeholder="Enter image url" 
                    onKeyPress={enterkeyPress} 
                    onChange={onInputChange}/>
                <button 
                    className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
                    onClick={onSubmit}>
                    Detect </button>
            </div>
        </div>
    );
}
export default ImageLinkForm;