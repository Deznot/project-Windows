let images = () => {
    let imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImg = document.createElement('img');

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.alignItems = 'center';
    imgPopup.style.justifyContent ='center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImg);

    workSection.addEventListener('click', e =>{
        e.preventDefault();
        let target = e.target;

        if (target && target.classList.contains('preview')){
            let path = target.parentNode.getAttribute('href');
            bigImg.setAttribute('src', path);
            imgPopup.style.display = 'flex';
            bigImg.style.width = '60%';
            bigImg.style.height = 'auto';
            document.body.style.overflow = 'hidden';
        }
        if (target && target.matches('div.popup')){
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
        }

    });

};

export default images;

