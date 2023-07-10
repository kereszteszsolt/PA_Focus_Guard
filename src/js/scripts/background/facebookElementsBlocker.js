export const facebookElementsBlocker = (facebookElements) => {
    facebookElements.forEach(element => {
        switch (element) {
            case 'facebook-thumbnails':
                break;
            case 'recommended':
                break;
        }
    });
};
