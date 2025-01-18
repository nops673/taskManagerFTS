import '@testing-library/jest-dom';
import 'jest-canvas-mock';

window.ResizeObserver = class ResizeObserver {
  observe(): void { return; }
  unobserve(): void { return; }
  disconnect(): void { return; }
}
