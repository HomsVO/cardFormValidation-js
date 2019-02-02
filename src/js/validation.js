window.onload = function(){
    const form = document.getElementById('card-form');
    //Массив ошибок [0] - Номер,[1] - Срок действия,[2] - Держатель карты,[3] - CVV2 код
    const errors = [];
    //Создать span с ошибкой
    const createError = (text) => {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerHTML = text;
        return error;
    };
    //Вставить элемент после.
    const insertAfter = (elem, refElem) => {
        return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    };
    /*Валидация  полей
    Передается значение поля,требуемая длинна,id ошибки в массиве ошибок
    текст ошибки и элемент после которого нужно вывести ошибку */
    const validateField = (number,length,errorId,text,insert) =>{
        currentError = errors[errorId];
        if(isNaN(number) || number.length < length){
            if(currentError == undefined){
                currentError = insertAfter(createError(text),insert);
            }
        }else{
            if(currentError != undefined){
                currentError.remove();
                delete currentError;
            }
        }
    };

    //Функция валидации формы
    //вызывающаяся после отправки формы
    form.onsubmit = () =>{
        const elems = form.elements;
        //Номер карты
        const cardNumber = elems.num1.value + elems.num2.value + elems.num3.value + elems.num4.value;
        //Срок хранения
        const storageTime = month.value + year.value;
        //Валидация номера карты
        validateField(cardNumber,16,0,'Неверный код карты',num4);

        //Валидация Срока действия
        validateField(storageTime,4,1,'Неверная дата хранения',year);

        //Валидация держателя карты
        if(cardkeeper.value.length < 7 || !(isNaN(cardkeeper.value))){
            if(errors[2] == undefined){
                errors[2] = insertAfter(createError('Слишком короткое имя владельца'),cardkeeper);
            }
        }else{
            if(errors[2] != undefined){
                errors[2].remove();
                delete errors[2];
            }
        }
        //Валидация CVV2
        validateField(cvv_code.value,3,3,'Неверный CVV2 код',cvv_code);

        //Создание очищеного массива с ошибками
        let newErrors = errors.filter(c => {return c});

        //Проверка на наличие ошибок.Если их нет,то форма отправляется.
        if(newErrors.length == 0){
            return true;
        }
        return false;
    }
}