const text = 'This is a test message and it should be stored in a file';

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('message.txt', data).then(() => {
  console.log('Successfully wrote to file!');
});
