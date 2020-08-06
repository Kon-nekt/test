const fs = require('fs');
let previousTime = [];
module.exports = class averageTime {
  constructor(time) {
    this.time = time;
    this.writeTime(time);
  }

  writeTime(time) {
    //Считываем информацию о предыдущих запросах
    fs.readFile('./time.json', 'utf8', (err, timeString) => {
      if (err) {
        console.log('Fail:', err);
        return;
      }
      if (timeString) previousTime = timeString.split`,`.map(Number);
      previousTime.push(time);
      fs.writeFile('./time.json', previousTime.slice(-5), (err) => {
        if (err) console.log('Fail:', err);
      });
    });
  }

  //Вывод информации о среднем времени
  static readTime() {
    fs.readFile('./time.json', 'utf8', (err, timeString) => {
      if (err) {
        console.log('Fail:', err);
      }
      let average = timeString.split`,`.map(Number);
      console.log(
        'Среднее время пяти последних запросов: ',
        average.reduce((a, b) => a + b) / average.length
      );
    });
  }
};
