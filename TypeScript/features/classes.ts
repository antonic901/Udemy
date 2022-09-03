class Vehicle {
    // color: string;

    // constructor(color: string ) {
    //     this.color = color;
    // }

    // same as above 
    constructor(public color: string) {}

    protected honk(): void {
        console.log('beep')
    }
}

const vehicle = new Vehicle('orange')
vehicle.honk();
console.log(vehicle.color);

class Car extends Vehicle {

    constructor(public wheels: number, color: string) {
        super(color);
    }

    private drive(): void {
        console.log('vroom')
    }

    startDrivingProcess(): void {
        this.drive();
        this.honk();
    }
}

const car = new Car();
car.startDrivingProcess();
car.honk();