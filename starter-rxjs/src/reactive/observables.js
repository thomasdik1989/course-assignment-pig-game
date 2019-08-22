import { startWith, distinctUntilChanged, timeInterval, map } from 'rxjs/operators';
import { fromEvent, interval, merge } from 'rxjs';

const TICKER_INTERVAL = 1000;

const loop = interval(TICKER_INTERVAL).pipe(
  timeInterval(),
  map((timeInterval) => ({
    deltaTime: timeInterval.interval / 1000
  }))
);

const input = merge(
  fromEvent(document, 'mousedown'),
  fromEvent(document, 'touchstart'),
).pipe(
  startWith(false),
  distinctUntilChanged()
);

export { loop, input };
