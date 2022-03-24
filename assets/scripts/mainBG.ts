
import { _decorator, Component, Node, Prefab, instantiate, KeyCode } from 'cc';
import Network from './network';
const { ccclass, property } = _decorator;

@ccclass('mainBG')
export class mainBG extends Component {
    photon:Network;
    BG:any;
    start () {
        let temp=this.node;
        this.BG=temp.getComponent('BG');
        this.photon=new Network();
        this.photon.abc(this.node.getComponent('mainBG'));
        this.photon.connectToRegionMaster('IN');
    }
    connectToRoom(position:any){
        let boxName=this.photon.connectToRoom(position);
    }
    info(){
        this.photon.info();
        console.log(this.node.children);
    }
    addBoxToPosition(position:any,boxName:any){
        this.BG.addBoxToPosition(position,boxName);
    }
    setName(boxName:any){
        let temp=this.node.getChildByName('temp');
        temp.name=boxName;
    }
    leave(){
        console.log(this.node.children);
        this.photon.leaveRoom();
        // while(this.node.children.length>3){
        //     let children=this.node.children;
        //     let removedChild=children.pop();
        // }
    }
    removeBox(boxName:any){
        let temp=this.node.getChildByName(boxName);
        console.log(temp);
        if(temp){
            this.node.removeChild(temp);
            temp.destroy();
        }
    }
    changePosition(keyCode:KeyCode){
        let temp=this.node.getChildByName(this.photon.myActor().actorNr+"")
        let position=temp.position;
        switch(keyCode){
            case KeyCode.ARROW_UP:
                temp.setPosition(position.x,position.y+10,position.z);
                break;
            case KeyCode.ARROW_DOWN:
                temp.setPosition(position.x,position.y-10,position.z);
                break;
            case KeyCode.ARROW_LEFT:
                temp.setPosition(position.x-10,position.y,position.z);
                break;
            case KeyCode.ARROW_RIGHT:
                temp.setPosition(position.x+10,position.y,position.z);
                break;
        }
        this.photon.myActor().setCustomProperty("box",temp.position)
}
    changeBoxPosition(boxName:any,position:any){
        let child=this.node.getChildByName(boxName);
        child.setPosition(position.x,position.y,position.z);
    }
}