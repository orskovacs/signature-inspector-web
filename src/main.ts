import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/radio/radio.js';
import '@material/web/dialog/dialog.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/tabs/primary-tab.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
} from '@material/material-color-utilities';
import 'signature-field/signature-field.js';
// import '../../signature-field/dist/src/signature-field.js';
import './style.css'

function applyCustomTheme() {
  if (typescaleStyles.styleSheet)
    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);

  const theme = themeFromSourceColor(argbFromHex('#f82506'), [
    {
      name: 'custom-1',
      value: argbFromHex('#ff0000'),
      blend: true,
    },
  ]);

  const systemDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  applyTheme(theme, { target: document.body, dark: systemDarkMedia.matches });

  systemDarkMedia.addEventListener('change', () => {
    applyTheme(theme, { target: document.body, dark: systemDarkMedia.matches });
  });
}

window.addEventListener('load', () => {
  applyCustomTheme();
});

document.querySelectorAll('#date-here').forEach(e => {
  e.innerHTML = new Date(Date.now()).toLocaleString();
});

function drawLineColors() {
  const data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Dogs');
  data.addColumn('number', 'Cats');

  data.addRows([
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
    [8, 33, 25],
    [9, 40, 32],
    [10, 32, 24],
    [11, 35, 27],
    [12, 30, 22],
    [13, 40, 32],
    [14, 42, 34],
    [15, 47, 39],
    [16, 44, 36],
    [17, 48, 40],
    [18, 52, 44],
    [19, 54, 46],
    [20, 42, 34],
    [21, 55, 47],
    [22, 56, 48],
    [23, 57, 49],
    [24, 60, 52],
    [25, 50, 42],
    [26, 52, 44],
    [27, 51, 43],
    [28, 49, 41],
    [29, 53, 45],
    [30, 55, 47],
    [31, 60, 52],
    [32, 61, 53],
    [33, 59, 51],
    [34, 62, 54],
    [35, 65, 57],
    [36, 62, 54],
    [37, 58, 50],
    [38, 55, 47],
    [39, 61, 53],
    [40, 64, 56],
    [41, 65, 57],
    [42, 63, 55],
    [43, 66, 58],
    [44, 67, 59],
    [45, 69, 61],
    [46, 69, 61],
    [47, 70, 62],
    [48, 72, 64],
    [49, 68, 60],
    [50, 66, 58],
    [51, 65, 57],
    [52, 67, 59],
    [53, 70, 62],
    [54, 71, 63],
    [55, 72, 64],
    [56, 73, 65],
    [57, 75, 67],
    [58, 70, 62],
    [59, 68, 60],
    [60, 64, 56],
    [61, 60, 52],
    [62, 65, 57],
    [63, 67, 59],
    [64, 68, 60],
    [65, 69, 61],
    [66, 70, 62],
    [67, 72, 64],
    [68, 75, 67],
    [69, 80, 72],
  ]);

  const options = {
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Value',
    },
    colors: ['#a52714', '#097138'],
  };

  const chartDiv = document.getElementById('chart_div');

  if (chartDiv) {
    const chart = new google.visualization.LineChart(chartDiv);
    chart.draw(data, options);
  }
}

google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawLineColors);
