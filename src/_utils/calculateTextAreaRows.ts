const calculateTextAreaRows = (
  textAreaEl: any,
  minRows: number = 1,
  textareaLineHeight: number = 24,
) => {
  const textAreaElRows = textAreaEl.current && textAreaEl.current.rows;
  if (!textAreaElRows) return;

  textAreaEl.current.rows = minRows; // reset number of rows in textarea

  const currentRows = ~~(textAreaEl.current.scrollHeight / textareaLineHeight);

  textAreaEl.current.rows = currentRows;
  console.log(currentRows, minRows);
};

export default calculateTextAreaRows;
