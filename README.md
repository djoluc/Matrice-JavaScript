# Matrice-JavaScript
Matrice representation and operations in pure JavaScript language

# usage example: 
<code>
let matrice = new Matrice(2, 4);
  
let M = Matrice.fromJson("[[0, 0], [1, 1]]");

let m = Matrice.fromArray([
	[1, 1, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7], 
	[1, 2, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7], 
	[2, 4, 5, 4, 6, 7, 4, 6, 7, 4, 6, 7], 
	[1, 1, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7], 
	[1, 2, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7],
	[1, 1, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7], 
	[1, 2, 2, 4, 6, 7, 4, 6, 70, 45, 6, 7],
	[1, 1, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7], 
	[1, 2, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7],
	[1, 1, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7], 
	[1, 2, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7], 
	[1, 2, 2, 4, 6, 7, 4, 6, 7, 4, 6, 7]
	]);
  
  
  let test = new Matrice(8, 8);
	 test.toIdentity()
		 .set(0, 1, 17)
		 .set(0, 0, 15)
		 .set(1, 0, 1)
		 .set(1, 7, 5)
		 .set(1, 5, 6)
		 .set(6, 5, 6)
		 .set(6, 4, 11)
		  .set(6, 2, 19)
		  .set(6, 1, 13)
		 .set(1, 3, 4);
	 
	 console.log(test.det())
	 
	let clo = test.clone().consoleDisplay()
	 .inverte()
	 .consoleDisplay()
	 .times(test)
	 .consoleDisplay();
</code>

