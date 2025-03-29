import { base64toArrayBuffer } from "./utils";

export const generateSalt = async () => {
  return crypto.getRandomValues(new Uint8Array(16)).buffer;
}

export const generateMasterKey = async (): Promise<CryptoKey> => {
  try {
    const key = await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  } catch (error) {
    console.error('Failed to generate master key', error);
    throw new Error(`Failed to generate master key: ${error}`);
  }
}

export const encryptMasterKey = async (masterKey: CryptoKey, derivedKey: CryptoKey) => {
  const exportedMasterKey = await crypto.subtle.exportKey('raw', masterKey);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encryptedMasterKey = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    derivedKey,
    exportedMasterKey,
  );

  const encryptedMasterData = new Uint8Array(
    iv.byteLength + encryptedMasterKey.byteLength
  );

  encryptedMasterData.set(iv, 0);
  encryptedMasterData.set(new Uint8Array(encryptedMasterKey), iv.byteLength);

  return window.btoa(String.fromCharCode.apply(null, Array.from(encryptedMasterData)));
}

export const decryptMasterKey = async (base64MasterKey: string, derivedKey: CryptoKey) => {
  const encryptedData = base64toArrayBuffer(base64MasterKey);

  const iv = encryptedData.slice(0, 16);
  const encryptedKey = encryptedData.slice(16);

  const decryptedMasterKey = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    derivedKey,
    encryptedKey
  );

  return await crypto.subtle.importKey(
    'raw',
    decryptedMasterKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

export const deriveKeyFromPass = async (pass: string, salt: string, iterations: number = 100000) => {
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
      salt: base64toArrayBuffer(salt),
      iterations,
      hash: 'SHA-256'
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

export const decryptText = async (encryptedData: string, key: CryptoKey) => {
  const encryptedBuffer = base64toArrayBuffer(encryptedData);

  const iv: ArrayBuffer = encryptedBuffer.slice(0, 16);
  const ciphertext: ArrayBuffer = encryptedBuffer.slice(16);

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
  base64MasterKey: string,
  salt: string
) => {
  try {
    const derivedKey: CryptoKey = await deriveKeyFromPass(password, salt);
    await decryptMasterKey(base64MasterKey, derivedKey);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
