import React, { useState } from 'react';
import { connect } from 'react-redux';
import { dispatchURL } from '../../modules/actions'

const FormRequestData = (props) => {
  const [url, setUrl] = useState('');
  const handlerSubmit = event => {
    event.preventDefault()

    props.dispatchURL(url.trim());
  }

  return (
    <div className='container'>
      <form onSubmit={handlerSubmit} className="formRequestData">
        <input className='urlInput' type='text' value={url} onChange={(event) => { setUrl(event.target.value) }} />
        <button className='submitButton' onClick={handlerSubmit}> Обновить данные </button>
      </form>
    </div>
  );
}
export default connect(state => state, { dispatchURL })(FormRequestData)