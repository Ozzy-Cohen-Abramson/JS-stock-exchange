class Marquee {
  constructor(symbol) {
    this.COMPANY_SYMBOL_SERVER = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/nasdaq_constituent`; // gets list of symbols
    this.stockMarquee = document.querySelector(".stock-marquee");
    this.symbol = symbol;
  }

  async createDup() {
    this.companyArr = [];
    this.companySymbol = this.marqueeCompany.innerHTML;
    this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${this.companySymbol}`;
    const response = await fetch(this.url);
    const data = await response.json();
    this.companyArr.push(data);
    const [first] = data;
    const marqueeCompany = document.createElement("span");
    this.stockMarquee.appendChild(marqueeCompany);
    marqueeCompany.classList.add("click-for-info");
    marqueeCompany.innerHTML = `<span class="company-symbol">${first.symbol}</span>: <span class="positive">${first.price}$</span>`;
    marqueeCompany.addEventListener("click", (e) => {
      this.profileUrl = new URL(
        `http://127.0.0.1:5500/company.html?symbol=${e.target.innerHTML}`
      );
      window.open(this.profileUrl.href);
    });
  }
  fetchFromServer() {
    fetch(this.COMPANY_SYMBOL_SERVER)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((element) => {
          this.marqueeCompany = document.createElement("span");
          this.marqueeCompany.innerHTML = element.symbol;

          this.createDup();
        });
      });
  }
}
