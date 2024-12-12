async function searchProduct() {
  // Get input values
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  let url = document.getElementById('productUrl').value;
  
  // Ajuste a URL, caso tenha parâmetros
  url = adjustUrl(url);

  // Make the API request
  const response = await fetch(`http://localhost:3000/api/products/search?name=${name}&price=${price}&url=${encodeURIComponent(url)}`);
  const data = await response.json();

  // Check if the product is found
  if (data.error) {
    alert(data.error);  // Handle error if product is not found
    return;
  }

  // Exibir os detalhes do produto
  document.getElementById('productNameDisplay').textContent = `Name: ${data.name}`;
  document.getElementById('productPriceDisplay').textContent = `Price: $${data.price}`;
  document.getElementById('productUrlDisplay').href = data.url;
  document.getElementById('productUrlDisplay').textContent = data.url;

  // Mostrar o histórico de preços
  const priceHistoryList = document.getElementById('priceHistory');
  priceHistoryList.innerHTML = '';  // Limpa o histórico anterior

  data.priceHistory.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.date}: $${item.price}`;
    priceHistoryList.appendChild(listItem);
  });

  // Mostrar a div com os detalhes do produto
  document.getElementById('productDetails').style.display = 'block';
}
