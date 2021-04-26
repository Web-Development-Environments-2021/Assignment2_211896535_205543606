
class Board{
    constructor(){
        this.rows_num = 18;
        this.cols_num = 30;
        this.cell_width = document.getElementById("canvas").width/this.cols_num;
        this.cell_height =document.getElementById("canvas").height/this.rows_num;
        this.cnt = this.rows_num * this.cols_num
    }
}