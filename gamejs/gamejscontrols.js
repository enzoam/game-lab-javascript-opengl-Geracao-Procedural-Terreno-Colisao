var THREEx	= THREEx || {};

gamejsControls	= function(object3d, input){
	input		= input	|| {}

	this.speed	= 5;
	this.lateralMove= 'rotationY';
	this.input	= input;
	this.object3d	= object3d;
	
	//Controle
	this.update	= function(delta, now){
		var prevPosition	= object3d.position.clone();
		// teclado
		if( this.lateralMove === 'rotationY' ){
			// lateral => rotacao Y
			if( input.left ){	object3d.rotation.y += 0.1 * delta * Math.PI * 2;}
			if( input.right ){	object3d.rotation.y -= 0.1 * delta * Math.PI * 2;}
		}else if( this.lateralMove === 'strafe' ){
			// lateral => desliza
			var distance	= 0;
			if( input.left )	distance	= +this.speed * delta;
			if( input.right )	distance	= -this.speed * delta;
			if( distance ){
				var velocity	= new THREE.Vector3(distance, 0, 0);
				var matrix	= new THREE.Matrix4().makeRotationY(object3d.rotation.y);
				velocity.applyMatrix4( matrix );
				object3d.position.add(velocity);
			}		
		}else	console.assert(false, 'this.lateralMove invalid: '+this.lateralMove);

		var distance	= 0;
		if( input.up )		distance	= +this.speed * delta;
		if( input.down )	distance	= -this.speed * delta;
		if( distance ){
			var velocity	= new THREE.Vector3(0, 0, distance);
			var matrix	= new THREE.Matrix4().makeRotationY(object3d.rotation.y);
			velocity.applyMatrix4( matrix );
			object3d.position.add(velocity);
		}
	}
}
