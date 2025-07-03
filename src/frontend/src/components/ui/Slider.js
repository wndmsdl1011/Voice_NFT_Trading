import React from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
`;

const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
`;

const SliderRange = styled.div`
  position: absolute;
  height: 100%;
  background: linear-gradient(135deg, #10b981, #0891b2);
  border-radius: 3px;
  transition: width 0.2s ease;
`;

const SliderThumb = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #10b981, #0891b2);
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translateX(-50%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
  }

  &:active {
    transform: translateX(-50%) scale(0.95);
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  margin: 0;
`;

function Slider({
  value = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
}) {
  const currentValue = Array.isArray(value) ? value[0] : value;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (onValueChange) {
      onValueChange([newValue]);
    }
  };

  return (
    <SliderContainer className={className}>
      <SliderTrack>
        <SliderRange style={{ width: `${percentage}%` }} />
      </SliderTrack>
      <SliderThumb style={{ left: `${percentage}%` }} />
      <HiddenInput
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
      />
    </SliderContainer>
  );
}

export default Slider;
