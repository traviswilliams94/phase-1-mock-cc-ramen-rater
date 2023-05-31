// write your code here

//needed fixes: can't get display data to update upon click

//event listener for submit button
document.querySelector('form').addEventListener('submit', handleSubmit);

//function to handle the submit

function handleSubmit(e){
    e.preventDefault();
    const form = e.target;

    let ramenObj = {
        name:form.name.value,
        restaurant:form.restaurant.value,
        image:form.image.value,
        rating:form.rating.value,
        comment:form.newcomment.value,
    }

    renderRamenCard(ramenObj);
    createRamen(ramenObj);
    form.reset();
};


// build cards from existing ramen data

function renderRamenCard(ramenObj) {
    
    let ramenCard = document.createElement('div')
    ramenCard.classList.add('menuitem')
    ramenCard.innerHTML = `<img src="${ramenObj.image}" />`

    document.getElementById("ramen-menu").appendChild(ramenCard)
    ramenCard.addEventListener('click', () => showClickedRamen(ramenObj))
};

// updates the display based on what I clicked in the top

function showClickedRamen(ramenObj) {
    const ramenDetail = document.getElementById('ramen-detail');
    const detailImage = ramenDetail.querySelector('.detail-image');
    detailImage.src = ramenObj.image;
    detailImage.alt = ramenObj.name;

    ramenDetail.querySelector('.name').textContent = ramenObj.name;
    ramenDetail.querySelector('.restaurant').textContent = ramenObj.restaurant;
    document.querySelector('#rating-display').textContent = ramenObj.rating;
    document.querySelector('#comment-display').textContent = ramenObj.comment;
    
}

//first fetch to pull in exisitng ramen object to menu, div with id ramen-menu

function getAllRamen() {
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(ramens => ramens.forEach(ramen => renderRamenCard(ramen)))
}

//second fetch to post new ramens

function createRamen(ramenObj){
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body:JSON.stringify(ramenObj)
    })
    .then(res => res.json())
    .then(ramenObj => console.log(ramenObj))
};


function initialize(){
    getAllRamen();
  }
  initialize()