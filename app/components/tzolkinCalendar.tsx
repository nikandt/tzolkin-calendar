import React from 'react';
import { getMayaSymbol } from './mayaSymbols';

const greyCells = new Set([
  1, 20, 22, 39, 43, 50, 51, 58, 64, 69, 72, 77, 85, 88, 93, 96, 106, 107, 108, 109, 110, 111, 112, 113, 114, 
  115, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 165, 168, 173, 176, 184, 189, 192, 197, 203, 210, 211, 
  218, 222, 239, 241, 260
]);

const m_images = [
  '200x200_r300_jpg_1_lohikaarme.jpg',       // 1
  '200x200_r300_jpg_2_tuuli.jpg',            // 2
  '200x200_r300_jpg_3_yo.jpg',               // 3
  '200x200_r300_jpg_4_siemen.jpg',           // 4
  '200x200_r300_jpg_5_kaarme.jpg',           // 5
  '200x200_r300_jpg_6_maailmojen_sillanrakentaja.jpg', // 6
  '200x200_r300_jpg_7_kasi.jpg',             // 7
  '200x200_r300_jpg_8_tahti.jpg',            // 8
  '200x200_r300_jpg_9_kuu.jpg',              // 9
  '200x200_r300_jpg_10_koira.jpg',           // 10
  '200x200_r300_jpg_11_apina.jpg',           // 11
  '200x200_r300_jpg_12_ihminen.jpg',         // 12
  '200x200_r300_jpg_13_taivaanvaeltaja.jpg', // 13
  '200x200_r300_jpg_14_taikuri.jpg',         // 14
  '200x200_r300_jpg_15_kotka.jpg',           // 15
  '200x200_r300_jpg_16_soturi.jpg',          // 16
  '200x200_r300_jpg_17_maa.jpg',             // 17
  '200x200_r300_jpg_18_peili.jpg',           // 18
  '200x200_r300_jpg_19_myrsky.jpg',          // 19
  '200x200_r300_jpg_20_aurinko.jpg'          // 20
];


const lunarCells: Set<number> = new Set ([]);

type TzolkinCalendarProps = {
  dateRange: { start: string; end: string };
};

const TzolkinCalendar: React.FC<TzolkinCalendarProps> = ({ dateRange }) => {

  const generateDates = () => {
    const startDate = new Date(dateRange.start.split(".").reverse().join("-"));
    const endDate = new Date(dateRange.end.split(".").reverse().join("-"));
    const dates = Array(260).fill(null);
    const currentDate = startDate;
  
    for (let col = 0; col < 13; col++) {
      for (let row = 0; row < 20; row++) {
        if (currentDate > endDate) break;
  
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear()).slice(-2);
        
        const isLeapDay = currentDate.getMonth() === 1 && currentDate.getDate() === 28 &&
                          new Date(currentDate.getFullYear(), 1, 29).getMonth() === 1;
  
        if (isLeapDay) {
          dates[row * 13 + col] = `${day}-${String(day + 1)}.${month}.${year}`;
          currentDate.setDate(currentDate.getDate() + 1);
        } else {
          dates[row * 13 + col] = `${day}.${month}.${year}`;
        }
        

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  
    return dates;
  };
  
  const dates = generateDates();

  const generateNumbers = (): number[] => {
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

  const numbers: number[] = generateNumbers();

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
        gridTemplateColumns: 'repeat(14, 1fr)', 
        gridTemplateRows: 'repeat(20, 1fr)',
        gap: '4px',
      }}
    >
    {Array.from({ length: 20 }).map((_, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {/* Extra column cell with wave sequence image */}
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
              <img
                src={`/jpg/${m_images[rowIndex]}`} // Access image based on row index
                alt={`Wave ${rowIndex + 1}`}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
        </div>
          {/* Main Tzolk'in calendar cells */}
          {dates.slice(rowIndex * 13, rowIndex * 13 + 13).map((date, index) => {
            const cellIndex = rowIndex * 13 + index;
            return (
              <div
                key={`cell-${cellIndex}`}
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default TzolkinCalendar;
