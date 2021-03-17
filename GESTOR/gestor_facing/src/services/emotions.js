export const getEmotion = async (msg) => {
  if (msg === '')
    return null

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({ msg });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const res = await fetch("http://localhost:5000/process", requestOptions)
  const data = await res.json();
  return data;
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
}