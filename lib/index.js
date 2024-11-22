import { buildCall, buildExpression } from '@bablr/helpers/builders';

function* passthroughStrategy(tokens) {
  for (const token of tokens) {
    yield buildCall('advance', buildExpression(token));
  }
}

export const createPassthroughStrategy = (tokens) => {
  return () => passthroughStrategy(tokens);
};
