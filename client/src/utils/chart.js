import Chart from 'chart.js/auto';

export const generateGroupedBarChart = (ctx, labels, datasets) => {
  // destroy the existing chart if it exists
  if (ctx.chart) {
    ctx.chart.destroy();
  }

  // create the new chart
  ctx.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'rgba(75, 85, 99, 1)', // gray-700
            callback: function (value) {
              return '$' + value; // Add a '$' symbol to the tick label
            },
          },
          grid: {
            color: 'rgba(229, 231, 235, 1)', // gray-200
          }
        },
        x: {
          ticks: {
            color: 'rgba(75, 85, 99, 1)', // gray-700
          },
          grid: {
            color: 'rgba(229, 231, 235, 1)', // gray-200
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(75, 85, 99, 1)', // gray-700
          }
        }
      }
    },
  });

  // return the chart instance
  return ctx.chart;
};

export const generateLineChart = (ctx, labels, datasets) => {
  // destroy the existing chart if it exists
  if (ctx.chart) {
    ctx.chart.destroy();
  }

  // create the new line chart
  ctx.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return '$' + value; // Add a '$' symbol to the tick label
            },
          },
        },
      },
    },
  });

  // return the chart instance
  return ctx.chart;
};