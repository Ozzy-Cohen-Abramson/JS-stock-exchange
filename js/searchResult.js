class CompanyList {
  constructor(element) {
    this.apiKey = "ed7c9cd6a18ece83772f68568ae443fd";
    this.div = document.createElement("div");
    this.div.classList.add("results-wrapper");

    this.spinnerWrapper = document.createElement("div");
    this.spinnerWrapper.classList.add("spinner-wrapper");
    this.div.appendChild(this.spinnerWrapper);

    this.spinner = document.createElement("div");
    this.spinner.classList.add("spinner-grow", "text-primary");
    this.spinner.style = "width: 5rem; height: 5rem";
    this.spinnerWrapper.appendChild(this.spinner);

    this.ul = document.createElement("ul");
    this.ul.classList.add("result-list", "list-group", "list-group-flush");

    element.appendChild(this.div);
    element.appendChild(this.ul);
  }

  addItem(content) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = content;
    this.ul.appendChild(li);
  }

  renderResults(content) {
    this.spinnerWrapper.style.display = "flex";
    this.ul.innerHTML = "";
    this.searchLetters = content;

    const STOCK_SERVER = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${content}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`;

    async function getDataServer(url) {
      const response = await fetch(url);
      let data = await response.json();
      return data;
    }

    getDataServer(STOCK_SERVER).then((stocks) => {
      stocks.forEach((element) => {
        let complanySymbol = element.symbol;
        const companyProfileLink = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${complanySymbol}`;

        fetch(companyProfileLink)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const companyProfile = data.profile;

            const companyName = element.name;
            const companySymbol = element.symbol;
            let string = `${companyName} (${companySymbol})`;
            let searchLetters = this.searchLetters;

            function boldString(str, find) {
              let reg = new RegExp("(" + find + ")", "gi");
              return str.replace(reg, "<mark>$1</mark>");
            }

            string = boldString(string, searchLetters);

            const stockChanges = companyProfile.changes;
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            this.ul.appendChild(li);

            if (stockChanges < 0) {
              li.innerHTML = `<img class="company-profile-img" src="${companyProfile.image}" alt="img" /> ${string}) <span class="negative">(${stockChanges}%)</span>`;
            } else if (stockChanges === 0) {
              li.innerHTML = `<img class="company-profile-img" src="${companyProfile.image}" alt="img" /> ${string} <span >(${stockChanges})</span>`;
            } else {
              li.innerHTML = `<img class="company-profile-img" src="${companyProfile.image}" alt="img" /> ${string} <span class="positive">(+${stockChanges}%)</span>`;
            }
            this.spinnerWrapper.style.display = "none";

            li.addEventListener("click", () => {
              let compUrl = new URL(
                `http://127.0.0.1:5500/company.html?symbol=${element.symbol}`
              );
              let urlParams = new URLSearchParams(compUrl.search);

              let complaySymbol = urlParams.get("symbol");
              window.open(compUrl);
              const companyProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${complaySymbol}`;
            });
          });
      });
    });
  }
}
