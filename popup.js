const btn = document.querySelector(".changeColorBtn")
const colorGrid = document.querySelector(".colorGrid")
const colorValue = document.querySelector(".colorValue")

btn.addEventListener("click", async()=>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    // console.log("clicked", tab);
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: pickColor
    }, async(injectionResults)=>{
        // console.log(injectionResults, "injectionResults");
        const [data] = injectionResults
        if(data.result){
            const color = data.result.sRGBHex
            colorGrid.style.backgroundColor = color
            colorValue.innerText = color
            try {
                await navigator.clipboard.writeText(color)
            } catch (error) {
                console.log(error, " error ");
            }
        }
    })
})

async function pickColor (){
    try {
        const eyeDropper = new EyeDropper();
        const selectedColor = await eyeDropper.open();
        console.log(selectedColor, "selectedColor");
        return selectedColor
    } catch (error) {
        console.log(error, " error ");
    }
    // console.log("scripts running ");
}