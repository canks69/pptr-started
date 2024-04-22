import { Injectable } from '@nestjs/common';
import { LoginPage } from '../../common/models';
import { InjectCore, PuppeteerCore } from 'nestjs-pptr';
import * as fs from 'node:fs';

@Injectable()
export class LoginService {
  constructor(@InjectCore() private readonly puppeteer: PuppeteerCore) {}

  async login(data: LoginPage) {
    const instance = await this.puppeteer.launch('instagram');

    const page = await instance.browser.newPage();

    await page.goto(process.env.URL);

    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', data.username);

    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', data.password);

    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    await page.waitForNavigation();

    const cookies = await page.cookies();
    if (!fs.existsSync('config')) {
      fs.mkdirSync('config');
    }
    fs.writeFileSync('config/cookies.json', JSON.stringify(cookies, null, 2));

    const localStorageData = await page.evaluate(() => {
      return JSON.stringify(window.localStorage);
    });
    fs.writeFileSync('config/localStorage.json', localStorageData);

    const sessionStorageData = await page.evaluate(() => {
      return JSON.stringify(window.sessionStorage);
    });
    fs.writeFileSync('config/sessionStorage.json', sessionStorageData);

    // Await navigation to the profile page

    // await instance.browser.close();
  }
}
