import React from 'react';
import { getMayaSymbol } from './mayaSymbols';

const greyCells = new Set([
  1, 20, 22, 39, 43, 50, 51, 58, 64, 69, 72, 77, 85, 88, 93, 96, 106, 107, 108, 109, 110, 111, 112, 113, 114, 
  115, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 165, 168, 173, 176, 184, 189, 192, 197, 203, 210, 211, 
  218, 222, 239, 241, 260
]);

const lunarCells = new Set ([]);

const TzolkinCalendar: React.FC = () => {

  const generateDates = () => {
    const startDate = new Date(2024, 6, 8);
    const endDate = new Date(2025, 2, 24);
    const dates = Array(260).fill(null);
    let currentDate = startDate;

    for (let col = 0; col < 13; col++) {
      for (let row = 0; row < 20; row++) {
        if (currentDate > endDate) break;

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear()).slice(-2);
        dates[row * 13 + col] = `${day}.${month}.${year}`;
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return dates;
  };
  const dates = generateDates();

  const generateNumbers = () => {
    const numbers = Array(260).fill(null);
    let count = 1;

    for (let col = 0; col < 13; col++) {
      for (let row = 0; row < 20; row++) {
        numbers[row * 13 + col] = count;
        count += 1;
      }
    }

    return numbers;
  };

  const numbers = generateNumbers();

  const generateMayaNumbers = () => {
    const mayaNumbers = Array(260).fill(null);

    for (let col = 0; col < 13; col++) {
      for (let row = 0; row < 20; row++) {
        const mayaNumber = ((col * 7 + row) % 13) + 1;
        mayaNumbers[row * 13 + col] = mayaNumber;
      }
    }

    return mayaNumbers;
  };
  const mayaNumbers = generateMayaNumbers();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(14, 1fr)', // Include extra column
        gridTemplateRows: 'repeat(20, 1fr)',
        gap: '4px',
      }}
    >
      {/* Render each row with an empty cell followed by the main cells */}
      {Array.from({ length: 20 }).map((_, rowIndex) => (
        <>
          {/* Empty cell for the extra column */}
          <div
            key={`extra-${rowIndex}`}
            style={{
              border: '1px solid #ccc',
              height: '70px',
              width: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
            }}
          >
            {/* Placeholder for Maya period symbols */}
          </div>

          {/* Render main cells for each row */}
          {dates.slice(rowIndex * 13, rowIndex * 13 + 13).map((date, index) => {
            const cellIndex = rowIndex * 13 + index;
            return (
              <div
                key={cellIndex}
                style={{
                  border: '1px solid #ccc',
                  padding: '8px',
                  height: '70px',
                  width: '70px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  backgroundColor: greyCells.has(numbers[cellIndex]) ? 'lightgrey' : 'transparent',
                  position: 'relative',
                }}
              >
                <div style={{ textAlign: 'center' }}>{date}</div>
                <div style={{ textAlign: 'center', fontSize: '14px' }}>
                  {getMayaSymbol(mayaNumbers[cellIndex])}
                </div>
                <div style={{ textAlign: 'center' }}>{numbers[cellIndex]}</div>

                {lunarCells.has(numbers[cellIndex]) && (
                  <div style={{ position: 'absolute', bottom: '4px', left: '4px', fontSize: '14px' }}>
                    ●
                  </div>
                )}
              </div>
            );
          })}
        </>
      ))}
    </div>
  );
};

export default TzolkinCalendar;
