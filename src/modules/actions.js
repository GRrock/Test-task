import { DISPATCHURL, GETDATA } from "./const";

export const dispatchURL = (url) => ({
  type: DISPATCHURL,
  url: url
});

export const getData = (url) => {
  return async function (dispatch) {
    try {
      let response = await fetch('http://localhost:5000?url=' + url);
      if (response.ok) {
        response = await response.json()

        dispatch({
          type: GETDATA,
          data: response
        })

      } else {
        alert('Check URL')
      }
    }
    catch (err) {
      console.log(err)
    }
  }
}