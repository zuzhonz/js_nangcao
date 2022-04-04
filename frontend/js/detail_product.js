let params = new URLSearchParams(location.search);
let id = params.get("id");

option = {
    url: 'http://localhost:3000/products/' + id,
    method: "get",
    responeType: "json",
}
axios(option)
    .then(function(data_res) {
        detail = data_res.data;
        var format = detail.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        var sale3 = (parseInt(detail.price) * parseInt(detail.sale) / 100)
        var new_price = parseInt(detail.price) - sale3
        var new_format = String(new_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        const imgs = `<img src="${detail.img}" alt="">`

        document.querySelector('#product-name').innerHTML = detail.product_name
        document.querySelector('#product-old-price').innerHTML = format

        document.querySelector('#product-price').innerHTML = new_format
        document.querySelector('#product-preview').innerHTML = imgs
        document.querySelector('#product-desc').innerHTML = detail.desc
        document.querySelector('#product-desc2').innerHTML = detail.desc
        document.querySelector('#product-desc3').innerHTML = detail.desc



    })
    .catch(function(err) {
        console.log(err);
    })