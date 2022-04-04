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
            return `<tr>
                            <td>${item.cate_name}</td>
                            <td>
                            <button id="btn_del" data-id = "${item.id}" class="btn btn-danger ">delete</button>
                            <button data-id = "${item.id}" class="btn btn-success btn_edit" data-toggle="modal" data-target="#myModal_edit"> edit</button>
                            </td>
                        </tr>`;
        }).join('');
        document.querySelector("#tbody_cate").innerHTML = cate



        //delete the category
        let btn_del = document.querySelectorAll('#btn_del');
        btn_del.forEach(function(item) {
            item.onclick = function() {
                cate_id = item.dataset.id
                axios.delete('http://localhost:3000/categoris/' + cate_id);
            }
        });

        //create the category 
        let add_cate = document.querySelector('#sup_cate');
        add_cate.onclick = function(e) {
            e.preventDefault();
            const category = {
                cate_name: document.querySelector('#category').value,
            }

            axios({
                method: 'post',
                url: 'http://localhost:3000/categoris',
                data: category
            });
        }

        //show edit category

        let edit = document.querySelectorAll('.btn_edit');
        edit.forEach(function(item) {
            item.onclick = function() {
                cate_id = item.dataset.id
                axios({
                    method: 'get',
                    url: 'http://localhost:3000/categoris/' + cate_id,
                    responseType: 'json'
                }).then(function(data) {

                    document.querySelector("#cate_name").value = data.data.cate_name
                    document.querySelector("#cate_i").value = data.data.id

                })


            }


        });

        //edit data category 
        let add_edit = document.querySelector('#sup_edit');
        add_edit.onclick = function(e) {
            e.preventDefault();
            cate_i = document.querySelector('#cate_i').value;
            const category = {
                cate_name: document.querySelector('#cate_name').value,
            }

            axios({
                method: 'put',
                url: 'http://localhost:3000/categoris/' + cate_i,
                data: category
            });
        }



    })
    .catch(function(err) {
        console.log(err);
    })