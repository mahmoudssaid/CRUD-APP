var productName = document.getElementById("productName"),
    productPrice = document.getElementById("productPrice"),
    productCategory = document.getElementById("productCategory"),
    productDesc = document.getElementById("productDesc"),
    btnSaveNP = document.querySelector("#saveEdit"),
    allProducts;
if (localStorage.getItem("storage") == null) {
    allProducts = [];
} else {
    allProducts = JSON.parse(localStorage.getItem("storage"));
    display();
}

function addProduct() {
    var PName = productName.value,
        PPrice = productPrice.value,
        PCat = productCategory.value,
        PDesc = productDesc.value,
        regXName = /^[A-Z][a-z0-9]+$/,
        regXPrice = /^[0-9]+$/;
    if (regXName.test(PName) || regXPrice.test(PPrice)) {
        if (regXName.test(PName)) {
            if (regXPrice.test(PPrice)) {
                var product = {
                    name: PName.toLowerCase(),
                    price: PPrice,
                    category: PCat,
                    description: PDesc
                };
                allProducts.push(product);
                localStorage.setItem("storage", JSON.stringify(allProducts));
                //display
                display();
                // clear
                clear();
                if (btnSaveNP.style.display = "inline-block") {
                    btnSaveNP.style.display = "none";
                }
            } else {
                document.querySelector("#alertPrice").setAttribute("style", "display: block");
            }
        } else {
            document.querySelector("#alertName").setAttribute("style", "display: block");
        }
    } else {
        document.querySelector("#alertName").setAttribute("style", "display: block");
        document.querySelector("#alertPrice").setAttribute("style", "display: block");
    }
}

function keyup() {
    document.querySelector("#alertName").setAttribute("style", "display: none");
    document.querySelector("#alertPrice").setAttribute("style", "display: none");
}

function display() {
    var trs = ``;
    for (i = 0; i < allProducts.length; i++) {
        trs += `<tr>
        <th scope="col"> ${i+1} </th>
        <th scope="col" class="Name-p"> ${allProducts[i].name} </th>
        <th scope="col"> ${allProducts[i].price} </th>
        <th scope="col"> ${allProducts[i].category} </th>
        <th scope="col-2">${allProducts[i].description} </th>
        <th scope="col"> <button class="btn btn-outline-warning" onclick="edit(${i})">Edit</button></th>
        <th scope="col"> <button class="btn btn-outline-danger" onclick="modalData(${i})" data-toggle="modal" data-target="#DeleteModal">Delete</button></th>
    </tr>`
    }
    document.getElementById("productTable").innerHTML = trs;
}

function clear() {
    productName.value = "",
        productPrice.value = "",
        productCategory.value = "",
        productDesc.value = "";
}

function modalData(indexNum) {
    var showOp = `
        <label class="labelShowOP"><span class="spanNamOP">name:</span> ${allProducts[indexNum].name}</label>,
        <label class="labelShowOP"><span class="spanNamOP">price:</span> ${allProducts[indexNum].price}</label>,
        <label class="labelShowOP"><span class="spanNamOP">category:</span> ${allProducts[indexNum].category}</label>,
        <label class="labelShowOP"><span class="spanNamOP">description:</span> ${allProducts[indexNum].description}</label>
    `;
    document.querySelector("#OpShow").innerHTML = showOp;
    document.querySelector("#deleteMine").setAttribute("onclick", "Delete(" + indexNum + ")");
}

function Delete(InD) {
    allProducts.splice(InD, 1);
    localStorage.setItem("storage", JSON.stringify(allProducts));
    display();
}

function searchProd(searchV) {
    var checkNothing = false;
    var newArray = [];
    for (i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(searchV.toLowerCase())) {
            var newOp = allProducts[i];
            newOp["searchIndex"] = i;
            newArray.push(newOp);
            checkNothing = true;
        }
    }

    if (checkNothing) {
        displayNewArray()
    } else {
        var nothing = ``;
        nothing += `
            <tr>
                <td> ${"1"}</td>
                <td colspan="6" class="noFound"> ${"No Products Found"}</td>
            </tr>`;
        document.getElementById("productTable").innerHTML = nothing;
    }

    function displayNewArray() {
        var trs = ``;
        for (i = 0; i < newArray.length; i++) {
            trs += `<tr>
                    <th scope="col">` + (Number(newArray[i].searchIndex) + 1) +
                ` </th>
                    <th scope="col" class="Name-p">` + newArray[i].name.replace(searchV,`<span>${searchV}</span>`) +
                `</th>
                    <th scope="col">` + newArray[i].price +
                `</th>
                    <th scope="col">` + newArray[i].category +
                `</th>
                    <th scope="col-2 ">` + newArray[i].description +
                `</th>
                    <th scope="col"> <button class="btn btn-outline-warning" onclick="edit(${newArray[i].searchIndex})">Edit</button></th>
                    <th scope="col"> <button class="btn btn-outline-danger" onclick="modalData(${newArray[i].searchIndex})" data-toggle="modal" data-target="#DeleteModal">Delete</button></th> 
                </tr>`;
        }
        document.getElementById("productTable").innerHTML = trs;
    }
}

function edit(indexOpj) {
    var opjVal = allProducts[indexOpj];
    productName.value = opjVal.name,
        productPrice.value = opjVal.price,
        productCategory.value = opjVal.category,
        productDesc.value = opjVal.description;
    if (btnSaveNP.style.display = "none") {
        btnSaveNP.style.display = "inline-block";
        btnSaveNP.setAttribute("onclick", "editAndD(" + indexOpj + ")");
    } else {
        btnSaveNP.style.display = "none"
    }
    window.scrollTo({ top: 100, behavior: "smooth" });
}

function editAndD(indexO) {
    var PName = productName.value,
        PPrice = productPrice.value,
        PCat = productCategory.value,
        PDesc = productDesc.value,
        regXName = /^[A-Z][a-z0-9]+$/,
        regXPrice = /^[0-9]+$/;
    if (regXName.test(PName) || regXPrice.test(PPrice)) {
        if (regXName.test(PName)) {
            if (regXPrice.test(PPrice)) {
                var newProduct = {
                    name: PName,
                    price: PPrice,
                    category: PCat,
                    description: PDesc
                };
                allProducts.splice(indexO, 1, newProduct);
                localStorage.setItem("storage", JSON.stringify(allProducts));
                display();
                clear();
                if (btnSaveNP.style.display = "inline-block") {
                    btnSaveNP.style.display = "none"
                } else {
                    btnSaveNP.style.display = "inline-block"
                }
            } else {
                document.querySelector("#alertPrice").setAttribute("style", "display: block");
            }
        } else {
            document.querySelector("#alertName").setAttribute("style", "display: block");
        }
    } else {
        document.querySelector("#alertName").setAttribute("style", "display: block");
        document.querySelector("#alertPrice").setAttribute("style", "display: block");
    }
}