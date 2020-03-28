import * as Cookies from "js-cookie";

export default class HttpClient {
  static getUrl(url, params) {
    const headers = new Headers();
    const parsedUrl = new URL(window.location.origin + url);

    Object.keys(params).forEach(key =>
      parsedUrl.searchParams.append(key, params[key])
    );

    const configuration = { method: "GET", headers };

    return fetch(parsedUrl, configuration);
  }

  static deleteUrl(url, params) {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
    });
    const parsedUrl = new URL(window.location.origin + url);

    const configuration = {
      method: "DELETE",
      headers,
      credentials: "same-origin",
      body: JSON.stringify(params)
    };

    return fetch(parsedUrl, configuration);
  }
}
