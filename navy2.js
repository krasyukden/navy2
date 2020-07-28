"use strict";
// console.log -как отлаживать без консоли ???
// рекурсия setTimeout


// схема
// class Watercraft
//    _status: Boolean 
//    _power: Number (0 - 4) 
//    _speed: Number 
//    getStatus(): Boolean 
//    getPower(): Number 
//    getSpeed(): Number 
//    on(): void
//    off(): void
//    increasePower(): void
//    decreasePower(): void



// установка скорости в ручную и автом. разгон
// асинхронка
   // для слабаков: смоделировать набор скорости при вызове метода on()
   // для умничек: для слабаков + ограничить макс. скорость через this._speed
   // для красавчиклв: для умничек для метода off()

// Boat
//   _types
//   _speed
//   _status
//   _name
//   _type
// _power

function Watercraft(){
	this._speed = 0;
	this._power = 0; // 0 - 4
	this._status = false;
	
}

Watercraft.prototype.getStatus = function(){
	return this._status;
}

Watercraft.prototype.getSpeed = function(){
	return this._speed;
}

Watercraft.prototype.getPower = function(){
	return this._power;
}



Watercraft.prototype.on = function () {
	this._status = true;
}

Watercraft.prototype.increasePower = function (delay){
	if(this._status == true && this._power < 4){
		this._power++;
	
	
	 var timeId = setInterval ( () => {
		console.log(this.getSpeed());
		this._speed = this._speed + 5;
	 switch (this._power){
		case 0: 
			this._speed = 0;
			clearInterval(timeId);
			 //console.log(this.getSpeed());
			break;
		case 1:
			
			if(this._speed > 11){
				this._speed = 12;
				//console.log(this.getSpeed());
				clearInterval(timeId);
				
			};
			break;
		case 2:
			
			if(this._speed > 27){
				this._speed = 28;
				//console.log(this.getSpeed());
				clearInterval(timeId);
			};
			break;
		case 3:
			if(this._speed > 59){
				this._speed = 60;
				//console.log(this.getSpeed());
				clearInterval(timeId);
			};
			break;	
		case 4:
			if(this._speed > 74){
				this._speed = 75;
				//console.log(this.getSpeed());
				clearInterval(timeId);
			};
			break;		
	    }
	  }, delay);
	
		
	}	
}



Watercraft.prototype.decreasePower = function (delay){
	if(this._status == true && this._power > 0){
		this._power--;
	
	
	 var timeId = setInterval ( () => {
		//console.log(this.getSpeed());
		this._speed = this._speed - 8;
	 switch (this._power){
		case 0: 
			
			
			if(this._speed <= 0){
			
			//console.log(this.getSpeed());
			clearInterval(timeId);
			this._speed = 0;}
			break;
		case 1:
			
			if(this._speed <= 12){
				
				//console.log(this.getSpeed());
				clearInterval(timeId);
				
			};
			break;
		case 2:
			
			if(this._speed <= 28){
				this._speed = 28;
				//console.log(this.getSpeed());
				clearInterval(timeId);
			};
			break;
		case 3:
			if(this._speed <= 60){
				this._speed = 60;
				//console.log(this.getSpeed());
				clearInterval(timeId);
			};
			break;	
		
	    }
	  }, delay);
	
		
	}	
}



Watercraft.prototype.off = function(delay){
		this._status = false;	
		//this._power = 0;
		
		var timeId = setInterval ( () => {
			if(this._speed >= 8){
				this._speed = this._speed - 8;
			}	
			else {
				this._speed = 0;
				this._power = 0;
				clearInterval(timeId);
			}
						
			console.log(this.getSpeed());
			
		}, delay)	
		
}


Watercraft.prototype.getType = function (){
	return this._type;
}

Watercraft.prototype.getName = function (){
	return this._name;
}


// наследник - Boat

function Boat(name, type) {
	Watercraft.call(this, name, type);
	if (typeof name === "string" && name.length > 2){
		this._name = name;
	} else {
      this._name = "Boat"; 
    }
    if (Boat.types.indexOf(type) >= 0) {//Boat.types - static
      this._type = type;
	  
   }
   else {
	   throw new Error("Enter correct type");
   }
	//Boat.types = ["fishingBoat", "pilot", "sailing"]; // static// Почему ошиб если в конструкторе?
	
	
}
Boat.types = ["fishingBoat", "pilot", "sailing"]; // static
Boat.prototype = Object.create(Watercraft.prototype);
Boat.prototype.constructor = Boat; 




