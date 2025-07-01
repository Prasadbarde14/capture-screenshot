const cron = require("node-cron");
const axios = require("axios");

// Sample schedule object (as provided)

const token =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3NDcyNTA5ODgsImlhdCI6MTc0NzIxNDk4OCwianRpIjoiOGMwMjZkMWMtOWY0ZC00ZDk2LThhNWQtNDRkYjNkOTE1ZmY5IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLXNlcnZpY2Uua2V5Y2xvYWsuc3ZjLmNsdXN0ZXIubG9jYWw6ODA4MC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIkJPTFRaTUFOTl9CT1RfbW9iaXVzIiwiVEVNUExBVEVfbW9iaXVzIiwiQ09OVEVOVF9tb2JpdXMiLCJQQVNDQUxfSU5URUxMSUdFTkNFX21vYml1cyIsIk1PTkVUX21vYml1cyIsIlZJTkNJX21vYml1cyIsImFjY291bnQiXSwic3ViIjoiMmNmNzZlNWYtMjZhZC00ZjJjLWJjY2MtZjRiYzFlN2JmYjY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiSE9MQUNSQUNZX21vYml1cyIsInNpZCI6ImVkYmFkOGRjLWIwYmUtNGEwOC1iMDA3LTlmMGM1OGZjMjRiNCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlRFTVBMQVRFX0NVU1RPTV9ST0xFUyIsImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwiQk9MVFpNQU5OX0JPVF9DVVNUT01fUk9MRVMiLCJDT05URU5UX0NVU1RPTV9ST0xFUyIsIm9mZmxpbmVfYWNjZXNzIiwiSE9MQUNSQUNZX0NVU1RPTV9ST0xFUyIsIlBBU0NBTF9JTlRFTExJR0VOQ19DVVNUT01fUk9MRVMiLCJNT05FVF9DVVNUT01fUk9MRVMiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWV9tb2JpdXMiOnsicm9sZXMiOlsiSE9MQUNSQUNZX0FQUFJPVkUiLCJORUdPVEFUSU9OX0FQUFJPVkUiLCJBQ0NPVU5UX0FQUFJPVkUiLCJQUk9EVUNUX0NSRUFUSU9OX1JFQUQiLCJPUkdBTklaQVRJT05fUkVBRCIsIkFMTElBTkNFX1dSSVRFIiwiQUxMSUFOQ0VfRVhFQ1VURSIsIkhPTEFDUkFDWV9DT05TVU1FUiIsIlRFTkFOVF9XUklURSIsIlBMQVRGT1JNX1dSSVRFIiwiUkFURV9DQVJEX1dSSVRFIiwiSE9MQUNSQUNZX1VTRVIiLCJSQVRFX0NBUkRfQVBQUk9WRSIsIkFMTElBTkNFX0FQUFJPVkUiLCJORUdPVEFUSU9OX1dSSVRFIiwiVEVOQU5UX0VYRUNVVEUiLCJPUkdBTklaQVRJT05fQVBQUk9WRSIsIlBST0RVQ1RfTElTVElOR19BUFBST1ZFIiwiUFJPRFVDVF9MSVNUSU5HX0VYRUNVVEUiLCJTVUJfQUxMSUFOQ0VfV1JJVEUiLCJPUkdBTklaQVRJT05fRVhFQ1VURSIsIlBST0RVQ1RfQ1JFQVRJT05fRVhFQ1VURSIsIk5FR09UQVRJT05fRVhFQ1VURSIsIlBST0RVQ1RfTElTVElOR19XUklURSIsIlBST0RVQ1RfQ1JFQVRJT05fQVBQUk9WRSIsIlBST0RVQ1RfQ1JFQVRJT05fV1JJVEUiLCJBQ0NPVU5UX1JFQUQiLCJQUk9EVUNUX0xJU1RJTkdfUkVBRCIsIk9SR0FOSVpBVElPTl9XUklURSIsIkFMTElBTkNFX1JFQUQiLCJSQVRFX0NBUkRfRVhFQ1VURSIsIlNVQl9BTExJQU5DRV9SRUFEIiwiVEVOQU5UX0FQUFJPVkUiLCJIT0xBQ1JBQ1lfQURNSU4iLCJQTEFURk9STV9SRUFEIiwiVEVOQU5UX1JFQUQiLCJQTEFURk9STV9FWEVDVVRFIiwiQUNDT1VOVF9FWEVDVVRFIiwiU1VCX0FMTElBTkNFX0VYRUNVVEUiLCJTVUJfQUxMSUFOQ0VfQVBQUk9WRSIsIk5FR09UQVRJT05fUkVBRCIsIkFDQ09VTlRfV1JJVEUiLCJSQVRFX0NBUkRfUkVBRCIsIlBMQVRGT1JNX0FQUFJPVkUiXX0sIkJPTFRaTUFOTl9CT1RfbW9iaXVzIjp7InJvbGVzIjpbIldPUktGTE9XX0FQUFJPVkUiLCJXT1JLRkxPV19SRUFEIiwiQlJJQ0tfRVhFQ1VURSIsIkJSSUNLX0FQUFJPVkUiLCJCUklDS19XUklURSIsIkJPTFRaTUFOTl9CT1RfVVNFUiIsIkJPTFRaTUFOTl9CT1RfQ09OU1VNRVIiLCJQSVBFTElORV9BUFBST1ZFIiwiQk9MVFpNQU5OX0JPVF9BRE1JTiIsIkJPTFRaTUFOTl9CT1RfQVBQUk9WRSIsIldPUktGTE9XX0VYRUNVVEUiLCJQSVBFTElORV9XUklURSIsIlBJUEVMSU5FX0VYRUNVVEUiLCJCUklDS19SRUFEIiwiUElQRUxJTkVfUkVBRCIsIldPUktGTE9XX1dSSVRFIl19LCJURU1QTEFURV9tb2JpdXMiOnsicm9sZXMiOlsiVEVNUExBVEVfV1JJVEUiLCJURU1QTEFURV9FWEVDVVRFIiwiVEVNUExBVEVfUkVBRCJdfSwiQ09OVEVOVF9tb2JpdXMiOnsicm9sZXMiOlsiQ09OVEVOVF9XUklURSIsIkNPTlRFTlRfUkVBRCIsIkNPTlRFTlRfRVhFQ1VURSJdfSwiUEFTQ0FMX0lOVEVMTElHRU5DRV9tb2JpdXMiOnsicm9sZXMiOlsiSU5TVEFOQ0VfV1JJVEUiLCJDT0hPUlRTX0FQUFJPVkUiLCJJTkdFU1RJT05fV1JJVEUiLCJVTklWRVJTRV9SRUFEIiwiU0NIRU1BX0VYRUNVVEUiLCJQQVNDQUxfSU5URUxMSUdFTkNFX0FQUFJPVkUiLCJTQ0hFTUFfQVBQUk9WRSIsIkJJR1FVRVJZX0VYRUNVVEUiLCJJTlNUQU5DRV9SRUFEIiwiVU5JVkVSU0VfV1JJVEUiLCJDT05URVhUX1dSSVRFIiwiQ09IT1JUU19FWEVDVVRFIiwiQklHUVVFUllfQVBQUk9WRSIsIlBBU0NBTF9JTlRFTExJR0VOQ0VfQ09OU1VNRVIiLCJQQVNDQUxfSU5URUxMSUdFTkNFX1VTRVIiLCJJTlNUQU5DRV9BUFBST1ZFIiwiSU5HRVNUSU9OX1JFQUQiLCJDT0hPUlRTX1dSSVRFIiwiU0NIRU1BX1dSSVRFIiwiSU5HRVNUSU9OX0FQUFJPVkUiLCJJTlNUQU5DRV9FWEVDVVRFIiwiUEFTQ0FMX0lOVEVMTElHRU5DRV9BRE1JTiIsIlNDSEVNQV9SRUFEIiwiQklHUVVFUllfUkVBRCIsIkJJR1FVRVJZX1dSSVRFIiwiQ09IT1JUU19SRUFEIiwiVU5JVkVSU0VfQVBQUk9WRSIsIkNPTlRFWFRfUkVBRCIsIkNPTlRFWFRfRVhFQ1VURSIsIkNPTlRFWFRfQVBQUk9WRSIsIlVOSVZFUlNFX0VYRUNVVEUiXX0sIk1PTkVUX21vYml1cyI6eyJyb2xlcyI6WyJTVVBFUkFETUlOIiwiUExVR0lOU19BUFBST1ZFIiwiRVhQRVJJRU5DRVNfRVhFQ1VURSIsIldJREdFVFNfRVhFQ1VURSIsIkFQUExFVFNfUkVBRCIsIkVYUEVSSUVOQ0VTX0FQUFJPVkUiLCJFWFBFUklFTkNFU19SRUFEIiwiQVBQTEVUU19XUklURSIsIlBMVUdJTlNfV1JJVEUiLCJNT05FVF9DT05TVU1FUiIsIlBMVUdJTlNfUkVBRCIsIkFQUExFVFNfQVBQUk9WRSIsIk1PTkVUX0FETUlOIiwiV0lER0VUU19SRUFEIiwiTU9ORVRfQVBQUk9WRSIsIk1PTkVUX1VTRVIiLCJXSURHRVRTX0FQUFJPVkUiLCJBUFBMRVRTX0VYRUNVVEUiLCJXSURHRVRTX1dSSVRFIiwiUExVR0lOU19FWEVDVVRFIiwiRVhQRVJJRU5DRVNfV1JJVEUiXX0sIlZJTkNJX21vYml1cyI6eyJyb2xlcyI6WyJWSU5DSV9VU0VSIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBaWR0YWFzIEFpZHRhYXMiLCJ0ZW5hbnRJZCI6IjJjZjc2ZTVmLTI2YWQtNGYyYy1iY2NjLWY0YmMxZTdiZmI2NCIsInBsYXRmb3JtSWQiOiJtb2JpdXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfYWlkdGFhc0BnYWlhbnNvbHV0aW9ucy5jb20iLCJnaXZlbl9uYW1lIjoiQWlkdGFhcyIsImZhbWlseV9uYW1lIjoiQWlkdGFhcyIsImVtYWlsIjoicGFzc3dvcmRfdGVuYW50X2FpZHRhYXNAZ2FpYW5zb2x1dGlvbnMuY29tIn0.doEgpGDrMFoWMEQZ995r15n6IafcOq3wDAdbGF_gFSg7VSUlNItT8MsYjfZ3GzHXPZ2Eeo7iSkfEMPF_vnUVCFpEqLF1eOXwOWCl2TD8OM0Wj_lbjjCll04e5ycuM87dttyDVgzR7YU45YkI0rhIldBeHzuMaLvv0sD9QpogL1XA44Rw4k42ICWYQ48H22BfRJ4OXacxmNwQbxXDUsjKRUrJq610Fjw603W9aZbVKZCZ9ma2NIkbEjiA7yYwkRtzJ2oNvmRUeKy-k7rOtW41orv8YV_ixzN3SqC52jMfkUyvkSiKQcju1kI6veZcO40Vx9MdkcYx2oyf9yju0UUoAw";
let headers = {
  "Content-Type": "application/json",
  Authorization: token,
};
let ArrayofscheduleObjs = [];

