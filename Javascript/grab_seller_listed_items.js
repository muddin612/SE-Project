// Function to fetch seller's items from Supabase
async function fetchSellerItems() {
    const { data, error } = await supabase
      .from('seller_items')
      .select('item_name, description')
      .order('created_at', { ascending: false });
  
    if (error) {
      console.error('Error fetching seller items:', error.message);
      return [];
    }
  
    return data || [];
  }
  
  // Function to inject seller's items into HTML
  async function injectSellerItems() {
    const currentListingsSection = document.getElementById('currentListings');
    const pastDueListingsSection = document.getElementById('pastDueListings');
  
    // Fetch seller's items
    const sellerItems = await fetchSellerItems();
  
    // Clear existing content
    currentListingsSection.innerHTML = '';
    pastDueListingsSection.innerHTML = '';
  
    // Inject items into HTML
    sellerItems.forEach(item => {
      const cardHtml = `
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">${item.item_name}</h5>
              <p class="card-text">${item.description}</p>
            </div>
          </div>
        </div>
      `;
      
      if (item.past_due) {
        pastDueListingsSection.innerHTML += cardHtml;
      } else {
        currentListingsSection.innerHTML += cardHtml;
      }
    });
  }
  
  // Call the function to inject seller's items into HTML
  injectSellerItems();