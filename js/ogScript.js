const btn = document.querySelector("#btnsave");
const successMessage = document.getElementById("success-msg");

btn.addEventListener("click", function (e) {
    /*Nome do cachorro*/
    const dogname = document.querySelector("#dogname");
    const name = dogname.value;
    console.log(name);
    const currentTime = new Date().toLocaleString();


    /*Raça*/
    const selectBreed = document.getElementById("selectbreed");
    const selectedBreedName = selectBreed.options[selectBreed.selectedIndex].textContent;
    console.log(selectedBreedName)

    /*Cor da Fonte */
    const fontColorSelect = document.getElementById("font-color-select");
    const selectedFontColor = fontColorSelect.value;
    console.log(selectedFontColor)

    /*Estilo Fonte*/
    const fontSelect = document.getElementById("font-select");
    const selectedFont = fontSelect.value;
    e.preventDefault();
    console.log(selectedFont)

    const dataDogs = {
        name: name,
        breed: selectedBreedName,
        fontColos: selectedFontColor,
        fontStyle: selectedFont,
        dateTime: currentTime
    };

    localStorage.setItem('dataDogs', JSON.stringify(dataDogs));
    localStorage.setItem('dataDogs', JSON.stringify(dataDogs));

    $.ajax({
        type: "POST",
        url: "receive.php",
        data: dataDogs,
        success: function (response) {
            console.log("Resposta do PHP:", response);
            
            // Atualize a imagem com a URL obtida da API
            if (response && response.message) {
                const dogImage = document.getElementById("dogImage");
                dogImage.src = response.message;
            }
        },
       
    });
    

    successMessage.style.display = 'block';

});