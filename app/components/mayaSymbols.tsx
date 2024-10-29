const mayanNumeralSymbols: Record<number, string> = {
  1: '\u{1D2E1}',  // Mayan numeral for 1
  2: '\u{1D2E2}',  // Mayan numeral for 2
  3: '\u{1D2E3}',  // Mayan numeral for 3
  4: '\u{1D2E4}',  // Mayan numeral for 4
  5: '\u{1D2E5}',  // Mayan numeral for 5
  6: '\u{1D2E6}',  // Mayan numeral for 6
  7: '\u{1D2E7}',  // Mayan numeral for 7
  8: '\u{1D2E8}',  // Mayan numeral for 8
  9: '\u{1D2E9}',  // Mayan numeral for 9
  10: '\u{1D2EA}', // Mayan numeral for 10
  11: '\u{1D2EB}', // Mayan numeral for 11
  12: '\u{1D2EC}', // Mayan numeral for 12
  13: '\u{1D2ED}', // Mayan numeral for 13
};

export const getMayaSymbol = (number: number) => {
  const mayanSymbol = mayanNumeralSymbols[number] || '';

  return (
    <div style={{ fontFamily: "var(--font-mayan-numerals)", fontSize: '20px', textAlign: 'center' }}>
      {mayanSymbol}
    </div>
  );
};