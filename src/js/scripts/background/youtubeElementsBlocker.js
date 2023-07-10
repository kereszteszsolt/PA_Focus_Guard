let customImageURL = 'https://images.pexels.com/photos/5200285/pexels-photo-5200285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
export const youtubeElementsBlocker = (active, youtubeElements) => {
    let customImageURL = 'https://images.pexels.com/photos/5200285/pexels-photo-5200285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    // Cover all thumbnails with custom image
    let thumbnailImages = document.querySelectorAll('#thumbnail img');
    for (let i = 0; i < thumbnailImages.length; i++) {
        thumbnailImages[i].src = customImageURL;
    }
    // youtubeElements.forEach(element => {
    //     switch (element) {
    //         case 'youtube-thumbnails': {
    //             // Cover all thumbnails with custom image
    //             let thumbnailImages = document.querySelectorAll('#thumbnail img');
    //             for (let i = 0; i < thumbnailImages.length; i++) {
    //                 thumbnailImages[i].src = customImageURL;
    //             }
    //         }
    //         case 'recommended': {
    //
    //         }
    //     }
    // });
};