async function updateContentUrlsFromScheduleObj(scheduleObj, apiResponse) {
  const layoutConfig = scheduleObj.layout_config;
  const deviceCount = layoutConfig.length;
  const urlObjects = apiResponse || [];

  const urls = urlObjects.map((obj) => obj.link); // ✅ Extract URLs only

  if (urls.length === 0 || deviceCount === 0) {
    return scheduleObj; // No update if no URLs or devices
  }

  // Step 1: Initialize arrays to assign links to each device
  const deviceLinks = Array.from({ length: deviceCount }, () => []);

  // Step 2: Always assign 1 URL per device in round-robin
  for (let i = 0; i < deviceCount; i++) {
    deviceLinks[i].push(urls[i % urls.length]); // ✅ round-robin even if urls < devices
  }

  // Step 3: Distribute remaining URLs (if any) in round-robin
  let remainingStart = deviceCount;
  let currentIndex = 0;
  for (let i = remainingStart; i < urls.length; i++) {
    deviceLinks[currentIndex].push(urls[i]);
    currentIndex = (currentIndex + 1) % deviceCount;
  }

  // Step 4: Update layout_config with proper content URLs
  const updatedLayoutConfig = layoutConfig.map((device, index) => {
    const links = deviceLinks[index];
    let contentUrl = "";

    if (links.length === 1) {
      contentUrl = links[0]; // ✅ plain single link
    } else if (links.length > 1) {
      const interval = Math.floor(30 / links.length);
      const intervalString = Array(links.length).fill(interval).join(",");
      contentUrl = `https://impressio.aidtaas.com/contentwithloop?interval=${intervalString}&links=${encodeURIComponent(
        links.join(",")
      )}`;
    }

    return {
      ...device,
      content_details: {
        ...device.content_details,
        content_url: contentUrl,
      },
    };
  });

  return {
    ...scheduleObj,
    layout_config: updatedLayoutConfig,
  };
}

