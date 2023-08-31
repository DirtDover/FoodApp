const search = document.querySelector('button');


async function getFood() {
    
    const barcode = document.querySelector('.search_bar input').value;
    const name = document.querySelector('.name_product');
    const grade = document.querySelector('.nutrition_grades');
    const cal = document.querySelector('.result_container .cal');
    
    let rep = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=product_name,nutriscore_data,nutriments,nutrition_grades
    `);
    let reponse = await rep.json();
    const data = reponse
    

    if(data.status === 0){
        return;
    } else {
        name.innerHTML =  data.product.product_name;
        grade.innerHTML =  `Rang ${data.product.nutrition_grades}`;
        cal.innerHTML = `${data.product.nutriments['energy-kcal_100g']} Kcal pour 100g`;
    }
    
};


search.addEventListener('click',(e) => {
    e.preventDefault();
    getFood();
});



