import { buildCall, buildEmbeddedTag } from '@bablr/agast-helpers/builders';
import { getStreamIterator, StreamIterable } from '@bablr/agast-helpers/stream';
import { Coroutine } from '@bablr/coroutine';

function* __passthroughStrategy(ctx, s, tokens) {
  const co = new Coroutine(getStreamIterator(tokens));

  for (;;) {
    co.advance();

    if (co.current instanceof Promise) {
      co.current = yield co.current;
    }

    if (co.done) break;

    const token = co.value;

    yield buildCall('advance', buildEmbeddedTag(token));
  }

  return s.node;
}

export const createPassthroughStrategy = (tokens) => {
  return (ctx, s) => new StreamIterable(__passthroughStrategy(ctx, s, tokens));
};
