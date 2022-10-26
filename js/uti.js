function rectangularCollision({rectangle1,rectangle2}){
    return (rectangle1.attackbox.postion.x+rectangle1.attackbox.width>=rectangle2.postion.x && 
           rectangle1.attackbox.postion.x<=rectangle2.postion.x+rectangle2.width &&
           rectangle1.attackbox.postion.y+rectangle1.attackbox.height>=rectangle2.postion.y &&
           rectangle1.attackbox.postion.y<=rectangle2.postion.y+rectangle2.height
          )
}
function determinewinner({player,enemy,timerid}){
    clearTimeout(timerid)
    document.querySelector("#score").style.display="flex"
    if(player.health===enemy.health){
        document.querySelector("#score").innerHTML="tie"
    }else if(player.health>enemy.health){
        document.querySelector("#score").innerHTML="player 1 won"
    }else if(player.health<enemy.health){
        document.querySelector("#score").innerHTML="player 2 won"
    }
}
let time=60
let timerid
function decreasetimer(){
if(time>0){
   timerid= setTimeout(decreasetimer,1000)
    time--
    document.querySelector("#timer").innerHTML=time
}
if(time===0){
   determinewinner({player,enemy,timerid})
}
}