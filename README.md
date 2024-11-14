# ZND Payload Generator

Generate Payload For ZND Airdrop App

## Usage

First call the start_activity endpoint to get 'activity_id'

Example:

```json
{
  "activity_id": "abcdefgc000"
}
```

Encrypt Data:

```ts
const payload = JSON.stringify({
  activity_id: "abcdefgc000", //activity_id
  points: 440, //points to claim, 😅 must emulate play behavior to avoid detction
});
const encryptedData = await encryptAndConvert(payload, aes_key, iv); //return the encypted payload
```
