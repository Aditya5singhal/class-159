AFRAME.registerComponent("tour", {
  schema:{
    state:{type:"string",default:"place-list"},
    selectedCard:{type:"string",default:"#card1"}
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
    this.handleClickEvents();
  },

  hideEl:function(elList){
elList.map(el=> {
  el.setAttribute("visible",false)
})

  },
  showView:function(){
    const{selectedCard}= this.data;
    const skyEl= document.querySelector("#main-container");
    skyEl.setAttribute("material",{
      src:'./assets/360_image/${selectedCard}/place-0.jpg',
      color:"#fff"
    })
  },

  tick:function(){
    const{state}=this.el.getAttribute("tour");
    if (state=== "view"){
      this.hideEl([this.placesContainer]);
      this.showView()
      
      
    }
  },
  
  handleClickEvents:function(){
//cursor click event
this.el.addEventListener("click", evt =>{
  const placesContainer=document.querySelector("#places-container")
  const{state}=placesContainer.getAttribute("tour");

  if(state=== "places-list"){
    const id= this.el.getAttribute("id")
    const placesid= ["taj-mahal","budapest","eiffel-tower","new-york-city"]
  if(placesid.includes(id)){
    placesContainer.setAttribute("tour",{
      state:"view",
      selectedCard:id
    })
  }  
  }
})
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png",
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg",
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.jpg",
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id);

      // Thumbnail Element
      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      // Title Text Element
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1,
    });

    //Add cursor-listener component to the ring border entity to change it's color 
    //On Cursor 'mouseenter' and 'mouseleave' entity
    entityEl.setAttribute("cursor-listener", {});

    return entityEl;
  },
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 9,
    });
    entityEl.setAttribute("material", { src: item.url });

    return entityEl;
  },
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 70,
      color: "#e65100",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    
    return entityEl;
  },
});
