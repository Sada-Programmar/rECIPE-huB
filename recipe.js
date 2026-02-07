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
        } else {
            cat1 = []
        }
        if (recipe2) {
            var cat2 = recipe2.meals.map(function (item) {
                var newitem = { ...item }
                newitem.cat = category2
                newitem.teg = tag2
                return newitem
            })
        } else {
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
document.querySelector('body').addEventListener('click', async function (event) {
    var button = event.target.closest('button')
    if (button) {
        var cd = button.closest('article')
        var id = cd.id
        console.log(id)
        try {
            const rec = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            var rec1 = await rec.json()
            console.log(rec1)
            var finalrec = rec1.meals.map(function (recipe) {
                return `
            <section class="recipe-modal">

          <!-- Close -->
          <button class="close-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <!-- Like -->
          <button class="like-btn">
            <i class="fa-solid fa-heart"></i>
            <span>1.2k</span>
          </button>

          <!-- LEFT -->
          <div class="modal-left">
            <img src="${recipe.strMealThumb}">
            <div class="image-overlay">
              <span class="category-badge">${recipe.srt}</span>
              <h1 class="recipe-title">${recipe.strMeal}</h1>
            </div>
          </div>

          <!-- RIGHT -->
          <div class="modal-right">

            <!-- STATS -->
            <div class="stats-row">
              <div><i class="fa-regular fa-clock"></i> 45 Min</div>
              <div><i class="fa-solid fa-fire"></i> 520 kcal</div>
              <div><i class="fa-solid fa-chart-simple"></i> Medium</div>
            </div>

            <!-- INGREDIENTS -->
            <section class="section ingredients-section">
              <h2>Ingredients</h2>

              <div class="ingredients-scroll">
                <ul class="ingredients">
                  <li><span>Chicken</span><span>500g</span></li>
                  <li><span>Butter</span><span>3 tbsp</span></li>
                  <li><span>Cream</span><span>1 cup</span></li>
                  <li><span>Tomato Puree</span><span>200g</span></li>
                  <li><span>Spices</span><span>to taste</span></li>

                  <!-- Test ke liye extra -->
                  <li><span>Garlic</span><span>6 cloves</span></li>
                  <li><span>Ginger</span><span>2 inch</span></li>
                  <li><span>Onion</span><span>2 large</span></li>
                  <li><span>Oil</span><span>3 tbsp</span></li>
                </ul>
              </div>
            </section>

            <!-- INSTRUCTIONS -->
            <section class="section">
              <h2>Instructions</h2>
              <p class="instructions">
                Heat butter in a pan and sauté spices until aromatic. Add chicken and cook until
                lightly browned. Pour in tomato puree and simmer gently. Stir in cream and cook
                until the sauce thickens beautifully.
              </p>
            </section>

            <!-- ACTION BUTTONS (BIG & PREMIUM) -->
            <div class="action-bar">
              <button class="btn-outline">
                <i class="fa-regular fa-bookmark"></i> Save Recipe
              </button>
              <button class="btn-primary">
                <i class="fa-solid fa-play"></i> Watch Video
              </button>
            </div>

            <!-- COMMENTS -->
            <section class="section comments-section">
              <h2>Comments</h2>

              <!-- ADD COMMENT (PEHLE) -->
              <div class="add-comment">
                <textarea placeholder="Write your comment..."></textarea>
                <button>Post Comment</button>
              </div>

              <!-- COMMENTS LIST (NEECHE, SCROLL NATURALLY) -->
              <div class="comments-list">
                <div class="comment">
                  <div class="avatar">A</div>
                  <div>
                    <strong>Ali</strong>
                    <p>Amazing recipe 🔥 tried it today!</p>
                  </div>
                </div>

                <div class="comment">
                  <div class="avatar">S</div>
                  <div>
                    <strong>Sara</strong>
                    <p>Looks delicious 😍</p>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </section>
            `
            })
            document.querySelector('.modal-backdrop').innerHTML = finalrec
        } catch (error) {
            console.log(error)
        }
    }
    else {
        return
    }
})



