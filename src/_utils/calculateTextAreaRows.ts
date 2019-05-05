const calculateTextAreaRows = ({
  textAreaEl,
  minRows = 1,
  textareaLineHeight = 24,
}: {
  textAreaEl: any;
  minRows?: number;
  textareaLineHeight?: number;
}) => {
  const textAreaElRows = textAreaEl.current && textAreaEl.current.rows;
  if (!textAreaElRows) return;

  textAreaEl.current.rows = minRows; // reset number of rows in textarea

  const currentRows = ~~(textAreaEl.current.scrollHeight / textareaLineHeight);

  textAreaEl.current.rows = currentRows;
};

export default calculateTextAreaRows;