// cron.schedule("*/1 * * * *", async () => {
  cron.schedule('0 */4 * * *', async () => {
  console.log(`Cron job triggered at: ${new Date().toLocaleString()}`);

  try {
    const response = await axios.get(
      "https://ig.aidtaas.com/mib-backend/MIB_castingLinks"
    );

    const data = {
      dbType: "TIDB",
    };

    await axios
      .post(
        "https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/68496e503bcb6d2826a760e3/instances/list?size=2000&showPageableMetaData=true&showDBaaSReservedKeywords=false",
        data,
        { headers }
      )
      .then((response) => {
        ArrayofscheduleObjs = response.data.content;
        // console.log("✅ Response:", response.data.content);
      })
      .catch((error) => {
        console.error("❌ Error:", error.response?.data || error.message);
      });
    // const updatedSchedule = updateCafeteriaContentUrl(scheduleCafeteriaObj, response.data.castingLinks);
    for (let index = 0; index < ArrayofscheduleObjs.length; index++) {
      const scheduleObj = ArrayofscheduleObjs[index];
      const updatedSchedule = await updateContentUrlsFromScheduleObj(
        scheduleObj,
        response.data.castingLinks
      );

      // console.log(
      //   `Updated Schedule for index ${index}:`,
      //   JSON.stringify(updatedSchedule, null, 2)
      // );
      try {
        let PUTresponse = await fetch(
          "https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/68262ff6fc0601317f0304f1/instances",
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
              primarykeyEnable: true,
              data: updatedSchedule,
            }),
          }
        );
        let responseData = await PUTresponse.json();
        console.log("PUTresponse", responseData);
      } catch (error) {
        console.log("error occured in updateDevicesIp", error.message);
        throw error;
      }
    }

    // Here, you can choose to POST the updatedSchedule to an API, save to a file, or whatever is needed
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
});

