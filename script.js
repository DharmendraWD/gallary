let gallaryImagesData = [
    {
        img: "images/65GA_20810724.jpg",
        para: "this is image 1",
    },
    {
        img: "images/about3.jpg",
        para: "this is image 2",
    },
    {
        img: "images/amdaDoctor.png",
        para: "this is image 3",
    },
    {
        img: "images/Capture.PNG",
        para: "this is image 4",
    },
    {
        img: "images/doctor.png",
        para: "this is image 5",
    },
    {
        img: "images/ladyDOctor.png",
        para: "this is image 6",
    },
    {
        img: "images/patients-removebg-preview.png",
        para: "this is image 7",
    },
]

let gallaryMainWrapper = document.getElementById("gallaryMainWrapper");
gallaryImagesData.forEach((eachGallaryImg, index) => {
    let divGallary = document.createElement("DIV");   // fisrt div
    let div2Gallary = document.createElement("DIV");  //sec div
    let imgGallary = document.createElement("IMG");  // img
    let buttonxcu = document.createElement("BUTTON");  // button

    divGallary.classList.add("group", "cursor-pointer", "relative");
    imgGallary.classList.add(
        "w-full",
        "h-48",
        "object-cover",
        "rounded-lg",
        "transition-transform",
        "transform",
        "scale-100",
        "group-hover:scale-105"
    );
    div2Gallary.classList.add(
        "absolute",
        "inset-0",
        "flex",
        "items-center",
        "justify-center",
        "opacity-0",
        "group-hover:opacity-100",
        "transition-opacity",
        "gallaryThumbnail"
    );
    buttonxcu.classList.add(
        "bg-white",
        "text-gray-800",
        "px-4",
        "py-2",
        "rounded-lg",
        "hover:bg-gray-200",
        "transition-colors",
        "gallaryThumViewBtn"
    );
    buttonxcu.setAttribute("data-target", index);  //seeting index in view buttoon 
    div2Gallary.setAttribute("data-target", index) //setting index in parent of thumbnail



    imgGallary.src = eachGallaryImg.img;
    buttonxcu.textContent = "View"
    divGallary.appendChild(imgGallary);
    div2Gallary.appendChild(buttonxcu);
    divGallary.appendChild(div2Gallary);

    gallaryMainWrapper.append(divGallary)



})

// WHEN CLICK ON ANY THUMBLNAIL 
const gallaryOpenModalBtn = document.getElementById("gallaryOpenModalBtn");
const gallaryCloseModalBtn = document.getElementById("gallaryCloseModalBtn");
const gallaryModalOverlay = document.getElementById("gallaryModalOverlay");
const gallaryModalBox = document.getElementById("gallaryModalBox");
const closeGalaryImage = document.getElementById("closeGalaryImage");
const gallaryDescription = document.getElementById("gallaryDescription");
const largeImageClciked = document.getElementById("largeImageClciked");
let gallaryCurrentIndex = '';


// function to change image index 
const getImageIndex = (clikedImageGallryId) => {
    gallaryCurrentIndex = clikedImageGallryId;
    largeImageClciked.src = gallaryImagesData[gallaryCurrentIndex].img;
    gallaryDescription.textContent = gallaryImagesData[gallaryCurrentIndex].para;
    console.log(largeImageClciked);
}


//  function to show gallary gallary image 
const showGallaryImageInLarge = (clikedImageGallryId) => {
    gallaryModalOverlay.classList.remove("hidden");
    gallaryModalBox.classList.remove("gallary-modal-exit", "gallary-modal-exit-active");
    gallaryModalBox.classList.add("gallary-modal-enter");

    // Trigger transition
    requestAnimationFrame(() => {
        gallaryModalBox.classList.add("gallary-modal-enter-active");
    });
    getImageIndex(clikedImageGallryId)
}

// function   to close image view mode  when clicked 
const hideGallaryImageInLarge = () => {
    gallaryModalBox.classList.remove("gallary-modal-enter", "gallary-modal-enter-active");
    gallaryModalBox.classList.add("gallary-modal-exit");

    requestAnimationFrame(() => {
        gallaryModalBox.classList.add("gallary-modal-exit-active");
    });

    // Hide overlay after transition
    setTimeout(() => {
        gallaryModalOverlay.classList.add("hidden");
    }, 300);
}
// if clicked on class "gallaryThumbnail", "gallaryThumViewBtn" then only open to view image 
//--> if user clicked in thumbnail or view button then only open view sexction 
document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("gallaryThumViewBtn") || target.classList.contains("gallaryThumbnail")) {
        const clikedImageGallryId = parseInt(target.getAttribute("data-target"), 10);  // get cliked image indecx
        showGallaryImageInLarge(clikedImageGallryId)
    }
});
// close gallary image when clicke don close 
closeGalaryImage.addEventListener("click", () => {
    hideGallaryImageInLarge()
});

// ------------------------------------when click on particular image it shows ------------------------
let gallaryNextPrevBtn = document.getElementById("gallaryNextPrevBtn");
const changeGallaryImageWithArrow = () => {

}


