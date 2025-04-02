const baseURL = import.meta.env.VITE_BASE_URL;
import { NewUser } from "@/types";
import { arrayBufferToBase64 } from "@/utils/utils";

import {
  generateSalt,
  deriveKeyFromPass,
  generateMasterKey,
  encryptMasterKey,
  decryptMasterKey,
  verifyEncryptionPassword
} from "@/utils/cryptography"

const login = async (password: string, username: string) => {
  try {
    const response = await fetch(`${baseURL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password, username: username })
    });

    if (!response.ok) {
      const errorJson = await response.json();
      return { error: errorJson.message || 'Login failed' };
    }

    const jsonRes = await response.json();
    const derivedKey: CryptoKey = await deriveKeyFromPass(password, jsonRes.keyDerivationSalt);
    const masterKey: CryptoKey = await decryptMasterKey(jsonRes.encryptedMasterKey, derivedKey);

    window.localStorage.setItem("loggedUser", jsonRes.user);
    window.localStorage.setItem("loggedUserID", (jsonRes.id).toString());

    return { user: jsonRes.user, id: jsonRes.id, masterKey: masterKey };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred during login' }
  }
}

const signUp = async (data: NewUser) => { 
  const salt = await generateSalt();
  const derivedKey: CryptoKey = await deriveKeyFromPass(data.password, arrayBufferToBase64(salt));
  const masterKey: CryptoKey = await generateMasterKey();
  const encryptedMasterKey: string = await encryptMasterKey(masterKey, derivedKey);
  console.log(await verifyEncryptionPassword(
    data.password,
    encryptedMasterKey,
    arrayBufferToBase64(salt)
  ));

  const userToAdd = {
    ...data,
    keyDerivationSalt: arrayBufferToBase64(salt),
    encryptedMasterKey: encryptedMasterKey
  };
  console.log(userToAdd);

  const response = await fetch(`${baseURL}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userToAdd)
  });

  const jsonRes = await response.json();
  return jsonRes;
}

export default { login, signUp };
