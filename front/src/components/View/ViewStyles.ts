import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-auto-rows: 140px;
  gap: 8px;
`;

export const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-auto-rows: 20px;
  gap: 4px;
`;

export const Cell = styled.div<{ isCurrent: boolean }>`
  padding: 4px;
  background-color: ${({ isCurrent }) => (isCurrent ? "#fff" : "#f5f5f560")};
  display: flex;
  flex-direction: column;
`;

export const DayViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;

export const TimelineHeader = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
  padding: 12px 16px;
  gap: 16px;
  align-items: center;
`;

export const DateInfo = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  flex: 1;
`;

export const HolidayBadge = styled.span`
  background: #fff3e0;
  color: #e65100;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const AddEventButton = styled.button`
  padding: 6px 14px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #1565c0;
  }
`;

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f5f5f5;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;

    &:hover {
      background: #999;
    }
  }
`;

