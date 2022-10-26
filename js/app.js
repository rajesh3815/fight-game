const canva=document.querySelector("canvas")
const c=canva.getContext("2d")
canva.width=1024
canva.height=576
c.fillRect(0,0,canva.width,canva.height)
const gravity=0.8
const backgnd=new Sprite({
    postion:{
        x:0,y:0
    },
    imagesrc:"./img/background.png"
})
const shop=new Sprite({
    postion:{
        x:600,y:127
    },
    imagesrc:"./img/shop.png",
    scale:2.75,
    framerate:6
})
const player=new fighter({
   postion: {
    x:0,y:0
},
velocity:{
    x:0,y:0
},
offset:{
    x:0,y:0
},
imagesrc:'./img/samuraiMack/idle.png',
framerate:8,
scale:2.5,
offset:{
    x:215,y:157
},
sprites:{
    idle:{
        imagesrc:'./img/samuraiMack/idle.png',framerate:8 
    },
    run:{
        imagesrc:'./img/samuraiMack/Run.png',
        framerate:8
    },
    jump:{
        imagesrc:'./img/samuraiMack/jump.png',
        framerate:2
    },
    Fall:{
        imagesrc:'./img/samuraiMack/Fall.png',
        framerate:2
    },
    attack1:{
        imagesrc:'./img/samuraiMack/Attack1.png',
        framerate:6
    },
    takehit:{
        imagesrc:'./img/samuraiMack/Take Hit - white silhouette.png',
        framerate:4
    },
    death:{
        imagesrc:'./img/samuraiMack/Death.png',
        framerate:6
    }
},
attackbox:{
    offset:{
        x:100,y:50
    },
    width:160,
    height:50
}

})
const enemy=new fighter({
  postion:  {
    x:400,y:100
},
velocity:{
    x:0,
    y:0
},
color:'blue',
offset:{
    x:-50,y:0
},imagesrc:'./img/kenji/idle.png',
framerate:4,
scale:2.5,
offset:{
    x:215,y:167
},
sprites:{
    idle:{
        imagesrc:'./img/kenji/idle.png',
        framerate:4 
    },
    run:{
        imagesrc:'./img/kenji/Run.png',
        framerate:8
    },
    jump:{
        imagesrc:'./img/kenji/jump.png',
        framerate:2
    },
    Fall:{
        imagesrc:'./img/kenji/Fall.png',
        framerate:2
    },
    attack1:{
        imagesrc:'./img/kenji/Attack1.png',
        framerate:4
    }, 
    takehit:{
        imagesrc:'./img/kenji/Take Hit.png',
        framerate:3
        },
        death:{
            imagesrc:'./img/kenji/Death.png',
            framerate:7
        }
},

attackbox:{
    offset:{
        x:-170,y:50
    },
    width:170,
    height:50
}

})
const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }
}

decreasetimer()
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle="black"
    c.fillRect(0,0,canva.width,canva.height)
    backgnd.update()
    shop.update()
    c.fillStyle='rgba(255,255,255,0.20)'
    c.fillRect(0,0,canva.width,canva.height)
    player.update()
    enemy.update()
    player.velocity.x=0
    enemy.velocity.x=0
    //moving player
    if(keys.a.pressed && player.lastkey==='a'){
        player.velocity.x=-5
      player.switchsprite('run')
    }else if(keys.d.pressed && player.lastkey==='d'){
        player.velocity.x=5
        player.switchsprite('run')
    }else{
        player.switchsprite('idle')
    }
    //jump
    if(player.velocity.y<0){
       player.switchsprite('jump')
    }else if(player.velocity.y>0){
        player.switchsprite('Fall')
    }
    //enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastkey==='ArrowLeft'){
        enemy.velocity.x=-5
        enemy.switchsprite('run')
    }else if(keys.ArrowRight.pressed && enemy.lastkey==='ArrowRight'){
        enemy.velocity.x=5
        enemy.switchsprite('run')
    }else{
        enemy.switchsprite('idle')
    }
    //enemy jump
    if(enemy.velocity.y<0){
        enemy.switchsprite('jump')
     }else if(enemy.velocity.y>0){
         enemy.switchsprite('Fall')
     }
    //detect collision
    if(rectangularCollision({
        rectangle1:player,
        rectangle2:enemy
    })&& player.isAttack && player.currenframe===4){
        enemy.takehit()
        player.isAttack=false
        // enemy.health-=20
       
        gsap.to('#enemy-hl',{
            width:enemy.health+'%'
        })
      
    }
    //miss
    if(player.isAttack && player.currenframe===4){
        player.isAttack=false
    }
    if(rectangularCollision({
        rectangle1:enemy,rectangle2:player
    })&& enemy.isAttack && enemy.currenframe===2){
        player.takehit()
        enemy.isAttack=false
        gsap.to('#player-hl',{
            width:player.health+'%'
        })
        
        
      
    }
    if(enemy.isAttack && enemy.currenframe===2){
        enemy.isAttack=false
    }
    if(enemy.health<=0||player.health<=0){
determinewinner({player,enemy,timerid})
    }
}
animate()
window.addEventListener("keydown",(e)=>{
    if(!player.death){
    switch(e.key){
        case 'd':
            keys.d.pressed=true
           player. lastkey='d'
        break;
        case 'a':
            keys.a.pressed=true
          player.  lastkey='a'
        break;
        case 'w':
            player.velocity.y=-20
            break
        case ' ':
            player.attack()
            break
            
    }}
    if(!enemy.death){ 
            switch(e.key){
            case 'ArrowRight':
            keys.ArrowRight.pressed=true
            enemy.lastkey='ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
           enemy. lastkey='ArrowLeft'
        break;
        case 'ArrowUp':
            enemy.velocity.y=-20
            break
            case 'ArrowDown':
                enemy.attack()
                break

    }
}
// console.log(e.key)
})
window.addEventListener("keyup",(e)=>{
    switch(e.key){
        case 'd':
            keys.d.pressed=false
        break;
        case 'a':
            keys.a.pressed=false
        break;
        case 'w':
            keys.w.pressed=false
            break
    }
    switch (e.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            break;
            case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break;
    
        default:
            break;
    }
// console.log(e.key)
})
