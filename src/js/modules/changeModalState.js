import checkNumInputs from './checkNumInputs';
function changeModalState(state){

    let windowsForm = document.querySelectorAll('.balcon_icons_img'),
        windowsWidth = document.querySelectorAll('#width'),
        windowsHeight = document.querySelectorAll('#height'),
        windowsType = document.querySelectorAll('#view_type'),
        windowsProfile = document.querySelectorAll('.checkbox'),
        windowsButt = document.querySelectorAll('.popup_calc_btn');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function inputValidation(state){
        if (!state.form || !state.width || !state.height){
            document.querySelector('.popup_calc_button').setAttribute('disabled','disabled');
        }else{
            document.querySelector('.popup_calc_button').removeAttribute('disabled');
        }

        if(!state.type || !state.profile){
            document.querySelector('.popup_calc_profile_button').setAttribute('disabled','disabled');
        }else{
            document.querySelector('.popup_calc_profile_button').removeAttribute('disabled');
        }
    }

    function bindActionToElement(event,element,prop){

        element.forEach((item,i)=>{
            item.addEventListener(event, ()=>{
                switch (item.nodeName){
                    case "SPAN":
                        state[prop] = i+1;
                        break;
                    case "INPUT":
                        if (item.getAttribute('type') === 'checkbox'){
                            (i == 0)? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            element.forEach((item,j)=>{
                                item.checked = false;
                                if (i == j){
                                    item.checked = true;
                                }
                            });
                        }else{
                            state[prop] =item.value;
                        }
                        break;
                    case "SELECT":
                        state[prop] = item.value;
                        break;
                }
                inputValidation(state);
                // console.log(state);
            });
            
            
        });
        
    }

    bindActionToElement('click', windowsButt);
    bindActionToElement('click', windowsForm ,'form');
    bindActionToElement('input', windowsHeight ,'height');
    bindActionToElement('input', windowsWidth ,'width');
    bindActionToElement('change', windowsType ,'type');
    bindActionToElement('change', windowsProfile ,'profile');


}

export default changeModalState;