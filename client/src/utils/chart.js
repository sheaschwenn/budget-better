import Chart from 'chart.js/auto';

export const generateExpensePieChart = (ctx, expenses) => {
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: expenses.map((expense) => expense.category),
      datasets: [
        {
          data: expenses.map((expense) => expense.amount),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            // Add more colors as needed
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      // Add other options and styling as desired
    },
  });
};