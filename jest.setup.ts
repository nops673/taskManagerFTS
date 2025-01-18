Object.defineProperty(global, 'TextEncoder', {
  value: class TextEncoder {
    encode(text: string) {
      return Buffer.from(text);
    }
  }
});

Object.defineProperty(global, 'TextDecoder', {
  value: class TextDecoder {
    decode(buffer: Buffer) {
      return buffer.toString();
    }
  }
});

export { };

