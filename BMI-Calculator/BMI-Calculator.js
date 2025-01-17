function calculateBMI(){
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);

    if(isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0){
        document.getElementById('result').textContent = "請輸入有效的身高和體重!";
        return;
    }
    const bmi = (weight / (height * height)).toFixed(2);
    let category = '';

    if(bmi < 18.5){
        category = '體重過輕';
    }else if(bmi >= 18.5 && bmi <= 24.9){
        category = '正常範圍';
    }else if(bmi >= 25 && bmi < 29.9){
        category = '體重肥胖';
    }
    document.getElementById('result').innerHTML = `您的 BMI 值為: ${bmi} <br> (${category})`;
}