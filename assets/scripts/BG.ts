
import { _decorator, Component, Node, Prefab, instantiate, Input, input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('BG')
export class BG extends Component {
    @property({type:Prefab})
    box:Prefab
    mainBG:any;
    scheduler:any=false;
    start () {
        let temp:any=this.node;
        this.mainBG=temp.getComponent('mainBG');
    }
    onJoinBtnClick(){
        let temp=instantiate(this.box);
        this.node.addChild(temp);
        temp.setPosition(Math.floor(Math.random()*400),0,0);
        this.mainBG.connectToRoom(temp.position)
        temp.name='temp';
        let joinBtn=this.node.getChildByName('joinBtn');
        let leaveBtn=this.node.getChildByName('leaveBtn');
        let infoBtn=this.node.getChildByName('infoBtn');
        joinBtn.active=false;
        leaveBtn.active=true;
        infoBtn.active=true;
        this.scheduler=true;
    }
    onInfoBtnClick(){
        this.mainBG.info();
    }
    onLeaveBtnClick(){
        this.mainBG.leave();
        let joinBtn=this.node.getChildByName('joinBtn');
        let leaveBtn=this.node.getChildByName('leaveBtn');
        let infoBtn=this.node.getChildByName('infoBtn');
        joinBtn.active=true;
        leaveBtn.active=false;
        infoBtn.active=false;
        input.off(Input.EventType.KEY_DOWN,this.keyPressed,this);
    }
    addBoxToPosition(position:any,boxName:any){
        if(!this.node.getChildByName(boxName)){
            let temp=instantiate(this.box);
            this.node.addChild(temp);
            temp.setPosition(position.x,position.y,position.z);
            temp.name=boxName;
        }
    }
    keyPressed(event:EventKeyboard){
        this.mainBG.changePosition(event.keyCode);
    }
    update(){
        if(this.scheduler){
            input.on(Input.EventType.KEY_DOWN,this.keyPressed,this);
            this.scheduler=false;
        }
    }
}
