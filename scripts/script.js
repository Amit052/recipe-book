 //THE RECIPE OBJECT
var Recipe = {
    name: '',
    ingredients:[],
    instructions:'',
    notes:'',
    duration:0,
    images:[],
    id:-1,
    recipe: function(name,groc,ins,img,notes,dur,id){
    this.name = name;
    this.ingredients = groc;
    this.instructions = ins;
    this.duration = dur;
    this.images = img;
    this.notes = notes;
    this.id = id;
    }
    };



var recipes = [ //array with some recipes
    new Recipe.recipe('Burger',['meat','salt','pepper'],'mix all',['http://www.pngmart.com/files/1/Burger-PNG.png'],'rest 1 hour befor cook',5,0),
    new Recipe.recipe('Homlet',['egg','salt','cream'],'mix',['https://peteandgerrys.com/wp-content/uploads/2015/08/sharp-cheddar-omelet.jpg'],'low heat',5,1),
    new Recipe.recipe('Salad',['tomato','cucumber','onion'],'small dice',['https://www.cearaskitchen.com/wp-content/uploads/2015/05/IMG_1453ck.jpg'],'serve cold',10,2)
    
];
 

 

function search_recipe(str){// get string from input and return recipes that includes that string
    
    let arr = recipes.filter(function(r){
            return r.name.toLowerCase().includes(str.toLowerCase());
    
    });
    buildListView(arr);
}


 function buildListView(r){// gets an array of recipes and put them to view
    let res = '';
     for(let i = 0 ; i < r.length ; i++){
         res += '<a href="#'+r[i].id+'"><div '+r[i].name+'"   class="recipe_div"><img class="listImg" src="'+r[i].images[0]+'"><label><b>'+r[i].name+'</b><br>'+r[i].duration+' Minutes.</label><img class="arrowImg" src="http://www.freeiconspng.com/uploads/arrow-icon--icon-search-engine-2.png"></div></a>';
     }
      document.getElementById('recipes_container').innerHTML = res;
 }

 function recipeView(i){//gets a recipes index from the recipes array and put it to view
    let res = '';
 
         res += '<div   class="full_recipe_div"><h2>'+recipes[i].name+'</h2><h4>Ingredients:</h4>';
         for(let j = 0; j < recipes[i].ingredients.length ; j++) res+= '<label>'+recipes[i].ingredients[j]+'</label><br>';
  
         
         res += '<h4>Instructions:</h4><p>'+recipes[i].instructions+'</p>';
         res += '<h4>Notes:</h4><p>'+recipes[i].notes+'</p>';
         res += '</div>';
     
     document.getElementById('recipes_container').innerHTML = res;
 }

window.onhashchange = function(){//when url is changing and gets # in it
 
    if(location.hash == '')//if root then load full recipes array
         buildListView(recipes);
        else
if( this.recipes.length >= Number(location.hash.slice(1)))//remove the # from url and gets the index
    recipeView(location.hash.slice(1));//shows the selected recipe
}
 
    
    function submit_form(){ //add recipe to array
         var ing = [];
         var imgs = [];
        let name = document.getElementById('rname').value;
        let instructions = document.getElementById('ins_text').value;
        let duration = document.getElementById('duration_text').value;
        let notes = document.getElementById('notes_text').value;
        let id=-1;
        for(let i = 0; i < recipes.length ; i++){
            if(recipes[i].id > id ) id = recipes[i].id+1;
        }
         for(let i = 0 ; i < document.getElementsByClassName('ing_li').length ; i++){            
             ing.push(document.getElementsByClassName('ing_li')[i].innerHTML);             
         }
                 for(let i = 0 ; i < document.getElementsByClassName('prev_img').length ; i++){        imgs.push(document.getElementsByClassName('prev_img')[i].src);            
         }
        recipes.push(new Recipe.recipe(name,ing,instructions,imgs,notes,duration,id));
         buildListView(recipes);
        document.getElementById('myForm').reset();
        document.getElementById('ing_list').innerHTML = '';
        document.getElementById('images_ul').innerHTML = '';
        document.getElementById('overlay').style.display = 'none';
    }

document.addEventListener("DOMContentLoaded", function(event) { //when window done loading
    
buildListView(recipes);
////////////////////////
document.getElementById('submit_form').onclick = function(e){ //submitin the form (add recipe)
    e.preventDefault();
    submit_form();
};
    
////////////////////////
document.getElementById('add_ing').onclick = function(e){// add ingredient to array
                   e.preventDefault();
        document.getElementById('ing_list').innerHTML += '<li class="ing_li">'+     document.getElementById('ing_text').value+'</li>';
        document.getElementById('ing_text').value = '';
};
//////////////////////////////
document.getElementById('addImg').onclick = function(e){// add image to array
        e.preventDefault();
        document.getElementById('images_ul').innerHTML += '<li><img class="prev_img" src="'+     document.getElementById('img_link').value+'"></li>';
        document.getElementById('img_link').value = '';
};
//////////////////////////////           
           
document.getElementById('magnifing_glass').onclick = function (){//show/hide search box
    if( document.getElementById('searchText').style.display == 'inline-block')
        document.getElementById('searchText').style.display = 'none';
    else
        document.getElementById('searchText').style.display = 'inline-block'
};
 
document.getElementById('searchText').onkeyup = function (e){//search when text changes
        search_recipe(document.getElementById('searchText').value);
};
    document.getElementById('add_img').onclick = function (e){//show add recipe overlay
          document.getElementById('overlay').style.display = 'block'
};

        document.getElementById('cancel_form').onclick = function (e){//cancel add recipe overlay
          document.getElementById('overlay').style.display = 'none'
};

  
 
 
                          });