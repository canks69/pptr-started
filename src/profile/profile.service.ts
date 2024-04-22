import { Injectable } from '@nestjs/common';
import { InjectCore, PuppeteerCore } from 'nestjs-pptr';
import * as fs from 'node:fs';

@Injectable()
export class ProfileService {
  constructor(@InjectCore() private readonly puppeteer: PuppeteerCore) {}

  async getProfile(): Promise<string> {
    const instance = await this.puppeteer.launch('instagram');
    const page = await instance.browser.newPage();

    await page.goto(process.env.URL);

    // Get cookies from the config/cookies.json file
    const cookies = fs.readFileSync('config/cookies.json', 'utf8');
    if (cookies) {
      await page.setCookie(...JSON.parse(cookies));
    }

    // Get localStorage from the config/localStorage.json file
    const localStorageData = fs.readFileSync(
      'config/localStorage.json',
      'utf8',
    );
    if (localStorageData) {
      const localStorageObject = JSON.parse(localStorageData);
      await page.evaluate((localStorage) => {
        Object.keys(localStorage).forEach((key) => {
          window.localStorage.setItem(key, localStorage[key]);
        });
      }, localStorageObject);
    }

    // Get sessionStorage from the config/sessionStorage.json file
    const sessionStorageData = fs.readFileSync(
      'config/sessionStorage.json',
      'utf8',
    );
    if (sessionStorageData) {
      const sessionStorageObject = JSON.parse(sessionStorageData);
      await page.evaluate((sessionStorage) => {
        Object.keys(sessionStorage).forEach((key) => {
          window.sessionStorage.setItem(key, sessionStorage[key]);
        });
      }, sessionStorageObject);
    }

    return 'Profile data';
  }
}
