const schedule = document.querySelector('.schedule');
const firstDataCell = document.querySelector('.color-cell');

createPromotionsButtons(2);

// TMP
deleteBorderFromLastRow();

fetch("/data.json").then(res => res.json()).then(
  data => {
    const { topics } = data;
    
    topics.forEach(({label, abbrev, saturday}, index) => {
      const topicTitleCell = document.createElement('div');
      topicTitleCell.className = 'topic';
      topicTitleCell.innerHTML = label.replace(' ', '<br>');

      schedule.insertBefore(topicTitleCell, firstDataCell);

      if (index >= topics.length-1) {
        topicTitleCell.style.borderBottom = "2px solid black";
      }

      const topicRow = document.createElement('div');
      topicRow.className = `color-cell ${abbrev}`;
      console.log(topicRow);

      // buildCellsForThursday(topicRow, thursday);
      buildCellsForSaturday(topicRow, saturday);

      schedule.appendChild(topicRow);

// <div class="color-cell at">
//   <!-- Jeudi -->
//   <!-- <div><span class="a3 a3-s2"></span></div>
//   <div><span class="a3 a3-s2"></span></div>
//   <div><span class="a1 a1-s1 a1-s3"></span></div>
//   <div><span class="a1 a1-s1 a1-s3"></span></div> -->
//   <!-- Samedi -->
//   <div><span class=""></span></div>
//   <div><span class=""></span></div>
//   <div><span class="a3 a3-s1"></span></div>
//   <div><span class="a3 a3-s1"></span></div>
// </div>
    });

    document.body.classList.add('appears');
  }
).catch(console.log);

function createPromotionsButtons(nb) {
  for (let promo = 1; promo <= nb; promo++) {
    for (let week = 1; week <= 4; week++) {
      const promoBt = document.createElement('input');

      promoBt.readOnly = true;
      promoBt.className = `control-a${promo}-s${week}`;
      promoBt.value = `A${promo} S${week}`;

      document.body.insertBefore(promoBt, schedule);
    }
  }
}

function deleteBorderFromLastRow() {
  const lastRow = document.querySelectorAll('.color-cell');
}

function buildCellsForSaturday(row, sat) {
  for (let hour = 1; hour <= 4; hour++) {
    const cell = document.createElement('div');
    cell.innerHTML = `<span class="${sat[hour-1]}"></span>`;
    row.appendChild(cell);
  }
}