document.querySelector('.menu-btn').addEventListener('click', () => {

  const side = document.querySelector('.haha')




  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')

  // }
})

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long'
  });
}




const lala = []
const baseUrl = '/bill'

async function getinfo() {
  const res = await fetch(baseUrl, {
      method: 'GET',
    }

  )


  const data = await res.json()


  // document.querySelector('#preloader').style.display='none'

  return data
}

async function getexpense() {
  const baseUrl = '/expense'
  const res = await fetch(baseUrl, {
      method: 'GET',
    }

  )


  const data = await res.json()

  lala.push(data)
  // document.querySelector('#preloader').style.display='none'

  return data
}
getinfo().then((x) => {


  const top = document.querySelector('#top')
  topProducts(x, top)
  saleForMonth(x)
  createCard(x)
})

function createCard(data) {

  const sale = []
  const length = []
  const cash = []
  const card = []
  const upi = []
  const methodOfPayment = []
  data.map((z) => {
    const amt = z.orderedFood.map((y) => y.price)
    const add = amt.reduce((a, b) => a + b, 0)
    sale.push(add)
    length.push(amt.length)
    methodOfPayment.push(z.paymentMethod)
    if (z.paymentMethod === 'cash') {
      const sale = z.orderedFood.map((y) => y.price)
      const add = sale.reduce((a, b) => a + b, 0)
      cash.push(add)

    } else if (z.paymentMethod === 'card') {
      const sale = z.orderedFood.map((y) => y.price)
      const add = sale.reduce((a, b) => a + b, 0)
      card.push(add)

    } else if (z.paymentMethod === undefined) {
      const sale = z.orderedFood.map((y) => y.price)
      const add = sale.reduce((a, b) => a + b, 0)
      upi.push(add)


    }
  })


  const lengthoftotalfood = length.reduce((a, b) => a + b, 0)

  //avg ticket
  const revenue = sale.reduce((a, b) => a + b)
  document.querySelector('.avg').innerHTML = Math.floor(revenue / lengthoftotalfood)

  //cash

  const totalcustomers = document.querySelector('.cashSales')
  totalcustomers.innerHTML = cash.reduce((a, b) => a + b)

  const tax = document.querySelector('.upiSales')
  tax.innerHTML = upi.reduce((a, b) => a + b)

  //card sales
  const totalMenu = document.querySelector('.cardSales')
  totalMenu.innerHTML = card.reduce((a, b) => a + b)
}



function topProducts(data, orders) {


  const both = []
  const foodItems = []
  const quantity = []
  const amt = []
  ///mapping data
  data.map((x) => {

    x.orderedFood.map((y) => {
      both.push({
        'name': y.id,
        'quantity': y.items,
        'price': y.price
      });

      foodItems.push(y.id)
      quantity.push(y.items)
      amt.push(y.price)
    })
  })




  const count = []

  const total = []

  function maap(y) {
    y.map((z) => {

      const x = both.filter((o) => o.name === z)

      total.push(x[0])

      let result = x.map(a => a.quantity)

      const add = result.reduce(function (acc, val) {
        return acc + val;
      }, 0)

      count.push(add)
    })
  }

  const map = foodItems.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

  const foodid = [...map.keys()];


  function aa() {
    maap(foodid)

  }
  aa()
  const totl = []


  for (let index = 0; index < count.length; index++) {
    totl.push({
      'name': foodid[index],
      'quantity': count[index],
      'price': amt[index]
    });

  }

  const foodlist = []
  const count2 = []
  const price2 = []

  totl.sort(function (a, b) {
    return b.quantity - a.quantity;
  })

  totl.forEach((c) => {
    foodlist.push(c.name)
    count2.push(c.quantity)
    price2.push(c.price)
  })


  //  orders.innerHTML=``
  for (let index = 0; index < foodid.length; index++) {




    const name = document.createElement('a')
    name.innerHTML = `<small class="mt-0 mb-1 font-w500">${foodlist[index]}</small>`





    const quantity = document.createElement('td')
    quantity.setAttribute('class', 'my-0 text-secondary font-w600')
    quantity.innerHTML = `<h4>${count2[index]}</h4>`


    const amt = document.createElement('td')
    amt.setAttribute('class', 'my-0 text-secondary font-w600')
    const h4 = document.createElement('h4')
    amt.innerHTML = `<h4>${price2[index]}</h4>`


    const tr = document.createElement('tr')
    tr.append(name, quantity, amt)
    orders.append(tr)

  }
  localStorage.setItem('data', '')
}



async function saleForMonth(lala) {


  const totalSales = []
  const month = []
  lala.map((x) => {


    month.push(x.month)
    const amt = x.orderedFood.map((y) => y.price)
    const add = amt.reduce((a, b) => a + b, 0)

    totalSales.push(add)


  })
  const monthlySale = document.querySelector('.monthlyearning')

  rearrangedData(month, totalSales, monthlySale)

}

