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
            return `<tr>
                            <td>${item.product_name}</td>
                            <td>${item.price}</td>
                            <td>${item.sale}</td>
                            <td>${item.desc}</td>
                            <td>${item.color}</td>
                            <td> <img src="${item.img}" alt="">  </td>
                            <td>${item.categori.cate_name}</td>
                            <td>
                            <button data-id = "${item.id}" class="btn btn-danger btn_del ">delete</button>
                            <button data-id = "${item.id}" class="btn btn-success btn_edit" data-toggle="modal" data-target="#myModal_edit"> edit</button>
                            </td>
                        </tr>`;
        }).join('');
        document.querySelector("#tbodys").innerHTML = product



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