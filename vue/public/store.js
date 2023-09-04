// 从local storage中读取数据
function getData() {
    //判断本地local storage中不存在数据
    if (!localStorage.getItem('geojson')) {
        localStorage.setItem('geojson', '[]')
    }
    return JSON.parse(localStorage.getItem('geojson'))
}

// 从local storage中写数据
function saveData(data) {
    localStorage.setItem('geojson', JSON.stringify(data))
}