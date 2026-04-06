// Jest setup for jsdom environment

// Mock canvas API (jsdom doesn't implement it fully)
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
  shadowColor: '',
  shadowBlur: 0,
  font: '',
  textAlign: '',
  textBaseline: '',
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  closePath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  quadraticCurveTo: jest.fn(),
  bezierCurveTo: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  fillText: jest.fn(),
  drawImage: jest.fn(),
  createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
}));

HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/png;base64,mock');
HTMLCanvasElement.prototype.toBlob    = jest.fn((cb) => cb(new Blob(['mock'], { type: 'image/png' })));

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    write:     jest.fn(() => Promise.resolve()),
    writeText: jest.fn(() => Promise.resolve()),
  },
  writable: true,
});

// Mock QRCodeStyling (CDN library)
global.QRCodeStyling = jest.fn().mockImplementation(() => ({
  append: jest.fn(),
  update: jest.fn(),
  getRawData: jest.fn(() => Promise.resolve(new Blob(['mock'], { type: 'image/png' }))),
  _canvas: document.createElement('canvas'),
}));

// Suppress console.error in tests unless you want to see them
global.console.error = jest.fn();
