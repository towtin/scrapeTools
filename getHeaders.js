function getUserAgent(os, browser) {
  const osType = {
    windows: "Windows NT 10.0; Win64; x64",
    mac: "Macintosh; Intel Mac OS X 10_15_7",
    linux: "X11; Linux x86_64",
  };

  const userAgent = {
    chrome: `Mozilla/5.0 (${osType[os]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36`,
    firefox: `Mozilla/5.0 (${osType[os]}; rv:109.0) Gecko/20100101 Firefox/117.0`,
    safari: `Mozilla/5.0 (${osType["mac"]}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15`,
  };

  return userAgent[browser];
}

console.log(getUserAgent("linux", "firefox"));