function rearrangedData(quantity2, amount, location) {
  const datt = []
  for (let index = 0; index < quantity2.length; index++) {
    datt.push({
      'time': quantity2[index],
      'amount': amount[index]
    })

  }
  const map2 = quantity2.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

  const time = [...map2.keys()];
  const total3 = []
  const foodprice = []

  function maap2(y) {
    y.map((z) => {

      const x = datt.filter((o) => o.time === z)

      total3.push(x[0])
      let result = x.map(a => a.amount)
      const add = result.reduce(function (acc, val) {
        return acc + val;
      }, 0)
      foodprice.push(add)
    })
  }

  function aaa(y) {
    maap2(time)

  }
  aaa()

  location.innerHTML = `
            
            <canvas id="profit expense chart"></canvas>
            `


  getexpense().then(async (s) => {
    const totalmonth = []
    const totalAmt = []
    const month = []
    //[{month'lala',amt:'55'},{month:'lala',amt:'505'},{month:'haha',amt:'50'}]

    const baseUrl = '/labour'
    const res = await fetch(baseUrl, {
        method: 'GET',
      }

    )
    const labourData = await res.json()
    const labouramt = []
    const hiringDate = labourData.map((y) => {
      if (new Date().toJSON().slice(0, 10).split('-').reverse().join('/').slice(6, 10) === y.HiringDate.slice(6, 10)) {


        const date = new Date();
        console.log(y.HiringDate);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //payment
        console.log(months.slice(y.HiringDate.slice(3, 5) - 1, new Date().toJSON().slice(0, 10).split('-').reverse().join('/').slice(3, 5)));

        labouramt.push({
          'month': months.slice(0, y.HiringDate.slice(3, 5) - 1),
          'amt': y.monthlySalary,
          "date": y.HiringDate.slice(0, 3),
          "position": y.position
        })
      }
    })


    const month3 = hiringDate.slice(3, 5);



    const monthlySalary = labourData.map((y) => y.monthlySalary)


    const totalLabourCost = monthlySalary.reduce(function (acc, val) {

      return acc + val;
    }, 0)



    s.map((t) => {
      month.push(t.month)

    })
    //const month=[lala,lala,haha]  
    const map = month.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
    const foodid = [...map.keys()];

    //[{lala:2,haha:1}]
    foodid.map((z) => {
      //filters from all months
      ;
      const mapo = s.filter((m) => m.month === z);
      const amount = []
      //gets amount of the month
      mapo.map((z) => {

        //appends it to amount array
        amount.push(z.price)
      })

      totalAmt.push(amount.reduce(function (acc, val) {
        return acc + val;
      }, 0))
      totalmonth.push(z)


    })
    const myChart = document.getElementById('monthlyearnings')



    const arr = []
    const ze = []

    for (let index = 0; index < totalmonth.length; index++) {

      time.map((c) => {
        const index2 = time.indexOf(c)

        if (c === totalmonth[index]) {
          arr.push({
            'amt': totalAmt[index],
            'month': totalmonth[index],
            'index': index2
          })
        } else {
          ze.push({
            'amt': 0,
            'month': c,
            "index": index2
          })
        }


      })



    }
    ze.filter((v, i, a) => a.findIndex(v2 => (v2.month === v.month)) === i)

    ze.map((a) => {
      arr.push(a)
    })
    const arr2 = arr.filter((v, i, a) => a.findIndex(v2 => (v2.month === v.month)) === i)
    arr2.sort((a, b) => parseFloat(a.index) - parseFloat(b.index))
    const expAmt = []
    arr2.map((x) => {
      expAmt.push(x.amt)
    })

    createchart(totalmonth, expAmt, foodprice, time, myChart);
  })




}


function createChart(foodid, count, location, type, label) {

  let chart = new Chart(location, {
    type: type, //bar,horizontal,lie ,pie radar ,polararea
    data: {
      label: 'city names',
      labels: foodid,
      datasets: [{
        label: label,
        data: count
      }],
    },

    //options:{}
    options: {
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      scales: {

      }
    }
  })
}

function createchart(totalmonth, totalAmt, foodid, count, location) {

  var runChart = new Chart(location, {
    type: 'line',
    data: {
      labels: count,
      laas: totalmonth,
      datasets: [{
          label: "Sales",
          data: foodid
        },
        {
          label: "Kitchen Expenses",
          data: totalAmt

        },
        {
          label: "Labour Expenses",
          data: [10000, 15000, 12000, 19000, 17000]

        }
      ],
    },
    // options: {
    //   indexAxis: 'y',
    //   scales: {
    //     x: {
    //       beginAtZero: true
    //     }
    //   },
    //   responsive: true
    // }
  });
}