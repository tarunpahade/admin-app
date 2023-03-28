const submit = document.getElementById('submit')
const dayStart = document.querySelector('.day-start')
const dayCLOSE = document.querySelector('.day-close')
const makeFormVisible = document.querySelector('.overlay')
const report = document.querySelector('#generateReport')
const totalsale = document.querySelector('.total')
const stockExp = document.querySelector('#stock-exp')
const currentBalance = document.querySelector('.currentBalance')
const todaySale = document.querySelector('.todaysSale')
const stockdiv = document.querySelector('.stockexp')

//Finds Out Days
const date = new Date
const today = date.getDate().toString()
const month = date.getMonth()
const arrayOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const currentMonth = arrayOfMonths[month]
const year = date.getFullYear().toString()


//sets up inputs
document.getElementById('datePicker').valueAsDate = new Date();
const hours = date.getHours();

const min = String(date.getMinutes()).padStart(2, '0');
console.log(hours, min);

document.getElementById('time').value = hours + ':' + min;
console.log(new Date().getHours());


document.querySelector('.close').addEventListener('click', () => {

  makeFormVisible.style.visibility = "hidden"

  report.style.visibility = "hidden"
})

dayStart.addEventListener('click', () => {

  makeFormVisible.style.visibility = "visible"
  submit.style.display = 'block'

})
dayCLOSE.addEventListener('click', () => {

  makeFormVisible.style.visibility = "visible"
  report.style.visibility = "visible"
  submit.style.display = 'none'
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

  const exp = await fetch('/expense', {
      method: 'GET',
    }

  )


  const expense = await exp.json()



  const openingCash = await fetch('/dsr', {
      method: 'GET',
    }

  )


  const cashInHand = await openingCash.json()

  // current(cashInHand,'cash')
  console.log(cashInHand);
  const lastUpdate = cashInHand[cashInHand.length - 1]
  console.log(lastUpdate);
  document.querySelector('.opn-amount').innerHTML = `Opening Balance ${lastUpdate.amount}`
  document.querySelector('.opn-date').innerHTML = `Date ${lastUpdate.date}`
  document.querySelector('.opn-time').innerHTML = `Time ${lastUpdate.time}`


  //creates sales chart

  current(data, 'sales')
  //creates expenses chart
  current(expense, 'exp')

  currentBalance.innerHTML = totalsale.innerHTML - stockExp.innerHTML

}
// getinfo()

//gets information from the form andsends data
submit.addEventListener('click', (event) => {
  event.preventDefault()
  console.log('you clicked submit');
  const amount = document.querySelector("#amount").value
  console.log(amount);

  const hours = new Date().getHours();
  const date = new Date()
  const min = String(date.getMinutes()).padStart(2, '0');
  console.log(hours, min);
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
    } else {
      console.log('sent');
    } // ***
    // ...use `response.json`, `response.text`, etc. here
  });
  //  location.reload()

}


function current(data, str) {
  const customer = []



  data.map((x) => {


    if (x.year === year) {


      if (x.month === currentMonth) {


        if (x.date === today) {




          customer.push(x)


        }
      }
    }

  })

  if (str === 'sales') {
    if (customer.length > 0) {
      todaySale.style.display = 'block'


      const salesToday = []
      const card = []
      const cash = []
      const upi = []

      const carddata = customer.filter((y) => y.paymentMethod === 'card')
      const cashdata = customer.filter((y) => y.paymentMethod === 'cash')
      const upidata = customer.filter((y) => y.paymentMethod === 'upi')

      function totalaMT(x) {
        const total = []
        x.map((x) => {




          x.orderedFood.map((y) => {
            const amount = y.price * y.items
            total.push(amount)

          })
          if (x.paymentMethod === 'cash') {
            document.querySelector('.cash').innerHTML = 'Cash ' + total.reduce(function (acc, val) {
              return acc + val;
            }, 0)
          }
          if (x.paymentMethod === 'card') {
            document.querySelector('.card1').innerHTML = 'Card ' + total.reduce(function (acc, val) {
              return acc + val;
            }, 0)
          }
          if (x.paymentMethod === 'upi') {
            document.querySelector('.upi').innerHTML = 'Upi ' + total.reduce(function (acc, val) {
              return acc + val;
            }, 0)
          }

        })
      }



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
    }
  } else if (str === 'exp') {
    if (customer.length > 0) {
      stockdiv.style.display = 'block'

      const expForToday = []
      console.log(customer);
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
      stockExp.innerHTML = totalexp
    }

  }



  //   return customer
}