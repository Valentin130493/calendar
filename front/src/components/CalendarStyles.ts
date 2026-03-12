import styled from "@emotion/styled";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  gap: 16px;
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
  background: #f0f0f0;
  padding: 4px;
  border-radius: 6px;
`;

export const ViewButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  background: ${({ active }) => (active ? "#1976d2" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#333")};

  &:hover {
    background: ${({ active }) => (active ? "#1565c0" : "#e0e0e0")};
  }
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const NavButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #f5f5f5;
  }
`;

export const LoadingOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #999;
  font-size: 1rem;
  letter-spacing: 0.02em;
`;

export const FetchingBar = styled.div`
  height: 3px;
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%);
  background-size: 200% 100%;
  border-radius: 2px;
  animation: slide 1.2s linear infinite;

  @keyframes slide {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }
`;
