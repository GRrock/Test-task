import React, {useState} from 'react';
import { connect } from 'react-redux';

const FormRequestData = () => {
    const [url, setUrl] = useState('');
    const handlerSubmit = event => {
        console.log(url)
    }

    return (
      <form onSubmit={handlerSubmit} className="formRequestData">   
      <input type='text' value={url} onChange={(event) =>{setUrl(event.target.value)}}/>
      <button onClick={handlerSubmit} value='Обновить данные'/>   
      </form>
    );
  }
export default connect(state => ({
    state: state 
}), {}) (FormRequestData)