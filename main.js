var button = document.getElementById("my-button");
var fileInput = document.getElementById("my-file");
var itemsContainer = document.getElementById("items-container");
var dropZone = document.getElementById("upload-section")

function createList(files) { 

    var selectedFile = files;
    if (selectedFile) {

        var listItem = document.createElement("li");
        var itemFormatDiv = document.createElement("div");
        itemFormatDiv.className = "item-format";
        if (selectedFile.type === "application/pdf") {
            itemFormatDiv.innerHTML = '<i class="page fa-regular fa-file-pdf"></i>';
        } else if (selectedFile.type === "image/jpeg") {
            itemFormatDiv.innerHTML = '<i class="page fa-regular  fa-file-image"></i>';
        } else if (selectedFile.type === "image/png") { 
            itemFormatDiv.innerHTML = '<i class="page fa-regular  fa-file-image"></i>';
        }
    

        var itemProgressDiv = document.createElement("div");
        itemProgressDiv.className = "item-progress";

        var itemNameDiv = document.createElement("div");
        itemNameDiv.className = "item-name";
        itemNameDiv.textContent = selectedFile.name;
        itemProgressDiv.appendChild(itemNameDiv);

        var itemProgressContainer = document.createElement("div")
        itemProgressContainer.className = "progress-container"

        var itemProgressBar = document.createElement("div")
        itemProgressBar.className = "progress-bar"
        itemProgressBar.id = "my-progress-bar"

        itemProgressContainer.appendChild(itemProgressBar)
        itemProgressDiv.appendChild(itemProgressContainer)


        var itemFileOptions = document.createElement("div")
        itemFileOptions.className = "file-options"

        itemProgressDiv.appendChild(itemFileOptions)



        var itemOptionsDiv = document.createElement("div");
        itemOptionsDiv.className = "item-options";
        itemOptionsDiv.innerHTML = '<i id="delete" class="trash fa-regular fa-trash-can"></i>';

        listItem.appendChild(itemFormatDiv);
        listItem.appendChild(itemProgressDiv);
        listItem.appendChild(itemOptionsDiv);

        itemsContainer.appendChild(listItem);

        var deleteButton = itemOptionsDiv.querySelector("#delete");
        if (deleteButton) {
            deleteButton.addEventListener("click", function () {
                itemsContainer.removeChild(listItem);
            });
        }

        var itemFileOptionsView = document.createElement("div")
        itemFileOptionsView.id = "view-file"; 
        itemFileOptionsView.textContent = "View file";

        itemFileOptionsView.addEventListener("click", function () {
            var fileURL = URL.createObjectURL(selectedFile);
            window.open(fileURL, "_blank");
        });

  

        var itemFileOptionsShare = document.createElement("div")
        itemFileOptionsShare.id = "share-link"
        itemFileOptionsShare.textContent = "Share link"

        itemFileOptionsShare.addEventListener("click", function () {
             var fileURL = URL.createObjectURL(selectedFile);


        var shareableLink = document.createElement("a");
        shareableLink.href = fileURL;
        shareableLink.target = "_blank";
        shareableLink.textContent = "Click to download";

  
        itemFileOptionsShare.textContent = ""; 
        itemFileOptionsShare.appendChild(shareableLink);
        });

        itemFileOptions.appendChild(itemFileOptionsShare);
        itemFileOptions.appendChild(itemFileOptionsView);
        itemProgressDiv.appendChild(itemFileOptions);

    }
    
}

button.addEventListener("click", function () {
    fileInput.click();
});


fileInput.addEventListener("change", function () {
    createList()
});


dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.border = '2px dashed #333';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.border = '2px dashed #007bff';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.border = '2px dashed #007bff';
    const files = e.dataTransfer.files[0];
    console.log(files)
    createList(files)
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files[0];
    console.log(files)
    createList(files)
});

