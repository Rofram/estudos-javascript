import readline from 'node:readline'

export function log(message) {
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(message);
}

export async function makeRequest(data) {
  const request = await fetch("http://localhost:3000", {
    body: data,
    headers: {
      'Content-Type': "application/json",
    },
    method: "POST",
  });

  return request.status;
}