import { supabase } from "/Javascript/database.js";

  const handleFileUpload = async (event) => {
    document.getElementById('productForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);

      const imageFile = formData.get('product_image');
      const userId = formData.get('product_seller_id');

      try {
          // Fetch the seller's information from the database
          const { data: sellerData, error: sellerError } = await supabase
              .from('Seller_Info')
              .select('seller_id')
              .eq('seller_id', userId)
              .single();

          if (sellerError) {
              throw sellerError;
          }

          if (!sellerData) {
              throw new Error('Seller not found');
          }

          const sellerId = sellerData.seller_id;

          // Upload the image to Supabase using the seller's ID as the folder name
          const { data, error } = await supabase.storage
              .from('product_images')
              .upload(sellerId + '/' + imageFile.name, imageFile);

          if (error) {
              throw error;
          }
          // Get the URL of the uploaded image
          const imageUrl = await supabase.storage
                    .from('product_images')
                    .createSignedUrl(sellerId + '/' + imageFile.name, 60);

                // Download the image (open in a new tab)
                console.log(imageUrl);

          // Download the image (open in a new tab)
          

          // After uploading the image, you can proceed to add other product details to the database
          console.log('Image uploaded successfully:', data);
          console.log(imageUrl.data.signedUrl);

          // Example: Add other product details to the database
          // const productName = formData.get('product_name');
          // const productCategory = formData.get('product_category');
          // const productDescription = formData.get('product_description');
          // const productPrice = formData.get('product_price');
          // const productSellerName = formData.get('product_seller_name');
          // const productInventoryAmount = formData.get('product_inventory_amount');
          
          // You can use this data to insert into your database

      } catch (error) {
          console.error('Error uploading image:', error.message);
      }
  });
  };

  handleFileUpload()