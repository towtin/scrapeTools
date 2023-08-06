const axios = require("axios");
const fs = require("fs");

function gatherProxy() {
  const proxies = [];
  const linkList = [
    "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt",
    "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/proxy.txt",
    "https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt",
  ];

  async function getProxiesFromLink(link) {
    try {
      const response = await axios.get(link);
      const output = response.data;

      let proxy = [];
      if (output.includes("\r\n")) {
        proxy = output.split("\r\n");
      } else {
        proxy = output.split("\n");
      }

      proxy.forEach((line) => {
        proxies.push(line);
      });

      console.log(`${proxy.length} proxies gathered from ${link}`);
    } catch (error) {
      console.error(`Failed to gather proxies from ${link}`);
    }
  }

  async function gatherAllProxies() {
    console.log("Scraping proxies ...");

    for (const link of linkList) {
      await getProxiesFromLink(link);
    }

    proxies.filter(Boolean);
    shuffle(proxies);

    return proxies;
  }

  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  return gatherAllProxies();
}

gatherProxy()
  .then((proxies) => {
    const randomNumber = Math.floor(Math.random() * proxies.length);
    console.log(proxies[randomNumber]);
  })
  .catch((error) => {
    console.error(error);
  });
