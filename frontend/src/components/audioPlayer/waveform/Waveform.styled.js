import styled from "styled-components";

export const WaveformContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const Wave = styled.div`
  width: 100%;
  height: 80px;
  overflow: hidden;
`;

export const PlayButton = styled.button`
  background: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
