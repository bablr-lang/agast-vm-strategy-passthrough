import { buildCall } from '@bablr/agast-vm-helpers';

function* passthroughStrategy(tokens) {
  for (const token of tokens) {
    yield buildCall('advance', token);
  }
}

export const createPassthroughStrategy = (tokens) => {
  return () => passthroughStrategy(tokens);
};