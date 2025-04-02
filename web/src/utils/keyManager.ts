let masterKey: CryptoKey | null = null;

const setMasterKey = (key: CryptoKey): void => {
  masterKey = key;
}

const getMasterKey = (): CryptoKey | null => {
  return masterKey;
}

const clearMasterKey = (): void => {
  masterKey = null;
}

export default { setMasterKey, getMasterKey, clearMasterKey };
