import styled from "styled-components";

export const WaveformContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  height: 310px;
  max-width: 378px;
  min-width: 250px;
  width: 100%;
  background: transparent;
`;

export const Wave = styled.div`
  width: 100%;
  height: 90px;
`;

export const PlayButton = styled.button`
  background: white;
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
