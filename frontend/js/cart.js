//them vao gio hang

var cart = JSON.parse(localStorage.getItem("cart"));
// var checkout_items = document.querySelector("#checkout_items");
// checkout_items.innerHTML = cart.length;
var container = document.querySelector(".show-cart");

result = cart.map((item) => {

    var format = item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    var sale3 = (parseInt(item.price) * parseInt(item.sale) / 100)
    var new_price = parseInt(item.price) - sale3
    var new_format = String(new_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `
        <div class="products">
            <div class="title-product content-product">
                <img src="${item.img}" alt="" width="50px">
                <p>${item.product_name}</p>
            </div>
            <div class="title-price product-price">
                <div class="product_price">${new_format} <br> <del>${format}</del></div>
            </div>
            <div class="title-quantity title-quantity2">
                <div class="choose-quantity">
                    <button id="subtract" type="button">-</button>
                    <input type="number" value="1" id="input">
                    <button id="add" type="button">+</button>
                </div>
            </div>
            <div class="title-total" style="font-weight:bold">
                 
                <div style="cursor: pointer; margin-left:100px; font-size:25px; color:red;"><i data-id=${item.id} class="fa-solid fa-xmark close"></i></div>
            </div>
        </div>
        `;
}).join("");


container.innerHTML = result;
var cancel = document.querySelectorAll('.close');
cancel.forEach((btn) => {
    btn.onclick = () => {
        var id = btn.dataset.id;
        result = cart.filter((item) => {
            if (item.id != id) {
                return item.id;
            }
        });
        localStorage.setItem("cart", JSON.stringify(result));
    }
});