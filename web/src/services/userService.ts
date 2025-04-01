const baseURL = import.meta.env.VITE_BASE_URL;
import { NewUser } from "@/types";
import { arrayBufferToBase64 } from "@/utils/utils";

import {
  generateSalt,
  deriveKeyFromPass,
  generateMasterKey,
  encryptMasterKey,
  verifyEncryptionPassword
} from "@/utils/cryptography"

const login = async (data: object) => {
  const response = await fetch(`${baseURL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const jsonRes = await response.json();
  return jsonRes;
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
