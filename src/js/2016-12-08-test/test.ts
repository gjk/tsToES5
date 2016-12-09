class Animal {
	name:string;
	constructor(name:string){
		this.name=name;
	}

	move(method='run'){
		console.log(this.name + '的移动方式是：'+ method);
	}
};

class Dog extends Animal{
	constructor(name:string){
		super(name);
	}
}
