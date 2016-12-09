/**
 * 练习使用的
 */
class Animal {
	name:string;
	constructor(name:string){
		this.name=name;
	}

	//移动方法
	move(method='run'){
		console.log(this.name + '的移动方式是：'+ method);
	}
};

/*
 * 继承
 */
class Dog extends Animal{
	constructor(name:string){
		super(name);
	}
}
