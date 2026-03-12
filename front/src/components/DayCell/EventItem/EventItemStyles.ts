import styled from "@emotion/styled";

export const Container = styled.div<{ compact?: boolean; inDayView?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 4px 6px;
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
  cursor: grab;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 640px) {
    padding: 3px 6px;
    border-radius: 6px;
    min-height: ${({ compact }) => (compact ? "24px" : "auto")};
  }
`;

export const Title = styled.span<{ compact?: boolean }>`
  flex: 1;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #1976d2;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  padding: 2px 4px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(25, 118, 210, 0.1);
  }

  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    font-size: 0.8rem;
    gap: 1px;
    padding: 3px 6px;
  }

  & > span {
    overflow: hidden;
    white-space: inherit;
    text-overflow: inherit;
  }
`;

export const TimeInfo = styled.span`
  font-size: 0.7rem;
  color: #666;
  font-weight: 500;

  @media (max-width: 640px) {
    font-size: 0.65rem;
  }
`;

export const Button = styled.button<{ $isMobile?: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f44336;
  transition: all 0.2s ease;
  flex-shrink: 0;
  border-radius: 4px;

  &:hover {
    color: #d32f2f;
    background-color: rgba(244, 67, 54, 0.1);
    transform: scale(1.1);
  }

  &:active {
    color: #b71c1c;
    transform: scale(0.95);
  }

  @media (max-width: 640px) {
    padding: 6px;
    border-radius: 6px;
  }
`;
