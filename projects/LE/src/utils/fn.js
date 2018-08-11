// 个位数补零；
export function addZero(n){
    n = parseInt(n)||0;
    return n>9? ''+n:'0'+n;
}

// 日期格式化
export function dateFormate(dd){
    let y = dd.getFullYear();
    let m = dd.getMonth()+1;
    let d = dd.getDate();
    return y+'-'+addZero(m)+'-'+addZero(d);
}