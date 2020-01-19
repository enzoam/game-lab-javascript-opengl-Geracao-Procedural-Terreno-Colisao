var THREEx	= THREEx	|| {}

gamejsPlayer	= function(){
	
	//	UPDATE
	
	var updateFcts= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}.bind(this)	

	//	PERSONAGEM
	var character	= new gamejsChar()
	this.character	= character
		
	//	CONTROLES	
	var controls	= new gamejsControls(character.root)
	this.controls	= controls
	updateFcts.push(function(delta, now){
		controls.update(delta, now)
	})
}
