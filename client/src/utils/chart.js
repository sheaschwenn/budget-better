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
        },
      },
    },
  });

  // return the chart instance
  return ctx.chart;
};