const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'travel-plans.db');

console.log('데이터베이스 파일 경로:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err.message);
    return;
  }
  console.log('SQLite 데이터베이스에 연결되었습니다.\n');
});

// 테이블 목록 조회
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error('테이블 조회 실패:', err.message);
    return;
  }
  
  console.log('=== 테이블 목록 ===');
  tables.forEach(table => {
    console.log(`- ${table.name}`);
  });
  console.log('');
  
  // 각 테이블의 데이터 조회
  tables.forEach(table => {
    if (table.name.startsWith('sqlite_')) return; // 시스템 테이블 제외
    
    console.log(`=== ${table.name} 테이블 ===`);
    db.all(`SELECT * FROM ${table.name}`, (err, rows) => {
      if (err) {
        console.error(`${table.name} 조회 실패:`, err.message);
        return;
      }
      
      if (rows.length === 0) {
        console.log('데이터가 없습니다.\n');
      } else {
        console.log(`총 ${rows.length}개의 레코드:`);
        rows.forEach((row, index) => {
          console.log(`${index + 1}:`, JSON.stringify(row, null, 2));
        });
        console.log('');
      }
    });
  });
});

// 연결 종료
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error('데이터베이스 연결 종료 실패:', err.message);
    } else {
      console.log('데이터베이스 연결이 종료되었습니다.');
    }
  });
}, 2000);