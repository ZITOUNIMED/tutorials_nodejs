const productRoutes = (req, res) => {
    if(req.method === 'POST'){
        res.statusCode = 201;
        const data = [];
        req.on('data', chunck => {
            data.push(chunck);
        });

        req.on('end', () => {
            const parsedData = Buffer.concat(data).toString();
            const {title, price, amount, postAction} = parseProductData(parsedData);
            if(!products.some(product => product.title === title)){
                products.push({title, price, amount});
            } else if(postAction === 'update'){
                products.forEach(product => {
                    if(product.title === title){
                        product.price = price;
                        product.amount = amount;
                    }
                });
            }
            res.end(template());
        });
    } else if(req.method === 'DELETE'){
        const title = req.url.split('title=')[1];
        products = products.filter(product => product.title !== title);
        res.setHeader('Content-Type', 'text/plain');
        res.end('success');
    }else {
        res.end(template());
    }
};

const parseProductData = parsedData => {
    const list = parsedData.split('&');
    const title = list[0].split('=')[1];
    const price = list[1].split('=')[1];
    const amount = list[2].split('=')[1];
    const postAction = list[3].split('=')[1];
    return {title, price, amount, postAction};
}

let products = [{title: "t1", price: '1', amount: '42'}, {title: "t2", price: '34', amount: '2'}, {title: "t3", price: '53', amount: '6'}];

const template = () => `
<html>
<head><title>Product Page</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
<div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" class="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="/product" class="nav-link px-2 link-dark">Products</a></li>
    </ul>

    <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2" onclick="logout()">Logout</button>
    </div>
    </header>
    <div>
        <div class="card-group">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Product</h5>
                    <form method="POST" action="product">
                        <div class="mb-3">
                            <label for="title" class="form-label">title</label>
                            <input type="text" class="form-control" id="title" name="title" id="title">
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input type="number" class="form-control" id="price" name="price" id="price">
                        </div>
                        <div class="mb-3">
                            <label for="amount" class="form-label">Amount</label>
                            <input type="number" class="form-control" id="amount" name="amount" id="amount">
                        </div>
                        <input name="postAction" type="text" value="create" id="postActionId" hidden/>
                        <div class="mb-3" style="float: right">
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Products List</h5>
                    <table class="table table-striped" id="productsTableId">
                        <thead>
                            <tr>
                                <th>Title</th> <th>Price</th> <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(product => `<tr><td>${product.title}</td> <td>${product.price}</td> <td>${product.amount}</td>
                            <td><button class="btn btn-danger btn-sm" onclick="remove('${product.title}')">Remove</button>
                            <button class="btn btn-info btn-sm" onclick="update('${product.title}')">Update</button>
                            </td></tr>`).reduce((e1, e2) => `${e1}${e2}`)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    function logout(){
        window.location.href = '/connection';
    }

    var selectedTitle = null;
    function remove(title){
          selectedTitle = title;
          var http = new XMLHttpRequest();
          http.addEventListener("load", removeListener);
          http.open("DELETE", "/product?title="+title);
          http.send()
    }

    function removeListener () {
       // console.log(this.responseText);
      // location.reload();
        var rows = document.getElementById('productsTableId').rows;
        for(var i = 0; i<rows.length; i++){
            if(rows[i].childNodes[0].innerText === selectedTitle){
                rows[i].remove();
            }
        }
    }

    function update(title){
        var rows = document.getElementById('productsTableId').rows;
        for(var i = 0; i<rows.length; i++){
            if(rows[i].childNodes[0].innerText === title){
                document.getElementById('title').value=rows[i].childNodes[0].innerText;
                document.getElementById('price').value=rows[i].childNodes[2].innerText;
                document.getElementById('amount').value=rows[i].childNodes[4].innerText;
            }
        }

        var postAction = document.getElementById('postActionId');
        console.log(postAction);
        postAction.value='update';
    }
</script>
</body>
</html>
`;

exports.productRoutes = productRoutes;