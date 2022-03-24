export default class Network extends Photon.LoadBalancing.LoadBalancingClient{
    mainBG:any;
    constructor(){
        super(1,"bd8c5dd6-b274-4cbf-8931-09078c30a8c1","1.0.0");
    }
    connectToRoom(position:any){
        this.joinRoom('123',{createIfNotExists:true},{maxPlayers:10});
        this.myActor().setCustomProperty('box',position);
    }
    onJoinRoom(): void {
        this.mainBG.setName(this.myActor().actorNr+"");
    }
    onActorJoin(): void {
        for(let actor of Object.values(this.myRoomActors())){
            if(!actor.isLocal){
                this.mainBG.addBoxToPosition(actor.getCustomProperty('box'),actor.actorNr+"")
            }
        }
    }
    onActorPropertiesChange(actor: Photon.LoadBalancing.Actor): void {
        this.mainBG.changeBoxPosition(actor.actorNr+"",actor.getCustomProperty('box'));
    }
    onActorLeave(actor: Photon.LoadBalancing.Actor, cleanup: boolean): void {
        console.log(actor.actorNr,cleanup);
        this.mainBG.removeBox(actor.actorNr+"");
    }
    abc(nodeScript:any){
        this.mainBG=nodeScript;
    }
    info(){
        console.log(this.myRoomActors());
    }
}