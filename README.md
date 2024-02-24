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

## Registration Flow

### Default flow

```mermaid
flowchart TD;
  A[Receive message from user] --> B{Message is Statistics?};
  B --> |Yes| C(Send statistics information);
  B --> |No| E{Message is register?};
  E --> |Yes| F(Start registration process)
  E --> |No| G(Registration is in progress?)
  G --> |Yes| H(Proceed registration process);
  G --> |No| I(Send default message);
```

### Start registration process

```mermaid
flowchart TD;
  A[Receive 'registration' from user] --> B{Registration is in progress?};
  B --> |Yes| C(Delete in progress record);
  B --> |No| E(Send 'please send blood pressure' message);
  C --> E
```

### Proceed registration process

```mermaid
flowchart TD;
  A[Receive message from user] --> B{Is valid?};
  B --> |Yes| C{systolic blood pressure is already registerd?};
  B --> |No| D(Send error message);
  C --> |Yes| E(register as dianosic)
  C --> |No| F{dianosic is already registerd?}
  F --> |Yes| G(Register as dianosic)
  F --> |No| H(Register as heart rate)
```
