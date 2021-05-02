const API_URL = "http://0.0.0.0:5000";

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

  const res = await fetch(`${API_URL}/process`, requestOptions)
  const data = await res.json();
  return data;
}

export const stop = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const res = await fetch(`${API_URL}/stop`, requestOptions)
  const data = await res.text();
  return data;
}