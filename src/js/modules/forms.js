let forms = ()=>{
    let forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');
    
    phoneInputs.forEach((item)=>{
        item.addEventListener('input', ()=>{
            item.value = item.value.replace(/\D/, '');
        });
    });
    
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
            postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                document.querySelector('.status').textContent = message.success;
            })
            .catch(()=>document.querySelector('.status').textContent = message.failure)
            .finally(()=>{
                clearInputs();
                setTimeout(()=>{
                    statusMessage.remove();
                },5000);
            });
            

        });
    });
   


};

export default forms;