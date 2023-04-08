const submit = document.getElementById('submit')
const dayStart = document.querySelector('.day-start')

const makeFormVisible = document.querySelector('.overlay')
const report = document.querySelector('#generateReport')
const totalsale = document.querySelector('.totalsale')
const stockExp = document.querySelector('#stock-exp')
const currentBalance = document.querySelector('.currentBalance')
const todaySale = document.querySelector('.todaysSale')
const stockdiv = document.querySelector('.stockexp')
const lala = []
const lalaexp = []
//Finds Out Days
const date = new Date
const today = String(date.getDate()).padStart(2, '0');
const month = date.getMonth()
const arrayOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const currentMonth = arrayOfMonths[month]
const year = date.getFullYear().toString()

document.querySelector('.menu-btn').addEventListener('click', () => {

  const side = document.querySelector('.haha')




  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')

  // }
})










//sets up inputs
document.getElementById('datePicker').valueAsDate = new Date();
const hours = date.getHours();

const min = String(date.getMinutes()).padStart(2, '0');

document.getElementById('time').value = hours + ':' + min;


document.querySelector('.close').addEventListener('click', () => {

  makeFormVisible.style.visibility = "hidden"

  report.style.visibility = "hidden"
})

dayStart.addEventListener('click', () => {

  makeFormVisible.style.visibility = "visible"
  submit.style.display = 'block'

})

// report.addEventListener('click', (event) => {
//event.preventDefault()
submit.style.display = 'none'
makeFormVisible.style.visibility = "hidden"
report.style.visibility = "hidden"
getinfo()

// })

//finds out sale for the day
async function getinfo() {
  const res = await fetch('/bill', {
      method: 'GET',
    }

  )


  const data = await res.json()
  lala.push(data)
  const exp = await fetch('/expense', {
      method: 'GET',
    }

  )


  const expense = await exp.json()
  lalaexp.push(expense)


  const openingCash = await fetch('/dsr', {
      method: 'GET',
    }

  )


  const cashInHand = await openingCash.json()

  // current(cashInHand,'cash')
  const lastUpdate = cashInHand[cashInHand.length - 1]
  document.querySelector('.opn-amount').innerHTML = lastUpdate.amount
  document.querySelector('.opn-date').innerHTML = lastUpdate.date
  document.querySelector('.opn-time').innerHTML = lastUpdate.time


  //creates sales chart
  const filterdate = data.filter((y) => y.date === today)
  console.log(filterdate);
  const monthFilter = filterdate.filter((y) => y.month === currentMonth)
  const year2 = monthFilter.filter((y) => y.year === year)
  console.log(year2);
  current(year2, 'sales')
  //creates expenses chart

  console.log(expense);
  const filterdate1 = expense.filter((y) => y.date === today)
  const monthFilter2 = filterdate1.filter((y) => y.month === currentMonth)
  const year3 = monthFilter2.filter((y) => y.year === yearo)
  current(year3, 'exp')
  console.log(totalsale.innerHTML);


}
// getinfo()

//gets information from the form andsends data
submit.addEventListener('click', (event) => {
  event.preventDefault()

  const amount = document.querySelector("#amount").value


  const hours = new Date().getHours();
  const date = new Date()
  const min = String(date.getMinutes()).padStart(2, '0');

  const today = date.getDate()
  const data = {
    amount: amount,
    time: hours + ":" + min,
    today,
    month: currentMonth,
    balance: "opening",
    year: date.getFullYear()
  }
  post(data, '/day-report')
})




//postsdata
async function post(data, baseUrl) {

  const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        pp: data
      }),

    }


  ).then(response => {
    if (!response.ok) { // ***
    } else {} // ***
    // ...use `response.json`, `response.text`, etc. here
  });

}


