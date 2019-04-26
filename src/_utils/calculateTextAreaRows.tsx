const calculateTextAreaRows = (
  textAreaEl: any,
  minRows: number = 1,
  textareaLineHeight: number = 24,
) => {
  textAreaEl.current.rows = minRows; // reset number of rows in textarea

  const currentRows = ~~(textAreaEl.current.scrollHeight / textareaLineHeight);

  textAreaEl.current.rows = currentRows;
};

export default calculateTextAreaRows;
