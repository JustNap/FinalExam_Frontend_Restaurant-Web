document.addEventListener("DOMContentLoaded", async () => {
    const menuGrid = document.getElementById("menuGrid");

    const fetchCategories = async () => {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();
        return data.categories || [];
    };

    const renderMenu = async () => {
        const categories = await fetchCategories();
        menuGrid.innerHTML = categories
            .map(
                (cat) => `
                <div class="meal">
                    <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
                    <h3>${cat.strCategory}</h3>
                </div>
            `
            )
            .join("");
    };

    renderMenu();
});
