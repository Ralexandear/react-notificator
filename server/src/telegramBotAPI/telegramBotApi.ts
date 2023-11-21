type Method = 'POST' | 'GET';

interface PostResponse {
  ok: boolean;
  result?: {
    [key : string] : any
  };
  description?: string;
  error_code?: number;
}

class ApiMethods {
  protected telegramUrl!: string;

  constructor(telegramUrl: string) {
    this.telegramUrl = telegramUrl;
  }

  // Установите значение по умолчанию для параметра method
  async sendPost({ method = 'POST', body } : { method?: Method; body: {} }, muteHttpException: boolean = false) : Promise<PostResponse> {
    const headers = {
      "content-type" : "application/json"
    }
    //@ts-expect-error
    const request = new Request(this.telegramUrl ,{headers, method, body })
    const response = await fetch(request)
    const answer : PostResponse = await response.json();
    
    if (response.ok || muteHttpException){
      return answer
    }
    throw Error(JSON.stringify(answer, null, 7))
  }

  async getMe(muteHttpException: boolean = false) {
    const body = JSON.stringify({
      method: this.getMe.name,
    });

    return this.sendPost({ body }, muteHttpException);
  }
}


export default class LightTelegramApi extends ApiMethods {
  protected botToken!: string;

  constructor(botToken: string) {
    super(`https://api.telegram.org/bot${botToken}/`);
    this.botToken = botToken;
  }
}