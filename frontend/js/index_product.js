option = {
    url: 'http://localhost:3000/products?_expand=categori',
    method: "get",
    responeType: "json",
}

axios(option)
    .then(function(data_res) {
        list = data_res.data;
        // console.log(page);
        var product = list.map(function(item) {
            const format = item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            var sale3 = (parseInt(item.price) * parseInt(item.sale) / 100)
            var new_price = parseInt(item.price) - sale3
            var new_format = String(new_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            return `
            <!-- product -->
            <div class="product">
                <div class="product-img">
                    <img src="${item.img}" alt="">
                    <div class="product-label">
                        <span class="sale">${item.sale}%</span>
                    </div>
                </div>
                <div class="product-body">
                    <p class="product-category">${item.categori.cate_name}</p>
                    <h3 class="product-name"><a href="#">${item.product_name}</a></h3>
                    <h4 class="product-price">${format}Vnd  </h4>
                    <del> ${ item.sale ? new_format : '' } </del>
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
                    <button class="add-to-cart-btn"  >  <i class="fa fa-shopping-cart"></i> <a class="click_cart" data-id=${item.id}>add to cart</a> </button>
                </div>
            </div>
            <!-- /product -->
            `;
        }).join('');
        document.querySelector(".products-slick").innerHTML = product

        var cart = document.querySelectorAll(".click_cart");
        var cart2 = JSON.parse(localStorage.getItem("cart"));
        if (cart2 == null) {
            cart2 = [];
            console.log(cart2);
        }
        cart.forEach((btn) => {
            btn.onclick = (e) => {
                e.preventDefault();
                var id = btn.dataset.id;
                axios({
                    method: "get",
                    url: "http://localhost:3000/products/" + id,
                    responseType: "json"
                }).then(function({ data }) {
                    arr = [{
                        id: data.id,
                        name: data.product_name,
                        price: data.price,
                        sale: data.sale,
                        img: data.img,
                        qty: 1
                    }]
                    cart2.push(arr);
                    localStorage.setItem("cart", JSON.stringify(cart2));
                })
            }
        });





        //delete the products
        let btn_del = document.querySelectorAll('.btn_del');
        btn_del.forEach(function(item) {
            item.onclick = function() {
                product_id = item.dataset.id
                axios.delete(' http://localhost:3000/products/' + product_id);
            }
        });

        //create the products
        let add_cate = document.querySelector('#sup_product');
        add_cate.onclick = function(e) {
            e.preventDefault();
            const data_product = {
                categoriId: document.querySelector('#product-category').value,
                product_name: document.querySelector('#product-name').value,
                img: document.querySelector('#product-img').value,
                price: document.querySelector('#product-price').value,
                sale: document.querySelector('#product-sale').value,
                color: document.querySelector('#product-color').value,
                desc: document.querySelector('#product-desc').value
            }



            axios({
                method: 'post',
                url: 'http://localhost:3000/products',
                data: data_product
            });
        }









        let edit = document.querySelectorAll('.btn_edit');
        edit.forEach(function(item) {
            item.onclick = function() {
                cate_id = item.dataset.id
                axios({
                    method: 'get',
                    url: 'http://localhost:3000/products/' + cate_id,
                    responseType: 'json'
                }).then(function(data) {
                    document.querySelector('#edit-name').value = data.data.product_name
                    document.querySelector('#edit-img').value = data.data.img
                    document.querySelector('#edit-price').value = data.data.price
                    document.querySelector('#edit-sale').value = data.data.sale
                    document.querySelector('#edit-color').value = data.data.color
                    document.querySelector('#edit-desc').value = data.data.desc
                    document.querySelector('#edit-id').value = data.data.id

                    var id_cate = data.data.categoriId

                    axios({
                        method: 'GET',
                        url: 'http://localhost:3000/categoris',
                        responseType: 'json'
                    }).then(function(cate) {
                        list = cate.data;
                        // console.log(page);
                        var product = list.map(function(item) {
                            return `<option value="${item.id}" ${item.id== id_cate ? 'selected': '' }  > ${item.cate_name} </option>`;
                        }).join('');
                        document.querySelector("#edit-category").innerHTML = product

                    })

                })


            }


        });




        //edit data category 
        let add_edit = document.querySelector('#edit_product');
        add_edit.onclick = function(e) {
            e.preventDefault();
            cate_i = document.querySelector('#edit-id').value;
            const edit_product = {
                categoriId: document.querySelector('#edit-category').value,
                product_name: document.querySelector('#edit-name').value,
                img: document.querySelector('#edit-img').value,
                price: document.querySelector('#edit-price').value,
                sale: document.querySelector('#edit-sale').value,
                color: document.querySelector('#edit-color').value,
                desc: document.querySelector('#edit-desc').value
            }

            axios({
                method: 'put',
                url: 'http://localhost:3000/products/' + cate_i,
                data: edit_product
            });
        }



    })
    .catch(function(err) {
        console.log(err);
    })


category = {
    url: 'http://localhost:3000/categoris',
    method: "get",
    responeType: "json",
}
axios(category)
    .then(function(data_res) {
        list = data_res.data;
        // console.log(page);
        var product = list.map(function(item) {
            return `<option value="${item.id}"  > ${item.cate_name} </option>`;
        }).join('');
        document.querySelector("#product-category").innerHTML = product
    })
    .catch(function(err) {
        console.log(err);
    })