class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  /*
  start(){
    if(gameState === 0){
      player = new Player();
      player.getCount();
      form = new Form()
      form.display();
    }
  }
*/

async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  



  play(){
    form.hide()

    textSize(35);
    text("Go. Shoo. Run!", 120,100)
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      var display_position = 130

      for(var plr in allPlayers){

        display_position+= 30

        if(plr === "player"+player.index){
          fill("red")

        } else{
          fill("black")
        }

      textSize(15);
      //allplayers[p1,p2,p3,p4]
      //player1 : 3654

      text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 130,display_position)
      }
      
    }


    
    if (keyIsDown(UP_ARROW)  && player.index !== null){
      player.distance+=50;
      player.update();
    }
  }
}
