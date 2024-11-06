const btn = document.querySelector("#btnsave");
const successMessage = document.getElementById("success-msg");

btn.addEventListener("click", function (e) {
    // Impede que o formulário seja enviado normalmente
    e.preventDefault();

    /* Nome do cachorro */
    const dogname = document.querySelector("#dogname");
    const name = dogname.value;

    /* Raça */
    const selectBreed = document.getElementById("selectbreed");
    const selectedBreedName = selectBreed.options[selectBreed.selectedIndex].value; // Agora usamos o valor, não o texto

    // Verifica se os campos obrigatórios estão preenchidos
    if (name.trim() === "" || selectedBreedName.trim() === "") {
        alert("Por favor, preencha o nome do cachorro e selecione a raça.");
        return; // Impede que o código continue executando
    }

    /* Cor da Fonte */
    const fontColorSelect = document.getElementById("font-color-select");
    const selectedFontColor = fontColorSelect.value;

    /* Estilo Fonte */
    const fontSelect = document.getElementById("font-select");
    const selectedFont = fontSelect.value;

    // Criação do objeto de dados
    const dataDogs = {
        name: name,
        breed: selectedBreedName,
        fontColor: selectedFontColor,
        fontStyle: selectedFont,
        dateTime: new Date().toLocaleString(),
    };

    // Gera uma URL de imagem aleatória para a raça selecionada
    const apiUrl = `https://dog.ceo/api/breed/${selectedBreedName}/images/random`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro na requisição.");
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === "success") {
                const dogImage = document.getElementById("dogImg");
                dogImage.src = data.message;
                dogImage.style.display = "block";
            } else {
                alert("Não foi possível obter a imagem do cachorro.");
            }
        })
        .catch((error) => {
            console.error("Erro na requisição Fetch:", error);
            alert("Ocorreu um erro ao obter a imagem do cachorro.");
        });

    // Exibe informações de texto sobre a imagem
    const txtOverImage = document.getElementById("txt-over-image");
    txtOverImage.innerText = dataDogs.name;
    txtOverImage.style.fontFamily = dataDogs.fontStyle;
    txtOverImage.style.color = dataDogs.fontColor;
    txtOverImage.style.display = "block";

    // Armazena os dados no localStorage
    localStorage.setItem("dataDogs", JSON.stringify(dataDogs));

    // Exibe a mensagem de sucesso
    successMessage.style.display = "block";
});
