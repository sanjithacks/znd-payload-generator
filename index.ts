async function decryptData(
  encryptedData: string,
  encrptionKey: Uint8Array,
  iv: BufferSource
): Promise<string> {
  const enBuffSource = Buffer.from(encryptedData, "hex");

  // Import the AES-CBC key
  const key = await crypto.subtle.importKey(
    "raw",
    encrptionKey,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  // Decrypt the data
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    key,
    enBuffSource
  );

  // Convert the decrypted buffer to a string (assuming it's UTF-8 encoded)
  const decoder = new TextDecoder();
  const decryptedText = decoder.decode(decryptedBuffer);

  return decryptedText;
}

async function encryptAndConvert(
  payload: string,
  encrptionKey: Uint8Array,
  iv: BufferSource
): Promise<string> {
  // Import the AES-CBC key
  const key = await crypto.subtle.importKey(
    "raw",
    encrptionKey,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  // Convert payload to Uint8Array (TextEncoder)
  const encoder = new TextEncoder();
  const encodedPayload = encoder.encode(payload);

  // Encrypt the payload
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    key,
    encodedPayload
  );

  // Convert encrypted ArrayBuffer to hex string
  const encryptedHex = [...new Uint8Array(encryptedBuffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return encryptedHex;
}

// AES key in the form of a Uint8Array (must match the one used for encryption)
const aes_key = new Uint8Array([
  0x95, 0x1d, 0x6c, 0xc6, 0x39, 0x8c, 0x2d, 0xec, 0x45, 0xa4, 0xda, 0x7c, 0x36,
  0xc7, 0xe6, 0x8d,
]); // Fixed AES key

// Initialization vector (IV), the same one used during encryption (16-byte zero array)
const iv = new ArrayBuffer(16); // 16 bytes = 128 bits

// Usage
const payload = JSON.stringify({
  activity_id: "abcdefghi00",
  points: 440,
});
const encryptedData = await encryptAndConvert(payload, aes_key, iv);

const decryptedData = await decryptData(encryptedData, aes_key, iv);

console.log({
  encryptedData,
  decryptedData,
  encryptedDataLength: encryptedData.length,
});
