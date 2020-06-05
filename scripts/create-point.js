function populateUFs(){
    const ufSelect=document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res=>res.json())//Uma forma diferente de escrever uma Arrow function
        .then(states=>{

            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }
        })
};
populateUFs();

function getCities(event){
    const citySelect=document.querySelector("select[name=city]");
    const stateInput=document.querySelector("[name=state");

    console.log(event.target.value);
    
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value=event.target.options[indexOfSelectedState].text;

    const ufValue=(event.target.value);
    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML=`<option value>Selecione a Cidade</option>`;
    citySelect.disabled=true;

    fetch(url)
    .then(res=>res.json())//Uma forma diferente de escrever uma Arrow function
    .then(cities=>{
        for(const city of cities){

            citySelect.innerHTML += `<option value="${city.nome}" class="teste">${city.nome}</option>`
        }
        citySelect.disabled=false
    })

};

document.querySelector("select[name=uf]")
        .addEventListener("change",getCities);

//Itens de Coleta
//Pegar todos os Li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for(let item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem);

}

const collectedItems=document.querySelector("input[name=items]");

let selectedItems=[];

function handleSelectedItem(event){
    const itemLi=event.target;
    
    //add or remove a class with javasript
    itemLi.classList.toggle("selected");

    const itemId=itemLi.dataset.id;



    //Verificar se existem itens selecionados se sim
    //pegar os itens selecionados.
    const alreadySelected = selectedItems.findIndex(item=>{
        const itemFound = item == itemId; //Se o ITEM já existir no Array retorna True para o const
        return itemFound;
    })
    //Se já estiver selecionado, tirar da seleção.
    if(alreadySelected>=0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item=>{ //filtrando caso o selecionado seja igual a um existente
            const itemIsDifferent = item!=itemId; //false
            return itemIsDifferent;
        })
        selectedItems=filteredItems;//e devolvendo sem o valor igual
    }

    else{
        //Se não estiver selecionado, adicionar a seleção.
        selectedItems.push(itemId);    
        }

        
    //atualizar o campo escondido com os itens selecionados
        collectedItems.value=selectedItems
        console.log(selectedItems);
    
    
}


