import React, {useState} from 'react';
import { connect } from 'react-redux';
import {dispatchURL} from '../../modules/actions'

const FormRequestData = (props) => {
    const [url, setUrl] = useState('');
    const handlerSubmit = event => {
      event.preventDefault()
      props.dispatchURL(url);
    }

    return (
      <form onSubmit={handlerSubmit} className="formRequestData">   
      <input type='text' value={url} onChange={(event) =>{setUrl(event.target.value)}}/>
      <button className ='submitButton' onClick={handlerSubmit}> Обновить данные </button> 
      </form>
    );
  }
export default connect(state =>  state, {dispatchURL}) (FormRequestData)