class Pacman{
    constructor(){
        this.lives_remain = 5;
        this.interval = setInterval(UpdatePosition, 150);
        this.img_up = new Image(10,10);
        this.img_up.src = "./assets/images/pacman2-up.png";
        this.img_down = new Image(10,10);
        this.img_down.src = "./assets/images/pacman2-down.png";
        this.img_left = new Image(10,10);
        this.img_left.src = "./assets/images/pacman2-left.png";
        this.img_right = new Image(10,10);
        this.img_right.src = "./assets/images/pacman2-right.png";
        this.food_eaten = 0;
    }
}