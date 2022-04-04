// let params = new URLSearchParams(document.location.search);

option = {
    url: 'http://localhost:3000/categoris',
    method: "get",
    responeType: "json",
}
axios(option)
    .then(function(data_res) {
        list = data_res.data;

        list2 = ''

        str_li = "";
        // console.log(page);
        var cate = list.map(function(item) {
            return `   <div class="input-checkbox">
            <input type="checkbox" id="category-5">
            <label for="category-5">
                    <span></span>
                  
                    <h5>  ${item.cate_name}</h5>
                </label>
        </div>`;
        }).join('');
        document.querySelector(".checkbox-filter").innerHTML = cate




    })
    .catch(function(err) {
        console.log(err);
    })

store = {
    url: 'http://localhost:3000/products?_expand=categori',
    method: "get",
    responeType: "json",
}


axios(store)
    .then(function(data_res) {
        list = data_res.data;
        var store = list.map(function(item) {
            const format = item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            var sale3 = (parseInt(item.price) * parseInt(item.sale) / 100)

            var new_price = parseInt(item.price) - sale3

            const new_format = String(new_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')




            return `<div class="col-md-4 col-xs-6">
            <div class="product">
                <div class="product-img">
                    <img src="${item.img}" alt="">
                    <div class="product-label">
                        <span class="sale">${item.sale}%</span>
                        <span class="new">NEW</span>
                    </div>
                </div>
                <div class="product-body">
                    <p class="product-category">${item.categori.cate_name}</p>
                    <h3 class="product-name"><a href="#">product name goes here</a></h3>
                    <h4 class="product-price">  ${new_format}<del class="product-old-price">${format}</del></h4>
                    <div class="product-rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <div class="product-btns">
                    <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">go to shop</span></button>
                    <button class="quick-view"><i class="fa fa-eye"></i><a href = "/frontend/product.html?id=${item.id}" class="tooltipp"> chi tiết </a></button>
                    </div>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                </div>
            </div>
        </div>`;
        }).join('');
        document.querySelector("#products_store").innerHTML = store




    })
    .catch(function(err) {
        console.log(err);
    })