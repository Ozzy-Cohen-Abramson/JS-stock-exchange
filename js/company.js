const companyImg = document.querySelector("#company-profile-img");
const companyName = document.querySelector("#company-name");
const companyDescription = document.querySelector("#company-description");
const companyLink = document.querySelector("#company-link");
const stockPrice = document.querySelector("#stock-price");
const stockChanges = document.querySelector("#changes");
const loadingInd = document.querySelector("#loading-ind");

let urlParams = new URLSearchParams(window.location.search);
let companySymbol = urlParams.get("symbol");
const ctx = document.querySelector("#myChart");

const companyProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`;
const chartInfo = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;

fetch(companyProfile)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.title = data.profile.companyName;
    companyImg.src = data.profile.image;
    companyName.innerText = data.profile.companyName;
    companyDescription.innerText = data.profile.description;
    companyLink.innerHTML = `<a href="${data.profile.website}">${data.profile.companyName} Website</a>`;
    stockPrice.innerText = `Stock price: $${data.profile.price} `;

    if (data.profile.changes < 0) {
      stockChanges.style.color = "#cc0066";
      stockChanges.innerText = `(${data.profile.changes}%)`;
    } else if (data.profile.changes === 0) {
      stockChanges.innerText = `(${data.profile.changes})`;
    } else {
      stockChanges.innerText = `(+${data.profile.changes}%)`;
      stockChanges.style.color = "#33cc00";
    }
  });

loadingInd.style.display = "block";

fetch(chartInfo)
  .then((response) => {
    return response.json();
  })
  .then((info) => {
    const dataHistory = info.historical;
    dataHistory.reverse();
    const labels = dataHistory.map((element) => element.date);
    const closeGate = dataHistory.map((element) => element.close);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Stock price history",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          rectRot: "rectRot",
          data: closeGate,
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {},
    };

    loadingInd.style.display = "none";
    ctx.style.display = "block";
    let myChart = new Chart(ctx, config);
  });
