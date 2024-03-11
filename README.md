# Blood Pressure Recoder bot

LINE bot to record blood pressure.

## Sequence

```mermaid
sequenceDiagram
    participant User
    participant LINEBot
    participant Workers
    participant D1

    User ->> LINEBot: Send message
    activate LINEBot
    LINEBot ->> Workers: Send request to webhook
    activate Workers
    Workers ->> D1: Insert data
    activate D1
    D1 -->> Workers: Response
    deactivate D1
    Workers -->> LINEBot: Send Response
    deactivate Workers
    LINEBot -->> User: Send message
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
  A[Receive message from user] --> J{Message is display all?};
  J --> |Yes| K(Display all records);
  J --> |No| B{Message is statistics?};
  B --> |Yes| C(Send statistics information);
  B --> |No| E{Message is register?};
  E --> |Yes| F(Start registration process);
  E --> |No| G{Registration is in progress?};
  G --> |Yes| H(Proceed registration process);
  G --> |No| I(Send default message);
```