// do gallary next function 
const doGallaryNext = () => {
    if (gallaryCurrentIndex >= gallaryImagesData.length - 1) {
        gallaryCurrentIndex = 0;
        getImageIndex(parseInt(gallaryCurrentIndex))
    }
    else {
        getImageIndex(parseInt(gallaryCurrentIndex + 1))

    }
}
// do galary prev function 
const doGallaryPrev = () => {
    if (gallaryCurrentIndex <= 0) {
        getImageIndex(parseInt(gallaryImagesData.length - 1))
    }
    else {
        getImageIndex(parseInt(gallaryCurrentIndex - 1))

    }
}


gallaryNextPrevBtn.addEventListener("click", (event) => {
    if (event.target.id == "gallaryImgNext29") {   //if clicked on next btn 
        doGallaryNext()
    }

    if (event.target.id == "gallaryImgPrev29") { // if clicked on prev btn 
        doGallaryPrev()
    }
})

// start slide show 
let gallarySlideShow = document.getElementById("gallarySlideShow");
let slideshowInterval;
let isSlideShowOn = false;
let gallaryprogressBar = document.getElementById("gallaryprogressBar");

// function to show progress bar 
function resetAndStartProgressBar() {
    gallaryprogressBar.style.transition = 'none';
    gallaryprogressBar.style.width = '0%';
    // Trigger reflow to restart animation
    void gallaryprogressBar.offsetWidth;

    gallaryprogressBar.style.transition = 'width 5s linear';
    gallaryprogressBar.style.width = '100%';
}
// progress bar end

// wen clicks on slide show 
// gallarySlideShow.addEventListener("click", () => {
//     if (!isSlideShowOn) {
//         // Start the slideshow
//         slideshowInterval = setInterval(() => {
//             doGallaryNext();
//         }, 5000);
//         isSlideShowOn = true;
//     } else {
//         // Stop the slideshow
//         clearInterval(slideshowInterval);
//         isSlideShowOn = false;
//     }
// });
gallarySlideShow.addEventListener("click", () => {
    if (!isSlideShowOn) {
        // Start the slideshow
        resetAndStartProgressBar();

        slideshowInterval = setInterval(() => {
            doGallaryNext();
            resetAndStartProgressBar();
        }, 5000);

        isSlideShowOn = true;
    } else {
        // Stop the slideshow
        clearInterval(slideshowInterval);
        isSlideShowOn = false;

        // Pause the progress bar by freezing width and removing transition
        let computedWidth = window.getComputedStyle(gallaryprogressBar).width;
        gallaryprogressBar.style.transition = 'none';
        gallaryprogressBar.style.width = computedWidth;
    }
});

// ---------------------------------chnaging next prev done -----------------------------


// -----------------------------opening gird ------------------------------
let toggleBtnGallayGrid = document.getElementById("toggleBtnGallayGrid");
let gridThumbnailParent = document.getElementById("gridThumbnailParent");
toggleBtnGallayGrid.addEventListener("click", () => {
    if (gridThumbnailParent.classList.contains("gallaryGridInbOttom")) {
        gridThumbnailParent.classList.remove("gallaryGridInbOttom");
        gridThumbnailParent.classList.add("gallaryGridOut");
    }
    else {
        gridThumbnailParent.classList.remove("gallaryGridOut");
        gridThumbnailParent.classList.add("gallaryGridInbOttom");

    }
})
// ---------------------opening grid end ----------------------

// ---------------------------filling gird with imag --------------------------
let gridPanelGallaery = document.getElementById("gridPanelGallaery")
gallaryImagesData.forEach((eachGallaryImg, index) => {
    let gridGallaryImg = document.createElement("IMG");
    gridGallaryImg.src = eachGallaryImg.img;
    gridGallaryImg.setAttribute("data-target", index);  //seeting index in grid tuhmbnail 
    gridGallaryImg.classList.add("w-[55px]", "h-[55px]", "border", "border-blue-500", "gallaryGridImages", "object-cover", "cursor-pointer")
    gridPanelGallaery.appendChild(gridGallaryImg)
})

// ------------------------------filling gird with image donw ----------------------

// when click on grid then show its coresponding image --------------------------
let gallaryGridImages = document.querySelectorAll(".gallaryGridImages");
gallaryGridImages.forEach((gridImg) => {
    gridImg.addEventListener("click", (event) => {
        const clikedImageGridId = parseInt(event.target.getAttribute("data-target"), 10);  // get cliked image indecx

        getImageIndex(clikedImageGridId)
    })
})
// when click on grid then show its coresponding image end --------------------------


// --------------------------to zoom image -----------------------------------

const gallaryZoomBtn = document.getElementById('gallaryZoomBtn');

gallaryZoomBtn.addEventListener('click', () => {
    largeImageClciked.classList.toggle('zoomedGallaryImage');
});


// --------------------------to zoom image end-----------------------------------