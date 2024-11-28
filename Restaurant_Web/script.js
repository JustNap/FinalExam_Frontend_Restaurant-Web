const categoriesList = document.getElementById('categories-list');

async function loadCategories() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();

        data.categories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-item');

            categoryItem.innerHTML = `
                <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                <h3>${category.strCategory}</h3>
                <p>${category.strCategoryDescription.substring(0, 100)}...</p>
            `;

            categoriesList.appendChild(categoryItem);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

window.onload = loadCategories;
