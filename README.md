# Blood Pressure Recoder bot

LINE bot to record blood pressure.

## Sequence

```mermaid
sequenceDiagram
    participant User
    participant LINEBot
    participant Workers
    participant D1

    User ->> LINEBot: メッセージ送信
    activate LINEBot
    LINEBot ->> Workers: リクエスト転送
    activate Workers
    Workers ->> D1: データ処理
    activate D1
    D1 -->> Workers: 応答生成
    deactivate D1
    Workers -->> LINEBot: 応答受信
    deactivate Workers
    LINEBot -->> User: レスポンス送信
    deactivate LINEBot
```

## Getting Started

```
npm install
npm run dev
```

```
npm run deploy
```
