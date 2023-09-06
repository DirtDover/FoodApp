const search = document.querySelector('button');
const error = document.querySelector('.error');
const result = document.querySelector('.result_container')


async function getFood() {
    
    const barcode = document.querySelector('.search_bar input').value;
    const name = document.querySelector('.name_product');
    const grade = document.querySelector('.nutrition_grades');
    const cal = document.querySelector('.result_container .cal');
    const imgGrades = document.querySelector('.img_grades');
    const imgNova = document.querySelector('.img_nova');
    const imgProduct = document.querySelector('.img_product');
    const description = document.querySelector('.description');

    name.innerHTML = '';
    grade.innerHTML = '';
    cal.innerHTML = '';
    imgGrades.innerHTML ='';
    imgNova.innerHTML ='';
    imgProduct.innerHTML ='';
    
    let rep = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}
    `);
    let reponse = await rep.json();
    const data = reponse
    console.log(data)
    

    if(data.status === 0){
        error.style.display ='block'; 
        name.innerHTML = '';
        grade.innerHTML = '';
        cal.innerHTML = '';
        imgGrades.innerHTML ='';
        imgNova.innerHTML ='';
        imgProduct.innerHTML ='';
        return;
    } else if (data.code !== barcode) {
        error.style.display ='block';       
        name.innerHTML = '';
        grade.innerHTML = '';
        cal.innerHTML = '';
        imgGrades.innerHTML ='';
        imgNova.innerHTML ='';
        imgProduct.innerHTML ='';
        return;
    } else {
        error.style.display = 'none';
        name.innerHTML =  data.product.product_name;
        grade.innerHTML =  `Rang ${data.product.nutrition_grades}`;
        cal.innerHTML = `${data.product.nutriments['energy-kcal_100g']} Kcal pour 100g`;
        imgProduct.src = `${data.product.image_url}`;
        
    }


        switch(data.product.nutrition_grades){

            case 'a' :
                console.log("Case a");
                imgGrades.src ='images/A.svg';
                break;
            case 'b' :
                console.log("Case b");
                imgGrades.src ='images/B.svg';
                break;
            case 'c' :
                imgGrades.src ='images/C.svg';
                break;
            case 'd' :
                imgGrades.src ='images/D.svg';
                break;
            case 'e' :
                imgGrades.src ='images/E.svg';
                break;
            default :
                imgGrades.src = ''
        };

            switch(data.product.nutriments['nova-group']){

                case 1 :
                    console.log("Case a");
                    imgNova.src ='images/1.png';
                    break;
                case 2 :
                    console.log("Case b");
                    imgNova.src ='images/2.png';
                    break;
                case 3 :
                    console.log("Case 3");
                    imgNova.src ='images/3.png';
                    break;
                case 4 :
                    console.log("Case 4");
                    imgNova.src ='images/4.png';
                    break;
                default :
                    imgNova.src = ''
            };

      
};




search.addEventListener('click',(e) => {
    e.preventDefault();
    getFood();
});



//console.log(data.product.nutriments['nova-group_100g']);