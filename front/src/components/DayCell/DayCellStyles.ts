import styled from "@emotion/styled";

export const Container = styled.div<{
  isCurrent: boolean;
  isSelected?: boolean;
  isDayView?: boolean;
}>`
  position: relative;
  min-height: 120px;
  padding: 12px 8px 8px;
  background: ${({ isSelected, isCurrent }) => {
    if (isSelected) return "#ffffff";
    return isCurrent ? "#ffffff" : "#f8f9fa";
  }};
  border: 2px solid
    ${({ isSelected }) => (isSelected ? "#2196f3" : "transparent")};
  border-radius: 12px;
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? "0 4px 12px rgba(33, 150, 243, 0.2)"
      : "0 2px 4px rgba(0, 0, 0, 0.05)"};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: ${({ isDayView }) => (isDayView ? "default" : "pointer")};
  width: ${({ isDayView }) => (isDayView ? "100%" : "auto")};
  overflow: auto;

  &:hover {
    box-shadow: ${({ isSelected }) =>
      isSelected
        ? "0 6px 16px rgba(33, 150, 243, 0.25)"
        : "0 4px 12px rgba(0, 0, 0, 0.1)"};
    transform: ${({ isDayView }) => (isDayView ? "none" : "translateY(-1px)")};
  }
`;

export const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const DayNumber = styled.span<{
  isSelected?: boolean;
  isCurrent: boolean;
}>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ isSelected, isCurrent }) => {
    if (isSelected) return "#2196f3";
    return isCurrent ? "#2c3e50" : "#95a5a6";
  }};
`;

export const HolidayName = styled.span<{ isSelected?: boolean }>`
  font-size: 0.7rem;
  color: ${({ isSelected }) => (isSelected ? "#1976d2" : "#e67e22")};
  background: ${({ isSelected }) => (isSelected ? "#e3f2fd" : "#fff3e0")};
  padding: 2px 8px;
  border-radius: 12px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #b0bec5;
    border-radius: 8px;
  }
`;

export const EventCount = styled.div<{ isSelected?: boolean }>`
  font-size: 0.7rem;
  color: ${({ isSelected }) => (isSelected ? "#1976d2" : "#7f8c8d")};
  background: ${({ isSelected }) => (isSelected ? "#e3f2fd" : "#f0f2f5")};
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-block;
  align-self: flex-start;
`;
