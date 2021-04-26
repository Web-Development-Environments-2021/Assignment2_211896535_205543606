
class Board{
    constructor(){
        this.rows_num = 17;
        this.cols_num = 27;
        this.cell_width = document.getElementById("canvas").width/this.cols_num;
        this.cell_height =document.getElementById("canvas").height/this.rows_num;
        this.cnt = this.rows_num * this.cols_num
    }
}