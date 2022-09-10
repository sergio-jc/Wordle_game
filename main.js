let resultElement = document.querySelector(".result")
let mainContainer = document.querySelector(".main-container")
let rowId = 1

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ca2c316303msha7d48ee4d2beb6cp1a05f6jsnce7b94805ce6',
		'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
	}
};

fetch('https://1000-most-common-words.p.rapidapi.com/words/spanish?words_limit=20', options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        let world = response[0];
        let wordArray = world.toUpperCase().split("");
        
        let actualRow = document.querySelector(".row");
        
        drawSquares(actualRow)
        listenInput(actualRow)
        
        
        addFocus(actualRow)
        
        
        function listenInput (currentRow) {
            let squares = currentRow.querySelectorAll(".square")
            squares = [...squares]
        
            let userInput = []
        
            squares.forEach((element)=> {
            element.addEventListener("input", (event)=>{
                if(event.inputType !== "deleteContentBackward")
                {
                    //Recoger el ingreso del usuario
                    userInput.push(event.target.value.toUpperCase());
        
                    let nextElement = event.target.nextElementSibling
        
                    if (nextElement){
                        nextElement.focus()
                    } else {
                        //! Crear el arreglo con las letras -------------------------->
        
                        let squaresFilled = document.querySelectorAll(".square")
                        squaresFilled = [...squaresFilled]
                        squaresFilled.forEach(element=> {
                            console.log(element.value)
                        })
        
                        //Comparar arreglos para cambiar estilos
                        let rightIndex =  compareArrays(wordArray,userInput);
                        
                        rightIndex.forEach((element)=>{
                            squares[element].classList.add('green')
                        })
        
                        //Si los arreglos son iguales
                        if(rightIndex.length === wordArray.length) {
                            showResult("Ganaste!")
                            return;
                        }
        
                        //Comparar arreglos si existe alguna coincidencia
                        let existIndexArray =existLetter (wordArray, userInput)
                        existIndexArray.forEach((element)=>{
                            squares[element].classList.add("gold")
                        })
        
                        //Crear una nueva fila
                        let currentRow = createRow()
        
                        if (!currentRow) return;
                        
                        drawSquares(currentRow)
                        listenInput(currentRow)
                        addFocus(currentRow)
                    }
                } else {
                    userInput.pop()
                }  
                console.log(userInput)
            })
        })
        }
        
        function compareArrays (array1 , array2) {
            let iqualsIndex = []
            array1.forEach((element,index) =>{
                if(element === array2[index]){
                    console.log("hola ===" , index)
                    iqualsIndex.push(index)
                } else {
                    console.log("!=", index)
                }
            })
            return iqualsIndex
        }
        
        function existLetter (array1 , array2) {
            let existIndexArray = []
            array2.forEach((element, index)=>{
                // if (element !== array1[index] && array1.includes(element)) {
                //     existIndexArray.push(index)
                //    }
               if (array1.includes(element)) {
                existIndexArray.push(index)
               }
            });
            return existIndexArray
        }
        
        function createRow () {
            rowId++
            if(rowId <= 5 ){
                let newRow = document.createElement("div");
                newRow.classList.add("row");
                newRow.setAttribute("id", rowId)
                mainContainer.appendChild(newRow)
                console.log(newRow)
                return newRow;
            }  else {
                showResult(`Intentalo denuevo, la respuesta era "${world.toUpperCase()}" `)
            }
        }
        
        function drawSquares (actualRow) {
        
            wordArray.forEach((item,index) => {
                if(index===0){
                    actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`;
                } else {
                    actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
                }
              
            });
        }
        
        function addFocus (actualRow) {
            let focusElement = actualRow.querySelector(".focus")
            focusElement.focus()
        }
        
        function showResult (textMsg) {
            resultElement.innerHTML = `<p>${textMsg}</p>
            <button class="button">Reiniciar</button>`;
            let resetBtn = document.querySelector(".button")
            resetBtn.addEventListener("click" , ()=> {
                location.reload();
            })
        }



    }
        )
	.catch(err => console.error(err));

