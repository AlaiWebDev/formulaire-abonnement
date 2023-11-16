console.log("Script chargé !");
const listAddress = document.querySelector(".address-list");
let addressDatas = [];

const fetchAddress = async () => {
    document.querySelectorAll("#input_street_bill, #input_street_deliv").forEach(inputStreet => {
        inputStreet.addEventListener("input", async (eventInput) => {
            if (eventInput.target.value.length > 3) {
                const addressUrl = "https://api-adresse.data.gouv.fr/search/";
                const queryParams = new URLSearchParams({
                q: eventInput.target.value
                });
                console.log(queryParams.toString());
                const URL = `${addressUrl}?${queryParams}`;
                console.log(URL);
                const response = await fetch(URL);
                const data = await response.json();
                addressDatas = data.features;
                console.log(addressDatas);
                injectListAddress();
                document.querySelectorAll("li").forEach(li => {
                    console.log("li ", li);
                    li.addEventListener("click", (eventClick) => {
                        console.log(eventClick.target.innerText);
                        const arrayAddress = (eventClick.target.innerText).split(" ");
                        console.log(arrayAddress);
                        console.log(arrayAddress[arrayAddress.length - 1]);
                        const copyAddress = arrayAddress.slice(0, -2); // Exclut les deux derniers éléments
                        document.querySelector("#input_street_bill").value = copyAddress.join(" ");
                        document.querySelector("#input_city_bill").value = arrayAddress[arrayAddress.length - 1];
                        document.querySelector("#input_zipcode_bill").value = arrayAddress[arrayAddress.length - 2];
                        document.querySelector("#input_street_deliv").value = copyAddress.join(" ");
                        document.querySelector("#input_city_deliv").value = arrayAddress[arrayAddress.length - 1];
                        document.querySelector("#input_zipcode_deliv").value = arrayAddress[arrayAddress.length - 2];
                        listAddress.innerHTML = "";
                    })
                })
                }
        })
    })
    document.querySelector("#input_street_bill").addEventListener("input", async (eventInput) => {
        if (eventInput.target.value.length > 3) {
            const addressUrl = "https://api-adresse.data.gouv.fr/search/";
            const queryParams = new URLSearchParams({
            q: eventInput.target.value
            });
            console.log(queryParams.toString());
            const URL = `${addressUrl}?${queryParams}`;
            console.log(URL);
            const response = await fetch(URL);
            const data = await response.json();
            addressDatas = data.features;
            console.log(addressDatas);
            injectListAddress();
            document.querySelectorAll("li").forEach(li => {
                console.log("li ", li);
                li.addEventListener("click", (eventClick) => {
                    console.log(eventClick.target.innerText);
                    const arrayAddress = (eventClick.target.innerText).split(" ");
                    console.log(arrayAddress);
                    console.log(arrayAddress[arrayAddress.length - 1]);
                    const copyAddress = arrayAddress.slice(0, -2); // Exclut les deux derniers éléments
                    document.querySelector("#input_street_bill").value = copyAddress.join(" ");
                    document.querySelector("#input_city_bill").value = arrayAddress[arrayAddress.length - 1];
                    document.querySelector("#input_zipcode_bill").value = arrayAddress[arrayAddress.length - 2];
                    document.querySelector("#input_street_deliv").value = copyAddress.join(" ");
                    document.querySelector("#input_city_deliv").value = arrayAddress[arrayAddress.length - 1];
                    document.querySelector("#input_zipcode_deliv").value = arrayAddress[arrayAddress.length - 2];
                    listAddress.innerHTML = "";
                })
            })
            }
    });
}
fetchAddress();
document.querySelectorAll(".addresse-livraison input").forEach(inputText => {
    inputText.addEventListener("mousedown", (eventMouseDown) => {
        eventMouseDown.target.value = "";
    })
});
document.querySelector("button").addEventListener("click", (eventClick) => {
    console.log(eventClick);
    document.querySelector(".injecter").innerHTML = document.querySelector("#input_lastname").value;

})
const injectListAddress = () => {
    listAddress.innerHTML = "";
    addressDatas.forEach(({properties}, index) => {
        const li = document.createElement("li");
        const p1 = document.createElement("p");
        p1.textContent = properties.label;
        li.appendChild(p1);
        li.classList.add("content")
        listAddress.appendChild(li);
    })
}

