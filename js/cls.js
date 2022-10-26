class Sprite{
    constructor({postion,imagesrc,scale=1,framerate=1,offset={x:0,y:0}}){
        this.postion=postion
        this.height=150
        this.width=50
        this.image=new Image()
        this.image.src=imagesrc
        this.scale=scale
        this.framerate=framerate
        this.currenframe=0
        this.frameElapse=0
        this.framehold=5
        this.offset=offset
    }
    draw(){
    c.drawImage(this.image,
        this.currenframe*(this.image.width/this.framerate),
        0,
        this.image.width/this.framerate,
        this.image.height,
        this.postion.x-this.offset.x,
        this.postion.y-this.offset.y,
        (this.image.width/this.framerate)*this.scale,
        this.image.height*this.scale)
    }
     animframe(){
        this.frameElapse++
        if(this.frameElapse%this.framehold===0){
        if(this.currenframe<this.framerate-1){
            this.currenframe++
        }else{
            this.currenframe=0
        }
    }
    }
    update(){
        this.draw()
        this.animframe()
    }
   
}
class fighter extends Sprite{
    constructor({postion,
        velocity,
        color='red',
        imagesrc,
        scale=1,
        framerate=1,
        offset={x:0,y:0},
        sprites,
        attackbox={offset:{},width:undefined,height:undefined}
    }){
        super({
            postion,
            imagesrc,
            scale,
            framerate,
            offset
        })
        this.velocity=velocity
        this.height=150
        this.width=50
        this.lastkey
        this.attackbox={
            postion:{
                x:this.postion.x,
                y:this.postion.y
            },
            offset:attackbox.offset,
            width:attackbox.width,
            height:attackbox.height
        }
        this.health=100
        this.color=color
        this.isAttack
        this.currenframe=0
        this.frameElapse=0
        this.framehold=5
        this.sprites=sprites
        this.dead=false
        for(const sprite in this.sprites){
            sprites[sprite].image=new Image()
            sprites[sprite].image.src=sprites[sprite].imagesrc
        }
        console.log(this.sprites);
    }

    update(){
        this.draw()
        if(!this.death)
        this.animframe()
        this.attackbox.postion.x=this.postion.x+this.attackbox.offset.x
        this.attackbox.postion.y=this.postion.y+this.attackbox.offset.y
        //   c.fillRect(this.attackbox.postion.x,this.attackbox.postion.y,this.attackbox.width,this.attackbox.height)
        this.postion.x+=this.velocity.x
        this.postion.y +=this.velocity.y

        if(this.postion.y+this.height+this.velocity.y>=canva.height-96){
            this.velocity.y=0
            this.postion.y=330
        }
        else 
        this.velocity.y+=gravity
         
    }
    attack(){
        this.switchsprite('attack1')
        this.isAttack=true
        
    }
    takehit(){
        this.health-=20
if(this.health<=0){
    this.switchsprite('death')
}
    else
    this.switchsprite('takehit')

    }
    switchsprite(Sprite){
        if(this.image===this.sprites.death.image){
            if(this.currenframe===this.sprites.death.framerate-1)
            this.death=true
            return;
        }
        if(this.image===this.sprites.attack1.image && this.currenframe<this.sprites.attack1.framerate-1) 
        return
        if(this.image===this.sprites.takehit.image&&this.currenframe<this.sprites.takehit.framerate-1)
        return
        switch (Sprite) {
            case 'idle':
                if(this.image!==this.sprites.idle.image){
                this.image=this.sprites.idle.image
                this.framerate=this.sprites.idle.framerate 
                this.currenframe=0
                }
                break;
            case 'run':
                if(  this.image!==this.sprites.run.image){
                this.image=this.sprites.run.image
                this.framerate=this.sprites.run.framerate 
                this.currenframe=0
                }
                break;
            case 'jump':
                if(this.image!==this.sprites.jump.image){
                this.image=this.sprites.jump.image
                this.framerate=this.sprites.jump.framerate 
                this.currenframe=0
                }
                break;
                case 'Fall':
                if(this.image!==this.sprites.Fall.image){
                this.image=this.sprites.Fall.image
                this.framerate=this.sprites.Fall.framerate 
                this.currenframe=0
                }
                break;
                case 'attack1':
                if(this.image!==this.sprites.attack1.image){
                this.image=this.sprites.attack1.image
                this.framerate=this.sprites.attack1.framerate 
                this.currenframe=0
                }
                break;
                case 'takehit':
                if(this.image!==this.sprites.takehit.image){
                this.image=this.sprites.takehit.image
                this.framerate=this.sprites.takehit.framerate 
                this.currenframe=0
                }
                break;
                case 'death':
                if(this.image!==this.sprites.death.image){
                this.image=this.sprites.death.image
                this.framerate=this.sprites.death.framerate 
                this.currenframe=0
                }
                break
                
        }
    }
}