function isNull(input) {
  if(input == 0) return false
  return (!input); 
}

function isValid(input, min, max) {
  return input >= min && input <= max;
}

function smaller(input, value) {
  return input < value;
}

function larger(input, value) {
  return input > value;
}
function largerOrEqual(input, value) {
  return larger(input, value) || input == value;
}
function SmallOrEqual(input, value) {
  return smaller(input, value) || input == value;
}

function TodayDate(date) {
  if(date==null){
      return '';
  }
  let d = date.getDate(),
      m = date.getMonth() + 1,
      y = date.getFullYear();

  if (d < 10) {
      d = "0" + d;
  };
  if (m < 10) {
      m = "0" + m;
  };
  return y + "-" + m + "-" + d;
}
function TodayDateV2(date) {
  if (date == null || date == '') {
      return '';
  }
  date = new Date(date);
  let d = date.getDate(),
      M = date.getMonth() + 1,
      y = date.getFullYear(),
      H = date.getHours(),
      s = date.getSeconds(),
      m = date.getMinutes();

  if (d < 10) {
      d = "0" + d;
  };
  if (m < 10) {
      m = "0" + m;
  };
  return `${d}-${M}-${y} ${H}:${m}:${s}`
}
function TodayDateV4(date) {
  if (date == null || date == '') {
      return '';
  }
  date = new Date(date);
  let d = date.getDate() ,
      M = date.getMonth() + 1,
      y = date.getFullYear(),
      H = date.getHours(),
      s = date.getSeconds(),
      m = date.getMinutes();

  if (d < 10) {
      d = "0" + d;
  };
  if (m < 10) {
      m = "0" + m;
  };
  return `${d}-${M}-${y}`
}
function TodayDateV5(date) {
  if (date == null || date == '') {
      return '';
  }
  date = new Date(date);
  let d = date.getDate() +1,
      M = date.getMonth() + 1,
      y = date.getFullYear();

  if (d < 10) {
      d = "0" + d;
  };

  return `${d}-${M}-${y}`
}
function TodayDateV3(date) {
  if (date == null || date == '') {
      return '';
  }
  date = new Date(date);
  let d = date.getDate(),
      M = date.getMonth() + 1,
      y = date.getFullYear(),
      H = date.getHours(),
      s = date.getSeconds(),
      m = date.getMinutes();

  if (d < 10) {
      d = "0" + d;
  };
  if (M < 10) {
      M = "0" + M;
  };
  if (m < 10) {
      m = "0" + m;
  };
  
  if (s < 10) {
      s = "0" + s;
  };
  
  if (H < 10) {
      H = "0" + H;
  };
  return `${y}-${M}-${d} ${H}:${m}:${s}`
}
function TodayDateV6(date) {
  if (date == null || date == '') {
      return '';
  }
  date = new Date(date);
  let d = date.getDate(),
      M = date.getMonth() + 1,
      y = date.getFullYear(),
      H = date.getHours(),
      s = date.getSeconds(),
      m = date.getMinutes();

  if (d < 10) {
      d = "0" + d;
  };
  if (M < 10) {
      M = "0" + M;
  };
  if (m < 10) {
      m = "0" + m;
  };
  
  if (s < 10) {
      s = "0" + s;
  };
  
  if (H < 10) {
      H = "0" + H;
  };
  return `${d}/${M}/${y} ${H}:${m}:${s}`
}
function isBlank(item) {
  return item.length == 0;
}
// <<<<<<< HEAD
// function ToNumber(...params) {
  // for (const item of params) {
  //     if (item.trim().length == 0) {
  //         item = null;
  //     }
  //     else {
  //         console.log("logger : ", item);
  //         item = Number(item);
  //     }
  // }
// }
// =======
// function ToNumber(...params) {
//   for (const item of params) {
//       if (item.trim().length == 0) {
//           item = null;
//       }
//       else {
//           console.log("logger : ", item);
//           item = Number(item);
//       }
//   }
// }
// >>>>>>> c2887e2c0678fc979224d8afa9fbb58acf972569
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
      // var date = new Date();
      // date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var date = new Date(days);
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export { isNull, isValid, smaller, larger, SmallOrEqual, largerOrEqual, TodayDate, isBlank, TodayDateV2,TodayDateV3,readCookie, TodayDateV4,TodayDateV5,
  TodayDateV6,setCookie };
