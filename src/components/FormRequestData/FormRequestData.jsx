import React, { useState } from 'react';
import { connect } from 'react-redux';
import { dispatchURL } from '../../modules/actions'

// Компонент формы
// После ввода URL в текстовое поле и нажатия кнопки / Enter
// отправляет данные в глабальный state

const FormRequestData = (props) => {
  const [url, setUrl] = useState('');
  const handlerSubmit = event => {
    event.preventDefault()
    props.dispatchURL(url.trim());
  }

  return (
    <div className='container'>
      <form onSubmit={handlerSubmit} className="formRequestData">
        <input className='urlInput' placeholder='Введите URL' type='text' value={url} onChange={(event) => { setUrl(event.target.value) }} />
        <button className='submitButton' onClick={handlerSubmit}> Обновить данные </button>
      </form>
    </div>
  );
}
export default connect(state => state, { dispatchURL })(FormRequestData)