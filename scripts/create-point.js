function populateUFs(){
    const ufSelect=document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res=>res.json())//Uma forma diferente de escrever uma Arrow function
        .then(states=>{

            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }
        })
}
populateUFs();

function getCities(event){
    const citySelect=document.querySelector("select[name=city]");
    const stateInput=document.querySelector("[name=state");

    console.log(event.target.value);
    
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value=event.target.options[indexOfSelectedState].text;

    const ufValue=(event.target.value);
    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then(res=>res.json())//Uma forma diferente de escrever uma Arrow function
    .then(cities=>{
        for(const city of cities){

            citySelect.innerHTML += `<option value="${city.id}" class="teste">${city.nome}</option>`
        }
        citySelect.disabled=false
    })

}

document.querySelector("select[name=uf]")
        .addEventListener("change",getCities)
