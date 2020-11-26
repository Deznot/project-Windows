import checkNumInputs from './checkNumInputs';
let forms = (state)=>{
    let forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        windows = document.querySelectorAll('[data-modal]');

    checkNumInputs('input[name="user_phone"]');
    
    
    let message = {
        loading : "Идет загрузка ...",
        success : "Скоро с вами свяжутся",
        failure : "Произошла какая-то ошибка"
    };

    let clearInputs = () =>{
        inputs.forEach(input =>{
            input.value = '';
        });
    };

    let clearState = () =>{
        for (let prop of Object.keys(state)){
            delete state[prop];
        }
        document.querySelectorAll('.checkbox').forEach((item)=>{
            item.checked = false;
        });
        
    };

    let closeModal = () =>{
        setTimeout( function (){
            windows.forEach((item)=>{
                item.style.display = 'none';
            });
            document.body.style.overflow = '';
        },2000);
    };



    let postData = async (url,data) =>{
        document.querySelector('.status').textContent = message.loading;

        let res = await fetch(url,{
            method : "POST",
            body: data
        }); 

        return await res.text();
    };

    forms.forEach((form)=>{
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage);
            
            let formData = new FormData(form);
            // console.log(formData);
            if (form.getAttribute('data-calc')=== "end"){
                for(let key in state){
                    formData.append(key, state[key]);
                }
                
            }
            


            postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                document.querySelector('.status').textContent = message.success;
            })
            .catch(()=>document.querySelector('.status').textContent = message.failure)
            .finally(()=>{
                closeModal();
                clearState();
                clearInputs();
                setTimeout(()=>{
                    statusMessage.remove();
                },5000);
            });
            

        });
    });
   


};

export default forms;