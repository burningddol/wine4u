"use client";

import { Range, getTrackBackground } from "react-range";

interface Props {
  min?: number;
  max?: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
}

export const MIN_PRICE = 0;
export const MAX_PRICE = 100_000;
const STEP = 1_000;

export default function PriceRangeSlider({
  min = MIN_PRICE,
  max = MAX_PRICE,
  minValue,
  maxValue,
  onChange,
}: Props) {
  return (
    <section>
      <h3 className="mb-3 text-lg font-bold">가격</h3>
      <div className="mb-4 flex justify-between text-lg text-gray-800">
        <span> {minValue.toLocaleString()} ₩</span>
        <span> {maxValue.toLocaleString()} ₩</span>
      </div>

      <Range
        step={STEP}
        min={min}
        max={max}
        values={[minValue, maxValue]}
        onChange={([newMin, newMax]) => onChange(newMin, newMax)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="flex h-6 w-full"
            style={props.style}
          >
            <div
              ref={props.ref}
              className="h-1 w-full self-center rounded-full"
              style={{
                background: getTrackBackground({
                  values: [minValue, maxValue],
                  colors: ["#eceef1", "#16171a", "#eceef1"],
                  min,
                  max,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            className="h-4 w-4 rounded-full bg-white shadow-md outline-none"
            style={props.style}
          />
        )}
      />
    </section>
  );
}
