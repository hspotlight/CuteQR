'use strict';

const { FRAME_DRAWERS, roundedRect, drawHeart } = require('../public/frame-drawers');
const { PRESETS } = require('../public/presets');

// ===== roundedRect =====

describe('roundedRect', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      beginPath:        jest.fn(),
      moveTo:           jest.fn(),
      lineTo:           jest.fn(),
      quadraticCurveTo: jest.fn(),
      closePath:        jest.fn(),
    };
  });

  test('calls beginPath', () => {
    roundedRect(ctx, 0, 0, 100, 100, 10);
    expect(ctx.beginPath).toHaveBeenCalledTimes(1);
  });

  test('calls closePath', () => {
    roundedRect(ctx, 0, 0, 100, 100, 10);
    expect(ctx.closePath).toHaveBeenCalledTimes(1);
  });

  test('calls moveTo once for the start point', () => {
    roundedRect(ctx, 0, 0, 100, 100, 10);
    expect(ctx.moveTo).toHaveBeenCalledTimes(1);
  });

  test('calls quadraticCurveTo four times (one per corner)', () => {
    roundedRect(ctx, 0, 0, 100, 100, 10);
    expect(ctx.quadraticCurveTo).toHaveBeenCalledTimes(4);
  });
});

// ===== drawHeart =====

describe('drawHeart', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      beginPath:     jest.fn(),
      moveTo:        jest.fn(),
      bezierCurveTo: jest.fn(),
      closePath:     jest.fn(),
    };
  });

  test('calls beginPath', () => {
    drawHeart(ctx, 50, 50, 20);
    expect(ctx.beginPath).toHaveBeenCalled();
  });

  test('calls bezierCurveTo four times', () => {
    drawHeart(ctx, 50, 50, 20);
    expect(ctx.bezierCurveTo).toHaveBeenCalledTimes(4);
  });

  test('calls closePath', () => {
    drawHeart(ctx, 50, 50, 20);
    expect(ctx.closePath).toHaveBeenCalled();
  });
});

// ===== FRAME_DRAWERS =====

describe('FRAME_DRAWERS', () => {
  test('has a drawer for every preset key', () => {
    const presetKeys = Object.keys(PRESETS);
    const drawerKeys = Object.keys(FRAME_DRAWERS);
    expect(drawerKeys).toEqual(presetKeys);
  });

  test('every drawer is a function', () => {
    Object.values(FRAME_DRAWERS).forEach(fn => {
      expect(typeof fn).toBe('function');
    });
  });
});
