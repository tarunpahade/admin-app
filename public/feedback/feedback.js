async function getinfo() {
    const res = await fetch('/feedback-data', {
            method: 'GET',
        }

    )


    const data = await res.json()
    console.log(data);
    document.getElementsByClassName('owl-stage')[0].innerHTML = ''
    document.getElementsByClassName('owl-stage')[0].innerHTML += data.map((x) => {
        console.log(x);
        return `
    
    <div class="owl-item" style="width: 384px; margin-right: 30px;">
    <div class="items">
        <div class="bootstrap-media card p-4">
            <div class="media mb-4 d-flex align-items-center">
                
                <div class="media-body">
                    <h5 class="mt-0 mb-3">${x.review[0].name}</h5>
                    <small class="mb-0">BURGER</small>
                </div>
            </div>
            <p class="fs-18 text-black mb-4">Wonderful</p>
            <div class="reviewer-box">
                <div class="media d-flex align-items-center">
                    
                    <div class="media-body">
                        <h4 class="mt-0 mb-1 text-white">${x.name}</h4>
                        <small class="mb-0 text-light">${x.number}</small>
                    </div>
                    <div class="star-review d-flex">
                        <i class="fa fa-star text-orange"></i>
                        <span class="ms-2">${x.review[0].rating}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
    })
    document.getElementsByClassName('p-0')[0].innerHTML = ''
    console.log(document.getElementsByClassName('p-0')[0]);
    document.getElementsByClassName('p-0')[0].innerHTML += data.map((x) => {
        return `
                      <div class="media review-box d-flex">      
                            <div class="media-body">
                                <h4 class="mt-0 mb-0 text-black">${x.name}</h4>
                                <ul class="review-meta mb-3 d-block d-sm-flex align-items-center">
                                  
                                    <li class="me-3"><small>24 June 2020</small></li>
                                    <li class="ms-auto"><span class="badge badge-rounded green radioactive light font-w500">Ugh</span>
                                    </li>
                                </ul>
                                <p class="mb-3 text-secondary">${x.description}</p>
                            </div>
                            <div class="media-footer align-self-center">
                                <div class="star-review text-md-center">
                                    <span class="text-secondary">${x.review[0].rating}</span>
                                    <i class="fa fa-star text-primary"></i>
                                    <i class="fa fa-star text-primary"></i>
                                    <i class="fa fa-star text-primary"></i>
                                    <i class="fa fa-star text-primary"></i>
                                    <i class="fa fa-star text-gray"></i>
                                </div>
                            </div>
                        </div>

`
    })




}
getinfo()