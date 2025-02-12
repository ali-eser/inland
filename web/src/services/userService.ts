const baseURL = import.meta.env.VITE_BASE_URL

const login = async (data: object) => {
  console.log("baseurl: ", baseURL);
  const response = await fetch(`${baseURL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const jsonRes = await response.json();
  return jsonRes;
}

const signUp = async (data: object) => {
  const response = await fetch(`${baseURL}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const jsonRes = await response.json();
  return jsonRes;
}

export default { login, signUp }