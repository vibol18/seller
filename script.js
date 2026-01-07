let cart = [];
let grandTotal = 0;

/* ADD PRODUCT */
function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const qty = Number(document.getElementById("qty").value);

  if (!name || price <= 0 || qty <= 0) {
    alert("Please enter valid product info");
    return;
  }

  const total = price * qty;
  grandTotal += total;
  cart.push({ name, price, qty, total });

  renderTable();
  updateTotal();
  clearInput();
}

/* TABLE */
function renderTable() {
  const body = document.getElementById("tableBody");
  body.innerHTML = "";
  cart.forEach(item => {
    body.innerHTML += `
      <tr class="text-center">
        <td class="border p-2">${item.name}</td>
        <td class="border p-2">$${item.price}</td>
        <td class="border p-2">${item.qty}</td>
        <td class="border p-2">$${item.total.toFixed(2)}</td>
      </tr>
    `;
  });
}

/* SEARCH */
function searchProduct() {
  const keyword = document.getElementById("search").value.toLowerCase();
  renderTable();
  if (!keyword) return;

  const body = document.getElementById("tableBody");
  body.innerHTML = "";
  cart.filter(p => p.name.toLowerCase().includes(keyword))
      .forEach(item => {
        body.innerHTML += `
          <tr class="text-center">
            <td class="border p-2">${item.name}</td>
            <td class="border p-2">$${item.price}</td>
            <td class="border p-2">${item.qty}</td>
            <td class="border p-2">$${item.total.toFixed(2)}</td>
          </tr>
        `;
      });
}

/* TOTAL */
function updateTotal() {
  document.getElementById("grandTotal").innerText =
    `Grand Total: $${grandTotal.toFixed(2)}`;
}

/* CLEAR */
function clearInput() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
}

/* SHOW RECEIPT */
function showReceipt() {
  if (cart.length === 0) {
    alert("No items in cart");
    return;
  }

  document.getElementById("receipt").classList.remove("hidden");
  document.getElementById("receiptDate").innerText =
    new Date().toLocaleString();

  const body = document.getElementById("receiptBody");
  body.innerHTML = "";

  cart.forEach(item => {
    body.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td class="text-center">${item.qty}</td>
        <td class="text-right">$${item.total.toFixed(2)}</td>
      </tr>
    `;
  });

  document.getElementById("receiptTotal").innerText =
    grandTotal.toFixed(2);
}

/* HIDE RECEIPT */
function hideReceipt() {
  document.getElementById("receipt").classList.add("hidden");
}