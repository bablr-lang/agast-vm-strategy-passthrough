import { buildCall, buildExpression } from '@bablr/agast-vm-helpers';

function* passthroughStrategy(tokens) {
  for (const token of tokens) {
    yield buildCall('advance', buildExpression(token));
  }
}

export const createPassthroughStrategy = (tokens) => {
  return () => passthroughStrategy(tokens);
};
