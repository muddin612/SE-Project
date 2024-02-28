import { supabase } from "/Javascript/database.js";

document.addEventListener('DOMContentLoaded', () => {
    //const supabaseUrl = 'https://your-supabase-url.supabase.co';
    //const supabaseKey = 'your-supabase-api-key';
    //const supabase = Supabase.createClient(supabaseUrl, supabaseKey);
    const tableName = 'your_table';
  
    supabase
      .from(tableName)
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
          return;
        }
  
        const revenueAmount = data.length > 0 ? data[0].revenue : 0;
        const expensesAmount = data.length > 0 ? data[0].expenses : 0;
        const profitAmount = revenueAmount - expensesAmount;
        const customersCount = data.length > 0 ? data[0].customers : 0;
        const productsCount = data.length > 0 ? data[0].products : 0;
        const avgTransactionAmount = data.length > 0 ? data[0].avg_transaction : 0;
  
        document.getElementById('revenueAmount').textContent = `$${revenueAmount}`;
        document.getElementById('expensesAmount').textContent = `$${expensesAmount}`;
        document.getElementById('profitAmount').textContent = `$${profitAmount}`;
        document.getElementById('customersCount').textContent = customersCount;
        document.getElementById('productsCount').textContent = productsCount;
        document.getElementById('avgTransactionAmount').textContent = `$${avgTransactionAmount.toFixed(2)}`;
      })
      .catch(error => console.error('Error connecting to Supabase:', error.message));
  });
  