console.log("Cron job service started.");





app.get("/", (req, res) => {
  res.send("📸 Screenshot service is up and running!");
});



// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');
// const express = require('express');
// const FormData = require('form-data');
// const fetch = require('node-fetch');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dugegzlzl/image/upload';
// const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

// // Ensure screenshots folder exists
// const screenshotsDir = path.join(__dirname, 'screenshots');
// if (!fs.existsSync(screenshotsDir)) {
//   fs.mkdirSync(screenshotsDir);
// }

// app.post('/screenshot', async (req, res) => {
//   const { url } = req.body;

//   if (!url) return res.status(400).send('Missing URL');

//   try {
//     const browser = await puppeteer.launch({
//       headless: 'new',
//       args: ['--no-sandbox'],
//     });

//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });
//     await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

//     // Correct way to wait
//     await new Promise(resolve => setTimeout(resolve, 9000));

//     const timestamp = Date.now();
//     const filename = `screenshot-${timestamp}.png`;
//     const filepath = path.join(screenshotsDir, filename);

//     await page.screenshot({ path: filepath, fullPage: true });
//     await browser.close();

//     // Upload to Cloudinary
//     const form = new FormData();
//     form.append('file', fs.createReadStream(filepath));
//     form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//     const cloudinaryResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
//       method: 'POST',
//       body: form,
//     });

//     const cloudinaryData = await cloudinaryResponse.json();

//     // Delete local screenshot
//     fs.unlinkSync(filepath);

//     if (cloudinaryData.secure_url) {
//       res.json({ imageUrl: cloudinaryData.secure_url });
//     } else {
//       console.error('Cloudinary upload error:', cloudinaryData);
//       res.status(500).send('Cloudinary upload failed');
//     }
//   } catch (err) {
//     console.error('Screenshot or upload failed:', err);
//     res.status(500).send('Screenshot failed');
//   }
// });

// const PORT = 3001;
// app.listen(PORT, () => console.log(`📸 Screenshot service running on port ${PORT}`));




const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const FormData = require('form-data');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dugegzlzl/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

app.post('/screenshot', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('Missing URL');

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    console.log("Waiting an additional 5 seconds to ensure the page is visually stable...");
    // await page.waitForTimeout(5000); // ✅ Wait for visual stability
    await new Promise(resolve => setTimeout(resolve, 9000));
    // Optional: you can wait for a specific DOM element instead of a timer
    // await page.waitForSelector('body', { timeout: 5000 });

    const timestamp = Date.now();
    const filename = `screenshot-${timestamp}.png`;
    const filepath = path.join(screenshotsDir, filename);

    await page.screenshot({ path: filepath, fullPage: true });
    console.log("Screenshot captured:", filename);

    // Upload to Cloudinary
    const form = new FormData();
    form.append('file', fs.createReadStream(filepath));
    form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const cloudinaryResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: form,
    });

    const cloudinaryData = await cloudinaryResponse.json();

    // Clean up local file
    fs.unlinkSync(filepath);

    if (cloudinaryData.secure_url) {
      console.log("Upload successful:", cloudinaryData.secure_url);
      res.json({ imageUrl: cloudinaryData.secure_url });
    } else {
      console.error("Cloudinary response missing secure_url:", cloudinaryData);
      res.status(500).send("Cloudinary upload failed");
    }
  } catch (err) {
    console.error("Screenshot or upload failed:", err);
    res.status(500).send("Screenshot failed");
  } finally {
    if (browser) await browser.close();
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`📸 Screenshot service running on port ${PORT}`));
