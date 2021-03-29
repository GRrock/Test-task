import { DISPATCHURL, GETDATA, ERROR } from "./const";

export const dispatchURL = (url) => ({
  type: DISPATCHURL,
  url: url,
  error: false
});

export const getData = (url) => {
  return async function (dispatch) {
    try {
      let response = await fetch('http://localhost:7000?url=' + url);
      if (response.ok) {
        response = await response.json()
        dispatch({
          type: GETDATA,
          data: response
        })

      } else {
        response = await response.json()
        alert('ERROR: uncorrect URL')
        dispatch({
          type: ERROR,
          error: true
        })
      }
    }
    catch (err) {
      dispatch({
        type: ERROR,
        error: true
      })
      alert('ERROR: uncorrect URL or server is not working');
    }
  }
}