Boat.prototype.setType = function (t){ // 
	
	if(Boat.types.indexOf(t) >= 0){
		this._type = t;
	}
	/*this._types.forEach( (v) => {// 2 вар, работ
		if(t == v){
			this._type = t;// если не => Cannot set property '_type' of undefined
		}
	})*/
}



// Наследник //Launch - катер

function Launch (name, type){
	Watercraft.call(this, name, type);
	//this._types = ["jetski", "launch"]; // static
	this._levelPetrol = 0;
	if (typeof name === "string" && name.length > 2){
		this._name = name;
	} else {
      this._name = "Launch"; 
      
   }
   
   if(Launch.types.indexOf(type)>= 0){
	   this._type = type;
   }
   else{
	   throw new Error("Enter correct type 2");
   }
	
}
Launch.types = ["jetski", "launch"];// static
Launch.prototype = Object.create(Watercraft.prototype);
Launch.prototype.constructor = Launch;

Launch.prototype.setPetrol = function(level){
	if(typeof level === "number" && !isNaN(level) && 0 < level && level <= 40){
		this._levelPetrol = level;
	}	
}
Launch.prototype.getPetrol = function(){
	return this._levelPetrol;
}	

Launch.prototype.on = function(){// полиморфизм расшир 
	
	if (this._levelPetrol >= 1){// НЕ РАБОТ !!!! ???????
		console.log("sos");
		Watercraft.prototype.on.call(this); // 
		
		//this._status = true;
	
	}	
}


Launch.prototype.setType = function (t){ 
	
	if(Launch.types.indexOf(t) >= 0){
		this._type = t;
	}
	
}


	
var sailing = new Boat("Rose", "fishingBoat");
var launch = new Launch("Medusa", "launch");

console.log(sailing.getStatus());
sailing.on();
console.log(sailing.getStatus());
console.log(sailing.getPower());
sailing.increasePower(1000);
sailing.increasePower(1000);
sailing.increasePower(1000);
sailing.increasePower(1000);
//sailing.decreasePower(6000);// только до 28 разгон
//sailing.decreasePower(7000);
console.log(sailing.getPower());
console.log(sailing.getSpeed());
sailing.off(5000);
console.log(sailing.getStatus());
console.log(sailing.getPower());


/*sailing.on(3000)
	.then( (result) => {
			
		return sailing.on(2000);
		
	})
	.then( (result) => {
		
		
		return sailing.on(2000);
		
	})
	.then( (result) => {
		
		
		return sailing.on(1000);
		
	})
sailing.off(9000)
	.then( (result) => {
		
		return sailing.off(2000);
	})
	.then( (result) => {
		
		return sailing.off(2000);
	})
	
console.log(sailing.getStatus());

console.log(sailing.getName());
console.log(sailing.getType());
sailing.setType("pilot");
console.log(sailing.getType());
/*sailing.setSpeed(2);
console.log(sailing.getSpeed());
sailing.increaseSpeed();
sailing.increaseSpeed();
sailing.decreaseSpeed();
console.log(sailing.getSpeed());
sailing.off();
console.log(sailing.getStatus());*/


/*
launch.on();
console.log(launch.getStatus());
console.log(launch.getName());
console.log(launch.getType());
launch.setType("jetski");
console.log(launch.getType());
*/
/*launch.setSpeed(4);
launch.increaseSpeed();
launch.increaseSpeed();
launch.decreaseSpeed();
console.log(launch.getSpeed());*/

launch.setPetrol(35);
console.log(launch.getPetrol());
console.log(launch.getStatus());
/*
launch.on(3000)
	.then( (result) => {
		
		
		return launch.on(2000);
		
	})
	.then( (result) => {
		
		
		return launch.on(2000);
		
	})
	.then( (result) => {
		
		
		return launch.on(1000);
		
	})


//launch.on();
console.log(launch.getStatus());
launch.off(9000)
	.then( (result) => {
		
		return launch.off(2000);
	})
	.then( (result) => {
		
		return launch.off(2000);
	})

console.log(launch.getStatus());


/*Watercraft.prototype.setSpeed = function(value){ // !
	if(typeof value === "number" && !isNaN(value) && 0 <= value && value <= 60){
		this._speed = value;
	}
}*/

/*Watercraft.prototype.speedLevel = function(value) {
		if(typeof value == "number" && !isNaN(value) && value >= 0 && value <= 3){
			this._power = value;
		}
	
		
}*/








