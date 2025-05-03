import React, { useState, useEffect } from "react";

interface DebouncedInputProps {
  delay: number;
  value: string;
  setValue: (value: string) => void;
  onDebouncedChange: (value: string) => void;
}

function DebouncedInput({ delay = 500, onDebouncedChange, value }: DebouncedInputProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Введіть текст..."
    />
  );
}