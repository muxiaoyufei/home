export function Request(url,binding, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "binding":binding
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (res.ok) {
        return res.json().then((json) => {
          return json;
        })
      } else {
        return {
          flag :"ERROR"
        }
      }
    })
    .catch((e) => {
      console.log("error");
      return{
        flag :"ERROR"
      }
    })
}