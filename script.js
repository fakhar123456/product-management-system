document.getElementById('addProduct').addEventListener('click', addProduct);
document.getElementById('clearForm').addEventListener('click', clearForm);
document.getElementById('searchName').addEventListener('input', searchProduct);

let products = JSON.parse(localStorage.getItem('products')) || [];

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;
    const productCondition = document.getElementById('productCondition').value;

    if (productName && productPrice) {
        products.push({
            name: productName,
            price: productPrice,
            category: productCategory,
            condition: productCondition
        });

        saveToLocalStorage();
        renderProductList();
        clearForm();
    } else {
        alert('Please fill in all fields.');
    }
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = 'FOOD';
    document.getElementById('productCondition').value = 'Good';
}

function renderProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const row = createTableRow(product, index);
        productList.appendChild(row);
    });
}

function createTableRow(product, index) {
    const row = document.createElement('tr');

    const indexCell = document.createElement('td');
    indexCell.textContent = index + 1;

    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;

    const priceCell = document.createElement('td');
    priceCell.textContent = product.price;

    const categoryCell = document.createElement('td');
    categoryCell.textContent = product.category;

    const conditionCell = document.createElement('td');
    conditionCell.textContent = product.condition;

    const actionsCell = document.createElement('td');

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => updateProduct(index));
    actionsCell.appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteProduct(index));
    actionsCell.appendChild(deleteButton);

    row.appendChild(indexCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(categoryCell);
    row.appendChild(conditionCell);
    row.appendChild(actionsCell);

    return row;
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveToLocalStorage();
    renderProductList();
}

function updateProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productCondition').value = product.condition;

    document.getElementById('addProduct').textContent = 'Update Product';
    document.getElementById('addProduct').removeEventListener('click', addProduct);
    document.getElementById('addProduct').addEventListener('click', () => {
        saveUpdatedProduct(index);
        document.getElementById('addProduct').textContent = 'Add Product';
        document.getElementById('addProduct').removeEventListener('click', () => saveUpdatedProduct(index));
        document.getElementById('addProduct').addEventListener('click', addProduct);
    });
}

function saveUpdatedProduct(index) {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;
    const productCondition = document.getElementById('productCondition').value;

    products[index] = {
        name: productName,
        price: productPrice,
        category: productCategory,
        condition: productCondition
    };

    saveToLocalStorage();
    renderProductList();
    clearForm();
}

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function searchProduct() {
    const searchValue = document.getElementById('searchName').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchValue)
    );

    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    filteredProducts.forEach((product, index) => {
        const row = createTableRow(product, index);
        productList.appendChild(row);
    });
}

// Initial render
renderProductList();
