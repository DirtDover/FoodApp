const search = document.querySelector('button');
const error = document.querySelector('.error');
const result = document.querySelector('.result_container')


async function getFood() {
    
    const barcode = document.querySelector('.search_bar input').value;
    const name = document.querySelector('.name_product');
    const grade = document.querySelector('.nutrition_grades');
    const cal = document.querySelector('.result_container .cal');
    const image = document.querySelector('.result_container img')

    name.innerHTML = '';
    grade.innerHTML = '';
    cal.innerHTML = '';
    
    let rep = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=product_name,nutriscore_data,nutriments,nutrition_grades
    `);
    let reponse = await rep.json();
    const data = reponse
    console.log(data)
    

    if(data.status === 0){
        error.style.display ='block'; 
        name.innerHTML = '';
        grade.innerHTML = '';
        cal.innerHTML = '';
        return;
    } else if (data.code !== barcode) {
        error.style.display ='block';       
        name.innerHTML = '';
        grade.innerHTML = '';
        cal.innerHTML = '';
        return;
    } else {
        error.style.display = 'none';
        name.innerHTML =  data.product.product_name;
        grade.innerHTML =  `Rang ${data.product.nutrition_grades}`;
        cal.innerHTML = `${data.product.nutriments['energy-kcal_100g']} Kcal pour 100g`;
    }


        switch(data.product.nutrition_grades){

            case 'a' :
                image.src ='images/A.svg';
                break;
            case 'b' :
                image.src ='images/B.svg';
                break;
            case 'c' :
                image.src ='images/C.svg';
                break;
            case 'd' :
                image.src ='images/D.svg';
                break;
            case 'e' :
                image.src ='images/E.svg';
                break;
            default :
                image.src = ''
        }
};




search.addEventListener('click',(e) => {
    e.preventDefault();
    getFood();
});



