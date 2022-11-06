const puppeteer = require("puppeteer");
const url = process.argv[2];
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36";
  const page = await browser.newPage();
  // console.log(`Parsing data from div#data from ${url} has started`);
  await page.setUserAgent(USER_AGENT);
  await page.evaluateOnNewDocument(() => {
    // Pass webdriver check else bad request error in div#data
    Object.defineProperty(navigator, "webdriver", {
      get: () => false,
    });
    Object.defineProperty(navigator, "plugins", {
      // This just needs to have `length > 0` else bad request error in div#data.
      get: () => [1],
    });
  });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
  const jsonData = await page.evaluate(() => {
    return document.getElementById("data").innerHTML;
  });
  // console.log("Json=", jsonData);
  jsonObject = JSON.parse(jsonData);
  // console.log("Object=", jsonObject);
  // console.log("sign=", jsonObject.sign);
  console.log(JSON.stringify({ sign: jsonObject.sign }));
  await browser.close();
})();
