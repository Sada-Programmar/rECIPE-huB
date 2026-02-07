async function location() {
    try {
        const respons = await fetch('http://ip-api.com/json/')
        const result = await respons.json()
        console.log(result)
        return result.country
    } catch (error) {
        console.log(error)
    }
}
var country = await location()
console.log(country)
var timeperiod;
function timegeter() {
    var date = new Date()
    var time = date.getHours()
    if (time >= 5 && time <= 11) {
        var mess = "Breakfast"
    }
    if (time >= 12 && time <= 16) {
        var mess = "Afternoon"
    }
    if (time >= 17 && time <= 20) {
        var mess = "Evening"
    }
    if (time >= 20 || time < 5) {
        var mess = "Night"
    }
    timeperiod = mess
    console.log(mess)
}
timegeter()

async function autorecipe() {
    try {
        if (timeperiod != "Breakfast") {
            if (timeperiod == "Afternoon") {
                timeperiod = "Seafood"
                var tag = `<i class="fa-solid fa-anchor"></i> Premium Marine`
                var timeperiod1 = "Pasta"
                var tag1 = `<i class="fa-solid fa-clock"></i> Quick & Filling`
            }
            if (timeperiod == "Evening") {
                timeperiod = "Side"
                var tag = `<i class="fa-solid fa-seedling"></i> Complementary`
                var timeperiod1 = "Starter"
                var tag1 = `<i class="fa-solid fa-plate-wheat"></i> Crispy & Light`
            }
            if (timeperiod == "Night") {
                timeperiod = "Beef"
                var tag = `<i class="fa-solid fa-fire"></i> High Protein`
                var timeperiod1 = "Chicken"
                var tag1 = `<i class="fa-solid fa-feather"></i> Easy to Digest`
                var timeperiod2 = "Lamb"
                var tag2 = `<i class="fa-solid fa-crown"></i> Premium Cut`
            }
        } else {
            var tag = `<i class="fa-solid fa-sun"></i> Morning Energy`
        }
        const rsp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${timeperiod}`)
        const recipe = await rsp.json()
        var category = timeperiod
        if (timeperiod != "Breakfast") {
            const rsp1 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${timeperiod1}`)
            var recipe1 = await rsp1.json()
            var category1 = timeperiod1
        }
        if (timeperiod == "Beef") {
            const rsp2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${timeperiod2}`)
            var recipe2 = await rsp2.json()
            var category2 = timeperiod2
        }
        console.log(recipe)
        console.log(recipe1)
        console.log(recipe2)
        if (recipe) {
            var cat = recipe.meals.map(function (item) {
                var newitem = { ...item }
                newitem.cat = category
                newitem.teg = tag
                return newitem
            })
        }
        if (recipe1) {
            var cat1 = recipe1.meals.map(function (item) {
                var newitem = { ...item }
                newitem.cat = category1
                newitem.teg = tag1
                return newitem
            })
        }else{
            cat1 = []
        }
        if (recipe2) {
            var cat2 = recipe2.meals.map(function (item) {
                var newitem = { ...item }
                newitem.cat = category2
                newitem.teg = tag2
                return newitem
            })
        }else{
            cat2 = []
        }

        var fullrecipe = [...cat, ...cat1, ...cat2]

        for (let i = fullrecipe.length - 1; i > 0; i--) {
            var sec = Math.floor(Math.random() * (i + 1));
            [fullrecipe[i], fullrecipe[sec]] = [fullrecipe[sec], fullrecipe[i]]
        }
        console.log(fullrecipe)
        var recipepack = fullrecipe.map(function (recipe) {
            return `
 <article class="card" id=${recipe.idMeal}>
          <div class="media">
            <img src="${recipe.strMealThumb}">
            <span class="badge">${recipe.cat}</span>
          </div>
          <div class="info">
            <h3>${recipe.strMeal}</h3>
            <div class="meta">
            <span>${recipe.teg}</span>
              <span class="price">$$$$</span>
            </div>
            <button>View Recipe</button>
          </div>
        </article>
`
        })
        document.querySelector('.grid').innerHTML = recipepack.join("")
    } catch (error) {
        console.log(error)
    }
}
autorecipe()
document.querySelector('body').addEventListener('click', async function(event){
   var button = event.target.closest('button')
    if(button){
       var cd = button.closest('article')
       var id = cd.id
       console.log(id)
       try{
        const rec = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        var rec1 = await rec.json()
        console.log(rec1)
       }catch(error){
        console.log(error)
       }
    }
    else{
        return
    }
})



