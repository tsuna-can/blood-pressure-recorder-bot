const START_MESSAGE = {
  REGISTER: '登録',
  STATISTICS: '統計',
}

const MESSAGE = {
  DEFAULT_REPLY: '「登録」または「統計」を送信してください。',
  REGISTER_SYSTOLIC: '登録を開始します。\n収縮期血圧を入力してください。',
  REGISTER_DIASTOLIC:
    '収縮期血圧を登録しました。拡張期血圧を入力してください。',
  REGISTER_DONE: '登録が完了しました。',
  DISPLAY_STATISTICS: '統計を表示します。',
}

const ERROR = {
  DEFAULT_ERROR: 'エラーが発生しました。最初からやり直してください。',
  NOT_NUMERIC: '数字で入力してください。',
}

export { START_MESSAGE, MESSAGE, ERROR }
