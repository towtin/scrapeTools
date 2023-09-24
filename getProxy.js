const axios = require("axios");
const fs = require("fs");

const gatherProxy = (types = "http") => {
  const proxies = [];
  const link = `https://api.proxyscrape.com/v2/?request=displayproxies&protocol=${types}&timeout=2000&country=all&ssl=all&anonymity=elite`;

  async function getProxiesFromLink(link) {
    console.log("Scraping proxies ...");
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

    proxies.filter(Boolean);
    return proxies;
  }

  return getProxiesFromLink(link);
};

gatherProxy("socks5")
  .then((proxies) => {
    const randomNumber = Math.floor(Math.random() * proxies.length);
    console.log(proxies[randomNumber]); //pick random proxies
  })
  .catch((error) => {
    console.error(error);
  });
