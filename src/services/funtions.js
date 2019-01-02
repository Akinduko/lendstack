export const totalCount = (array=[],format=Boolean) => {
      const sum= array.reduce((a, b) => a + b, 0);
      if (format)
        return formatHuman(sum);
      else{
        return sum;
      }
    }

export const revenueData = (arrays=[],charge=0) =>{
  const newarray=[];
  for (const array of arrays)
  {
    const newid = array*charge;
    newarray.push(newid)
  }
  return newarray
}

export const totalRevenue = (arrays=[],charge=0) => {
      const newarrays= revenueData(arrays,charge)
      const sum= newarrays.reduce((a, b) => a + b, 0);
      return sum;
    }


export const formatHuman = (num=0) => {
        if(typeof(num) === "undefined" || num === NaN) {
          return null;
          }
        else if ( num < 1000){
              return num;
          }
        else if (num >= 1000 && num <= 1000000) {
            const count=num/1000;
            const count2dp = count.toFixed(1);
            return `${count2dp}K`;
          }
        else if (num > 1000000 && num <= 1000000000){
            const count=num/1000000;
            const count2dp = count.toFixed(1);
            return `${count2dp}M`;
          }
        else  {
              const count=num/1000000000;
              const count2dp = count.toFixed(1);
              return `${count2dp}B`;
          }
     }

export const percentage = (array=[]) => {
      const arrayTotal = totalCount(array,false);
      const subjectarray = array[array.length-1]
      const perc = (subjectarray/arrayTotal).toFixed(3)*100
      return perc;
  }

export const getLast30Dates = () => {
	var today = new Date();
	const  current_day=  new Date(today.getFullYear(), today.getMonth(), today.getDate()).toString();
	const  five_days_ago= new Date(today.getFullYear(), today.getMonth(), today.getDate() -5).toString();
	const  ten_days_ago= new Date(today.getFullYear(), today.getMonth(), today.getDate() -10).toString();
	const  fifteen_days_ago= new Date(today.getFullYear(), today.getMonth(), today.getDate() -15).toString();
	const  twenty_days_ago= new Date(today.getFullYear(), today.getMonth(), today.getDate() -20).toString();
	const  twentyfive_days_ago= new Date(today.getFullYear(), today.getMonth(), today.getDate() -25).toString();
	const  thirty_days_ago= new Date(today.getFullYear(), today.getMonth(), today.getDate() -30).toString();
	const date1= `${current_day.substring(4,7)} ${current_day.substring(8,11)}`;
	const date2 =`${five_days_ago.substring(4,7)} ${five_days_ago.substring(8,11)}`;
	const date3 =`${ten_days_ago.substring(4,7)} ${ten_days_ago.substring(8,11)}`;
	const date4 =`${fifteen_days_ago.substring(4,7)} ${fifteen_days_ago.substring(8,11)}`;
	const date5 =`${twenty_days_ago.substring(4,7)} ${twenty_days_ago.substring(8,11)}`;
	const date6 =`${twentyfive_days_ago.substring(4,7)} ${twentyfive_days_ago.substring(8,11)}`;
	const date7 =`${thirty_days_ago.substring(4,7)} ${thirty_days_ago.substring(8,11)}`;
	return [date7,date6,date5,date4,date3,date2,date1];
	}



