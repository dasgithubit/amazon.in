class Car{

    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = 0;
        this.isTrunkOpen = false;
        
        
        
    }

    displayInfo() {

        const trunkStatus = this.isTrunkOpen ? 'open' : 'close';
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h ${trunkStatus}`);
    }

    go() {

        if(!this.isTrunkOpen && this.speed<200) {
            this.speed += 5;
        }
        
        return this.speed;
        
    }

    brake() {

        if(this.speed>0){
            this.speed -= 5;
        }
        
        return this.speed;
    }

    openTrunk() {

        if(this.speed === 0){
            this.isTrunkOpen = true;
        }
         
        this.isTrunkOpen;
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}


class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go() {
        if(this.speed<300) {
            this.speed += this.acceleration;
        }

        return this.speed;
    }

    openTrunk() {
        console.log('Race cars do not have a trunk.');
      }
    
    closeTrunk() {
        console.log('Race cars do not have a trunk.');
      }

}

const raceCar = new RaceCar(
    {
        brand: 'McLaren',
        model : 'F1',
        acceleration : 20
    }
);
raceCar.go();
raceCar.go();
// make brand and model property private so that no one can outside the class
raceCar.brand = 'Posche';
raceCar.brake();
raceCar.go();
raceCar.displayInfo();
console.log(raceCar);



const car1 = new Car(
    {
        brand : 'Tesla',
        model : 256
    }
);
const car2 = new Car(
    {
        brand : 'Mahindra',
        model : 120
    }
);


car1.openTrunk();
car1.go();
car1.closeTrunk();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.brake();
car1.brake();
car1.openTrunk();
car1.displayInfo();


car2.go();
car2.go();
car2.openTrunk();
car2.brake();
car2.brake();
car2.openTrunk();
car2.go();
car2.closeTrunk();
car2.go();

car2.displayInfo();
console.log(car1);
console.log(car2);