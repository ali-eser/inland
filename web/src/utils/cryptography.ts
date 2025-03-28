export const generateSalt = async () => {
  return crypto.getRandomValues(new Uint8Array(16)).buffer;
}

export const deriveKeyFromPass = async (pass: string, salt: ArrayBuffer, iterations: number = 100000) => {
  const textEncoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(pass),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA_256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export const encryptText = async (text: string, key: CryptoKey) => {
  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(text);
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    data
  );

  const encryptedData = new Uint8Array(iv.byteLength + ciphertext.byteLength);
  encryptedData.set(new Uint8Array(iv), 0);
  encryptedData.set(new Uint8Array(ciphertext), iv.byteLength);
  return encryptedData.buffer;
}

export const decryptText = async (encryptedData: ArrayBuffer, key: CryptoKey) => {
  const iv = encryptedData.slice(0, 16);
  const ciphertext = encryptedData.slice(16);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    ciphertext
  );
  const textDecoder = new TextDecoder();
  return textDecoder.decode(decrypted);
}

export const verifyEncryptionPassword = async (
  password: string,
  encryptedTestString: ArrayBuffer,
  salt: ArrayBuffer,
  originalTestString: string
) => {
  try {
    const derivedKey: CryptoKey = await deriveKeyFromPass(password, salt);
    const decrypted: string = await decryptText(encryptedTestString, derivedKey);
    return decrypted === originalTestString;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