function current(customer, str) {

  if (str === 'sales') {


    if (customer.length > 0) {
      todaySale.style.display = 'block'


      const salesToday = []


      const carddata = customer.filter((y) => y.paymentMethod === 'card')
      const cashdata = customer.filter((y) => y.paymentMethod === 'cash')
      const upidata = customer.filter((y) => y.paymentMethod === 'upi')
      console.log(carddata, upidata, cashdata);


      function totalaMT(x) {
        const total = []
        x.map((x) => {




          x.orderedFood.map((y) => {
            const amount = y.price * y.items
            total.push(amount)

          })

          if (x.paymentMethod === 'cash') {
            document.querySelector('.cash').innerHTML = total.reduce(function (acc, val) {
              return acc + val;
            }, 0)
          }
          if (x.paymentMethod === 'card') {
            document.querySelector('.card1').innerHTML = total.reduce(function (acc, val) {
              return acc + val;
            }, 0)
          }
          if (x.paymentMethod === 'upi') {
            document.querySelector('.upi').innerHTML = total.reduce(function (acc, val) {
              return acc + val;
            }, 0)
          }

        })
      }


      document.querySelector('#tbody').innerHTML = ''
      customer.map((x) => {
        if (x.paymentMethod === 'cash') {
          totalaMT(cashdata)

        }
        if (x.paymentMethod === 'card') {
          totalaMT(carddata)

        }
        if (x.paymentMethod === 'upi') {
          totalaMT(upidata)
        }





        const saleForToday = []

        x.orderedFood.map((y) => {
          saleForToday.push(y.price * y.items);
          const td5 = document.createElement('td')
          td5.innerHTML = y.id.replace(/\s/g, '')

          const td6 = document.createElement('td')
          td6.innerHTML = y.price

          const td = document.createElement('td')
          td.innerHTML = y.items

          const td3 = document.createElement('td')
          td3.innerHTML = y.price * y.items


          const tr = document.createElement('tr')
          tr.append(td5, td6, td, td3)

          document.querySelector('#tbody').append(tr)
        })
        const add = saleForToday.reduce(function (acc, val) {
          return acc + val;
        }, 0)
        salesToday.push(add)
      })
      const total = salesToday.reduce(function (acc, val) {
        return acc + val;
      }, 0)

      //displays total sales
      totalsale.innerHTML = total
      totalsale.classList.add('green')

      const tr2 = document.createElement('tr')
      const totaltd = document.createElement('td')
      totaltd.innerText = 'total'
      const amt = document.createElement('td')
      amt.innerText = salesToday.reduce(function (acc, val) {
        return acc + val;
      }, 0)
      amt.classList.add('green')
      const dummy = document.createElement('td')
      const dummy2 = document.createElement('td')

      tr2.append(totaltd, dummy, dummy2, amt)

      document.querySelector('#tbody').append(tr2)

    }
  } else if (str === 'exp') {
    if (customer.length > 0) {
      stockdiv.style.display = 'block'

      const expForToday = []
      document.querySelector('#tbodyexp').innerHTML = ''
      customer.map((y) => {
        expForToday.push(y.price);
        const td5 = document.createElement('td')
        td5.innerHTML = y.name

        const td6 = document.createElement('td')
        td6.innerHTML = y.price

        const td = document.createElement('td')
        td.innerHTML = y.quantity

        const td2 = document.createElement('td')
        td2.innerHTML = y.unit


        const tr = document.createElement('tr')
        tr.append(td5, td6, td, td2)
        document.querySelector('#tbodyexp').append(tr)
      })
      const totalexp = expForToday.reduce(function (acc, val) {
        return acc + val;
      }, 0)


      const tr2 = document.createElement('tr')
      const totaltd = document.createElement('td')
      totaltd.innerText = 'total'
      const amt = document.createElement('td')
      amt.innerText = totalexp
      amt.classList.add('red')
      const dummy = document.createElement('td')
      const dummy2 = document.createElement('td')

      tr2.append(totaltd, dummy, dummy2, amt)

      document.querySelector('#tbodyexp').append(tr2)
    }

  }
  const expense = document.querySelector('.red')
  console.log(expense);
  if (expense == null) {
    currentBalance.innerHTML = totalsale.innerHTML;
    document.querySelector('.stockexp').style.visibility = 'hidden'
  } else {
    document.querySelector('.stockexp').style.visibility = 'visible'

    currentBalance.innerHTML = totalsale.innerHTML - expense.innerHTML

  }
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long'
  });
}


function handler(e) {

  const filterdate = lala[0].filter((y) => y.date === e.target.value.slice(-2))

  var month = getMonthName(e.target.value.slice(5, -3))
  var yearo = e.target.value.slice(0, 4)

  //filtr month
  const monthFilter = filterdate.filter((y) => y.month === month)



  const year = monthFilter.filter((y) => y.year === yearo)



  hh = year
  console.log(year);
  if (year.length === 0) {
    document.querySelector('#tbody').innerHTML = 'No Data Found'
  } else if (year.length > 0) {
    current(year, 'sales')

  }
  const filterdate2 = lalaexp[0].filter((y) => y.date === e.target.value.slice(-2))
  const monthFilter2 = filterdate2.filter((y) => y.month === month)
  const year2 = monthFilter2.filter((y) => y.year === yearo)

  if (year2.length === 0) {
    document.querySelector('#tbodyexp').innerHTML = 'No Data Found'
  } else {
    console.log(year2);
    current(year2, 'exp')

  }


}

function lalao() {
  document.querySelector('#monthToDate').classList.toggle('active')
}

function chang() {
  const e = document.querySelector('#monthToDate')
  var value = e.innerHTML;
  var text = e.options[e.selectedIndex].text;
  const search = lala[0].filter((u) => u.month === text)
  if (search.length === 0) {
    document.querySelector('#tbody').innerHTML = 'No Data Available'
  } else {
    current(search, 'sales')

  }
  const search2 = lalaexp[0].filter((u) => u.month === text)

  if (search2.length === 0) {
    document.querySelector('#tbodyexp').innerHTML = 'No Data Available'
  } else {
    current(search2, 'exp')

  }


}