const burgerOptions = [
    "McChicken",
    "Spicy McChicken",
    "McChicken Cheese",
    "Egg Cheeseburger",
    "Hamburger",
    "Cheeseburger",
    "Big Mac",
    "Chicken FiletO",
    "Shrimp FiletO",
    "Teriyaki McBurger",
    "Teriyaki ChickenFiletO"
];

const sidesOptions = ["Fries", "Nuggets"];

const drinksOptions = [
    "Coca Cola",
    "Coca-Cola Zero Sugar",
    "Sprite",
    "Vanilla Shake",
    "Strawberry Shake",
    "Chocolate Shake"
];

// Function to populate a dropdown with options
function populateDropdown(id, options) {
    const selectElement = document.getElementById(id);
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// Call the function to populate dropdowns
window.onload = function () {
    populateDropdown("burgerType", burgerOptions);
    populateDropdown("burgerSide", sidesOptions);
    populateDropdown("burgerShake", drinksOptions);
    populateDropdown("burgerItem", burgerOptions);
    populateDropdown("sidesItem", sidesOptions);
    populateDropdown("beverageItem", drinksOptions);
};