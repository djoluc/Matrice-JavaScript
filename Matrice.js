/*
* djoluc
*
* Matrice object 
**/

var Matrice = function(n, m){
    this.n = n;
    this.m = m;
    this.data = [];
    
    
    this.set = (i, j, value) => {
        if(i >= n || j >= m){
            console.log("Invalid value provided to matrice of "+this.n+"X"+this.m+" size");
            return;
        }
        this.data[i][j] = value;
        
        return this;
    };
    
    this.get = (i, j) => {
        if(i >= this.n || j >= this.m){
            console.log("Invalid value index provided");
            return;
        }
        return this.data[i][j];
    };
    
    this.rowCount = () => {
        return this.n;
    };
    
    this.columnCount = () => {
        return this.m;
    };
    
    this.toIdentity = () => {
        if(!this.isSquare()){
            console.log("There is no identity for not square matrice");
            return this;
        }
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                if(i == j){
                    this.data[i][j] = 1;
                }else{
                    this.data[i][j] = 0;
                }
            }
        }
        
        return this;
    };
    
    this.transpose = () => {
        let nData = new Array(this.m);
        for(let i = 0; i < this.m; i++){
            nData[i] = new Array(this.n);
            
            for(let j = 0; j < this.n; j++){
                nData[i][j] = this.data[j][i];
            }
        }
        
        this.data = nData;
        let tmp = this.n;
        this.n = this.m;
        this.m = tmp;
        
        return this;
    };
    
    this.sum = (M) => {
        if(!(M instanceof Matrice)){
            console.log("Please provide a valid matrice");
            return ;
        }
        
        if(M.rowCount() != this.n || M.columnCount() != this.m){
            console.log("Incomplatible matrice");
            return ;
        }
        
        let out = new Matrice(this.n, this.m);
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                out.set(i, j, this.get(i, j) + M.get(i, j));
            }
        }
        
        return out;
    };
    
    this.minus = (M) => {
        if(!(M instanceof Matrice)){
            console.log("Please provide a valid matrice");
            return ;
        }
        
        if(M.rowCount() != this.n || M.columnCount() != this.m){
            console.log("Incomplatible matrice");
            return ;
        }
        
        let out = new Matrice(this.n, this.m);
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                out.set(i, j, this.get(i, j) - M.get(i, j));
            }
        }
        
        return out;
    };
    
    this.valueTimes = (value) => {
        let out = new Matrice(this.n, this.m);
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                out.set(i, j, this.get(i, j)*value);
            }
        }
        
        return out;
    };
    
    this.times = (M) => {
        if(!(M instanceof Matrice)){
            console.log("Please provide a valid matrice");
            return ;
        }
        
        if(this.m != M.rowCount()){
            console.log("Incomplatible matrice");
            return ;
        }
        
        let out = new Matrice(this.n, this.m);
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                let tmpSum = 0;
                for(let k = 0; k < this.m; k++){
                    tmpSum += (this.get(i, k) * M.get(k, j));
                }
                out.set(i, j, tmpSum);
            }
        }
        
        return out;
    };
    
    this.isInvertible = () => {
        let out = false;
        
        if(this.isSquare() && this.det() !== 0){
            out = true;
        }
        
        return out;
    };
    
    this.inverte = () => {
        if(!this.clone().isInvertible()){
            console.log("This matrice is not invertible. Nothing will be done");
            return this;
        }

        return this.cofactor().transpose().valueTimes(1/this.det());
        
    };
    
    
    
    this.det = (M) => {
        if(!(M instanceof Matrice)){
            M = this;
        }
    
        let out = 0;
        
        if(!M.isSquare()){
            console.log("Invalid matrice. Need to be square matrice for determinant existance");
            return;
        }
        
        
        
        
        if(M.n === 1 && M.m === 1){
            out = M.get(0, 0);
        }else{
            for(let i = 0; i < M.n; i++){
                out += Math.pow(-1, i)*M.get(i, 0)*M.det(M.clone().rmRow(i).rmColumn(0));
            }
        }
        
        
        //console.log("det: "+out);
        return out;
    };
    
    this.cofactor = () => {
        if(!this.isSquare()){
            console.log("Invalid matrice. Need to be square matrice for cofactor existance");
            return;
        }
        
        let out = new Matrice(this.n, this.m);
        let tmpM = this.clone();
        
        for(let i = 0; i < tmpM.n; i++){
            for(let j = 0; j < tmpM.m; j++){
                out.data[i][j] = Math.pow(-1, i+j) * tmpM.clone().rmRow(i).rmColumn(j).det();
            }
        }
        
        return out;
    };
    
    this.rmRow = (r) => {
        if(r < 0 || r >= this.n){
            console.log("Invalid row");
            return;
        }
        
        let nData = new Array(this.n-1);
        for(let i = 0, ti = 0; i < this.n; i++){
            if(i === r){
                continue;
            }
            nData[ti] = new Array(this.m);
            
            for(let j = 0; j < this.m; j++){
                nData[ti][j] = this.data[i][j];
            }
            ti++;
        }
        
        this.data = nData;
        this.n = this.n-1;
        
        return this;
    };
    
    this.rmColumn = (c) => {
        if(c < 0 || c >= this.m){
            console.log("Invalid row. Nothing will be done");
            return this;
        }
        
        let nData = new Array(this.n);
        for(let i = 0; i < this.n; i++){
            nData[i] = new Array(this.m-1);
            
            for(let j = 0, tj = 0; j < this.m; j++){
                if(j === c){
                    continue;
                }
                nData[i][tj] = this.data[i][j];
                tj++;
            }
        }
        
        this.data = nData;
        this.m = this.m-1;
        
        return this;
    };
    
    
    this.clone = () => {
        return Matrice.fromArray(this.data);
    };
    
    this.reset = () => {
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                this.data[i][j] = 0;
            }
        }
        
        return this;
    };
    
    this.isSquare = () => {
        let out = false;
        
        if(this.n == this.m){
            out = true;
        }
        
        return out;
    };
    
    
    
    this.consoleDisplay = () => {
        console.log(this.toString());
        
        return this;
    };
    
    this.toString = () => {
        let out = "";
        
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                if(j == this.m-1){
                    out += this.data[i][j]+"\n\n";
                }else{
                    out += this.data[i][j]+"\t";
                }
            }
        }
        
        return out;
    };
    
    this.toHtmlString = () => {
        let out = "";
        
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                if(j == this.m-1){
                    out += this.data[i][j]+"<br><br>";
                }else{
                    out += this.data[i][j]+"&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;";
                }
            }
        }
        
        return out;
    
    };
    
    this.toHtmlElement = () => {
        let out = document.createElement("p");
        out.innerHTML = this.toHtmlString();
        
        return out;
    };
    
    
    this.init = () => {
        this.data = new Array(this.n);
        for(let i = 0; i < this.n; i++){
            this.data[i] = new Array(this.m);
            
            for(let j = 0; j < this.m; j++){
                this.data[i][j] = 0;
            }
        }
        
        return this;
    };
    
    this.init();
};

Matrice.fromJson = (data) => {
    return Matrice.fromArray(JSON.parse(data));
};

Matrice.fromArray = (array) => {
        if(!(array instanceof Array) || ((array instanceof Array) && array.length == 0)){
            console.log("Invalid matrice array");
        }else if(((array instanceof Array) && array.length > 0)){
            let n = array.length;
            let m = 0;
            var matrice = null;
            for(let i = 0; i < n; i++){
                if(!(array[i] instanceof Array)){
                    console.log("Invalid matrice array");
                    return;
                }
                
                if(i > 0 && array[i].length != m){
                    console.log("Invalid matrice array");
                    return;
                }
                
                if(i == 0){
                    m = array[i].length;
                    matrice = new Matrice(n, m);
                }
                
                for(let j = 0; j < m; j++){
                    matrice.set(i, j, array[i][j]);
                }
                
                
            }
            
            return matrice;
        }
    };
